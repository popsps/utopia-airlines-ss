package com.ss.utopia.auth.service;

import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.entity.UserRole;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.security.core.AuthenticationException;
import static org.springframework.security.core.userdetails.User.withUsername;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
  @Autowired
  private UserDao userDao;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userDao.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(String.format("User with name %s does not exist", username)));
    return withUsername(user.getUsername()).password(user.getPassword()).authorities(user.getRole().getName())
        .accountExpired(false).accountLocked(false).credentialsExpired(false).disabled(false).build();
  }

  /**
   * Sign in a user into the application, with JWT-enabled authentication
   *
   * @param username username
   * @param password password
   * @return Optional of the Java Web Token, empty otherwise
   */
  public Optional<User> loadAuthenticatedUser(final String username, final String password) {
    LOGGER.info("New user attempting to sign in");
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (AuthenticationException e) {
      LOGGER.info("Log in failed for user {}", username);
      return Optional.empty();
    }
    return userDao.findByUsername(username);
  }

  /**
   * Create a new user in the database.
   *
   * @param username   username
   * @param password   password
   * @param givenName  First Name
   * @param familyName Last Name
   * @param email      Email
   * @param phone      Phone Number
   * @return Optional of the Java Web Token, empty if the user already exists.
   */
  public Optional<User> signup(String username, String password, String givenName, String familyName, String email,
      String phone) {
    LOGGER.info("New user attempting to sign up");
    Optional<User> user = Optional.empty();
    if (!userDao.findByUsername(username).isPresent()) {
      User createdUser = new User(8L, username, passwordEncoder.encode(password), new UserRole(2L, "CUSTOMER"),
          givenName, familyName, email, phone);

      user = Optional.of(userDao.save(createdUser));
    }
    return user;
  }

  public User updateUser(Long id, String username, String password, String givenName, String familyName, String email,
      String phone) {
    LOGGER.info("User attempting to update info");
    User user = userDao.findById(id).get();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user.setGivenName(givenName);
    user.setFamilyName(familyName);
    user.setEmail(email);
    user.setPhone(phone);
    userDao.save(user);
    return user;
  }

  public int deleteUser(Long userId) {
    LOGGER.info("User attempting to delete profile");
    userDao.deleteById(userId);
    return 1;
  }

  public List<User> getAll() {
    return userDao.findAll();
  }

  public User getUserById(Long id) {
    return userDao.findById(id).orElse(null);
  }
}
