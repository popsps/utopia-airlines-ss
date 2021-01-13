package com.ss.utopia.auth.service;

import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.dao.UserInfoDao;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.entity.UserInfo;
import com.ss.utopia.auth.entity.UserRole;
import com.ss.utopia.auth.security.JwtProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.security.core.AuthenticationException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
  private final UserDao userDao;
  private final UserInfoDao userInfoDao;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtProvider jwtProvider;

  @Autowired
  public UserService(UserDao userDao, UserInfoDao userInfoDao, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
    this.userDao = userDao;
    this.userInfoDao = userInfoDao;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
    this.jwtProvider = jwtProvider;
  }

  /**
   * Sign in a user into the application, with JWT-enabled authentication
   *
   * @param username username
   * @param password password
   * @return Optional of the Java Web Token, empty otherwise
   */
  public Optional<String> signin(String username, String password) {
    LOGGER.info("New user attempting to sign in");
    Optional<String> token = Optional.empty();
    Optional<User> user = userDao.findByUsername(username);
    if (user.isPresent()) {
      try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        token = Optional.of(jwtProvider.createToken(username,
          Arrays.asList(user.get().getRole())));
      } catch (AuthenticationException e) {
        LOGGER.info("Log in failed for user {}", username);
        e.printStackTrace();
      }
    }
    return token;
  }

  /**
   * Create a new user in the database.
   * Assigned to Samuel
   *
   * @param username username
   * @param password password
   * @param givenName First Name
   * @param familyName Last Name
   * @param email Email
   * @param phone Phone Number
   * @return Optional of the Java Web Token, empty if the user already exists.
   */
  public Optional<User> signup(String username, String password, String givenName, String familyName,
		  String email, String phone) {
    //..................... placeholder ..............
    // use  passwordEncoder.encode(password) to save password into the database
    LOGGER.info("New user attempting to sign up");
    Optional<User> user = Optional.empty();
    if (!userDao.findByUsername(username).isPresent()) {
      // needs work
		User createdUser = new User(8L,
				username, passwordEncoder.encode(password),
				new UserRole(2L, "CUSTOMER"), givenName, familyName, email, phone);
	
		user = Optional.of(userDao.save(createdUser));
    }
    return user;
  }
  
  public User updateUser(Long id, String username, String password, String givenName, String familyName,
		  String email, String phone) {
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
//	  userInfoDao.deleteById();
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
