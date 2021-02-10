package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.UpdateUserDto;
import com.ss.utopia.auth.dto.UserDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;


import javax.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private UserService userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public User signup(@RequestBody @Valid UserDto userDto) {
    return userService.signup(userDto);
  }

  @DeleteMapping("/{userId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public int deleteUser(@PathVariable("userId") Long userId) {
    User user = userService.getUserById(userId);
    return userService.deleteUser(user.getId());
  }

  @PutMapping("/{userId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public User updateUser(@PathVariable Long userId, @RequestBody @Valid UpdateUserDto userDto) {
    User user = userService.getUserById(userId);
    return userService.updateUser(user, userDto);
  }

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAll();
  }

  @GetMapping("/{userId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public User getUserById(@PathVariable("userId") Long userId) {
    return userService.getUserById(userId);
  }

}
