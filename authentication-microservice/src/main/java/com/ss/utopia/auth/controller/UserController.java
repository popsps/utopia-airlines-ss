package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.dto.SignUpDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import javax.validation.Valid;

import java.sql.SQLException;

//import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

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

   /*Samuel will be working here
   placeholder code
   You may need to replace loginDto with your own Dto or
   add additional arbitrary information to the LoginDto or
   You may want to create a signup DTO in the DTO package to pass all necessary information
   regarding the user sign-up information as a class*/
  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public User signup(@RequestBody @Valid SignUpDto signUpDto) {
   	  try {
		  return userService.signup(signUpDto.getUsername(), signUpDto.getPassword(), signUpDto.getGivenName(), 
    		signUpDto.getFamilyName(), signUpDto.getEmail(), signUpDto.getPhone()).get();
	  }
	  catch(Exception e) {
		  String error = e.getMessage();
		  if(error.contains("user.phone_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
		  }
		  else if(error.contains("user.username_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
		  }
		  else if(error.contains("user.email_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
		  }
	  }
	  return null;
  }
  
  @PutMapping("/{userId}")
  public User updateUser(@PathVariable Long userId, @RequestBody @Valid SignUpDto signUpDto,
		  				 @AuthenticationPrincipal UserDetails currentUser) {
	  User user = userService.getUserById(userId);
	  if(user == null) {
		  throw new HttpServerErrorException(HttpStatus.NOT_FOUND, "User not Found");
	  }
	  try {
		  return userService.updateUser(userId, signUpDto.getUsername(), signUpDto.getPassword(), signUpDto.getGivenName(), 
				  signUpDto.getFamilyName(), signUpDto.getEmail(), signUpDto.getPhone());
	  }
	  catch(Exception e) {
		  String error = e.getMessage();
		  if(error.contains("user.phone_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
		  }
		  else if(error.contains("user.username_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
		  }
		  else if(error.contains("user.email_UNIQUE")) {
			  throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
		  }
	  }
	  return null;
  }
  
  @DeleteMapping("/{userId}")
  public int deletUser(@PathVariable("userId") Long userId,
		  			   @AuthenticationPrincipal UserDetails currentUser) {
	  User user = userService.getUserById(userId);
	  if(user == null) {
		  throw new HttpServerErrorException(HttpStatus.NOT_FOUND, "User not found");
	  }
	  else if(currentUser.getUsername().equals(user.getUsername())) {
		  return userService.deleteUser(userId);
	  }
	  else {
		  throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Access denied");
	  }
  }
  
  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAll();
  }

  @GetMapping("/{userId}")
  public User getUserById(@PathVariable("userId") Long userId,
                          @AuthenticationPrincipal UserDetails currentUser) {
    User user = userService.getUserById(userId);
    if (currentUser.getUsername().equals(user.getUsername()))
      return user;
    else
      throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Access denied.");
  }
}
