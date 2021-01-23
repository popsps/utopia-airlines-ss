package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.dto.UserDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.security.SessionCookieProvider;
import com.ss.utopia.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

//	TODO: remove @CrossOrigin for signup and getAll
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@CrossOrigin(origins = "http://localhost:4200")
	public User signup(@RequestBody @Valid UserDto userDto) {
			return userService.signup(userDto);
	}

	@DeleteMapping("/{userId}")
	public int deleteUser(@PathVariable("userId") Long userId, @AuthenticationPrincipal UserDetails currentUser) {
		User user = userService.getUserById(userId, currentUser);
		return userService.deleteUser(userId);
	}
  
  @PutMapping("/{userId}")
  public User updateUser(@PathVariable Long userId, @RequestBody @Valid UserDto userDto,
		  				 @AuthenticationPrincipal UserDetails currentUser) {
	  User user = userService.getUserById(userId, currentUser);
	  try {
		  return userService.updateUser(userId, userDto);
	  }
	  catch(Exception e) {
		  String error = e.getMessage();
		  if(error.contains("user.email_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
		  }
		  else if(error.contains("user.username_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
		  }
		  else if(error.contains("user.phone_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
		  }
	  }
	  return null;
  }
  
  @GetMapping
//  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAll();
  }

	@GetMapping("/{userId}")
	public User getUserById(@PathVariable("userId") Long userId, @AuthenticationPrincipal UserDetails currentUser) {
		User user = userService.getUserById(userId, currentUser);
		if (currentUser.getUsername().equals(user.getUsername()))
			return user;
		else
			throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Access denied.");
	}
}
