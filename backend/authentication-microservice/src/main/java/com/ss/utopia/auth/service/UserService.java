package com.ss.utopia.auth.service;

import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.dto.UserDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.entity.UserRole;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.security.core.AuthenticationException;

import static org.springframework.security.core.userdetails.User.withUsername;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Locale;
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
   * @param userDto
   * @return
   */
  public User signup(UserDto userDto) {
    LOGGER.info("New user attempting to sign up");
    User user = null;
    Long roleId = 0L;
    if (userDto.getRole().toUpperCase().equals("ADMIN")) {
      roleId = 1L;
    } else if (userDto.getRole().toUpperCase().equals("CUSTOMER")) {
      roleId = 2L;
    } else if (userDto.getRole().toUpperCase().equals("AGENT")) {
      roleId = 3L;
    } else {
      throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Unauthorized Role");
    }
    User createdUser = new User(8L, userDto.getUsername(), passwordEncoder.encode(userDto.getPassword()), new UserRole(roleId, userDto.getRole()),
      userDto.getGivenName(), userDto.getFamilyName(), userDto.getEmail(), userDto.getPhone());

    try {
      user = userDao.save(createdUser);
    } catch (Exception e) {
      String error = e.getMessage();
      if (error.contains("user.email_UNIQUE")) {
        throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
      } else if (error.contains("user.username_UNIQUE")) {
        throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
      } else if (error.contains("user.phone_UNIQUE")) {
        throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
      }
    }
    return user;
  }

  public User updateUser(Long id, UserDto userDto) {
    LOGGER.info("User attempting to update info");
    User user = userDao.findById(id).get();
    user.setUsername(userDto.getUsername());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    user.setGivenName(userDto.getGivenName());
    user.setFamilyName(userDto.getFamilyName());
    user.setEmail(userDto.getEmail());
    user.setPhone(userDto.getPhone());
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

  public User getUserById(Long id, UserDetails currentUser) {
    User user = userDao.findById(id).orElse(null);
    if (user == null || !user.getUsername().equals(currentUser.getUsername())) {
      throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Unauthorized User");
    }
    return user;
  }

  /**
   * Find a user by its id and return the user
   *
   * @param id
   * @return
   */
  public User findUserById(Long id) {
    User user = userDao.findById(id).orElse(null);
    return user;
  }

  /**
   * verify that if a user is the same user with the JWT token
   *
   * @param user
   * @param currentUser parsed from the JWT token
   * @return the user if true. throw exception otherwise
   */
  public User verifyOwnershipAndReturnOwner(User user, UserDetails currentUser) {
    if (user == null)
      throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Unauthorized User");
    if (user.getUsername().equals(currentUser.getUsername()))
      throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Unauthorized User");
    return user;

  }

  /**
   * Remove a jwt token from the session cookie and return an empty string
   *
   * @return
   */
  public Cookie removeCookie() {
    final Cookie sessionCookie = new Cookie("session", null);
    sessionCookie.setPath("/");
    return sessionCookie;
  }

  public User getUserByUsername(String username) {
    return userDao.findByUsername(username)
      .orElseThrow(() -> new HttpServerErrorException(HttpStatus.FORBIDDEN, "Unauthorized User"));
  }
}
