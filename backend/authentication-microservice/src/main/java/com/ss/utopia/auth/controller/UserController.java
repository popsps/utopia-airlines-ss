package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.dto.UserDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.security.SessionCookieProvider;
import com.ss.utopia.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

//import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private SessionCookieProvider sessionCookieProvider;

	/**
	 * Login user
	 * 
	 * @param loginDto
	 * @return
	 */
	@PostMapping("/signin")
	public ResponseEntity<Object> login(@RequestBody @Valid LoginDto loginDto, HttpServletResponse response) {
		final User user = userService.loadAuthenticatedUser(loginDto.getUsername(), loginDto.getPassword())
				.orElseThrow(() -> new HttpServerErrorException(HttpStatus.UNAUTHORIZED, "Login Failed"));
		final Cookie sessionCookie = sessionCookieProvider.createSessionCookie(user)
				.orElseThrow(() -> new HttpServerErrorException(HttpStatus.UNAUTHORIZED, "Login Failed"));
		response.addCookie(sessionCookie);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

//	TODO: remove @CrossOrigin for signup and getAll
//	TODO: move try/catch to UserService to simplify meaning within UserController
	@PostMapping("/signup")
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
  @CrossOrigin(origins = "http://localhost:4200")
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
