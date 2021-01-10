package com.ss.utopia.auth.service;

import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.security.JwtProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.security.core.AuthenticationException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
  private final UserDao userDao;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtProvider jwtProvider;

  @Autowired
  public UserService(UserDao userDao, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
    this.userDao = userDao;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
    this.jwtProvider = jwtProvider;
  }

  public Optional<String> signin(String username, String password) {
    LOGGER.info("New user attempting to sign in");
    Optional<String> token = Optional.empty();
    Optional<User> user = userDao.findByUsername(username);
    if (user.isPresent()) {
      try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        token = Optional.of(jwtProvider.createToken(username));
      } catch (AuthenticationException e) {
        LOGGER.info("Log in failed for user {}", username);
        e.printStackTrace();
      }
    }
    return token;
  }

  public Optional<User> signup(String username, String password) {
    LOGGER.info("New user attempting to sign up");
    Optional<User> user = Optional.empty();
    if (!userDao.findByUsername(username).isPresent()) {
      // needs work
      user = Optional.of(userDao.save(new User(8L, 3L,
        username, passwordEncoder.encode(password))));
    }
    return user;
  }

  public List<User> getAll() {
    return userDao.findAll();
  }
}
