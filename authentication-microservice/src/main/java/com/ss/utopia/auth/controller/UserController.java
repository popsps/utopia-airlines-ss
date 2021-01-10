package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/signin")
  public String login(@RequestBody @Valid LoginDto loginDto) {
    return userService.signin(loginDto.getUsername(), loginDto.getPassword())
      .orElseThrow(() -> new HttpServerErrorException(HttpStatus.FORBIDDEN, "Login Failed"));
  }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public User signup(@RequestBody @Valid LoginDto loginDto) {
    return userService.signup(loginDto.getUsername(), loginDto.getPassword())
      .orElseThrow(() ->
        new HttpServerErrorException(HttpStatus.BAD_REQUEST, "User already exists"));
  }

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAll();
  }
}
