package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.dto.SignUpDto;
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
		response.addCookie(sessionCookieProvider.createSessionCookie(user));
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	/*
	 * Samuel will be working here placeholder code You may need to replace loginDto
	 * with your own Dto or add additional arbitrary information to the LoginDto or
	 * You may want to create a signup DTO in the DTO package to pass all necessary
	 * information regarding the user sign-up information as a class
	 */
	@PostMapping("/signup")
	@ResponseStatus(HttpStatus.CREATED)
	public User signup(@RequestBody @Valid SignUpDto signUpDto) {
		try {
			return userService.signup(signUpDto.getUsername(), signUpDto.getPassword(), signUpDto.getGivenName(),
					signUpDto.getFamilyName(), signUpDto.getEmail(), signUpDto.getPhone()).get();
		} catch (Exception e) {
			String error = e.getMessage();
			if (error.contains("user.phone_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
			} else if (error.contains("user.username_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
			} else if (error.contains("user.email_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
			}
		}
		return null;
	}

	@PutMapping("/{userId}")
	public User updateUser(@PathVariable Long userId, @RequestBody @Valid SignUpDto signUpDto,
			@AuthenticationPrincipal UserDetails currentUser) {
		User user = userService.getUserById(userId);
		if (user == null) {
			throw new HttpServerErrorException(HttpStatus.NOT_FOUND, "User not Found");
		} else if (!user.getUsername().equals(currentUser.getUsername())) {
			throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Unauthorized user");
		}
		try {
			return userService.updateUser(userId, signUpDto.getUsername(), signUpDto.getPassword(), signUpDto.getGivenName(),
					signUpDto.getFamilyName(), signUpDto.getEmail(), signUpDto.getPhone());
		} catch (Exception e) {
			String error = e.getMessage();
			if (error.contains("user.phone_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Email is taken");
			} else if (error.contains("user.username_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Username is taken");
			} else if (error.contains("user.email_UNIQUE")) {
				throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Phone number is taken");
			}
		}
		return null;
	}

	@DeleteMapping("/{userId}")
	public int deletUser(@PathVariable("userId") Long userId, @AuthenticationPrincipal UserDetails currentUser) {
		User user = userService.getUserById(userId);
		if (user == null) {
			throw new HttpServerErrorException(HttpStatus.NOT_FOUND, "User not found");
		} else if (currentUser.getUsername().equals(user.getUsername())) {
			return userService.deleteUser(userId);
		} else {
			throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Access denied");
		}
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<User> getAllUsers() {
		return userService.getAll();
	}

	@GetMapping("/{userId}")
	public User getUserById(@PathVariable("userId") Long userId, @AuthenticationPrincipal UserDetails currentUser) {
		User user = userService.getUserById(userId);
		if (currentUser.getUsername().equals(user.getUsername()))
			return user;
		else
			throw new HttpServerErrorException(HttpStatus.FORBIDDEN, "Access denied.");
	}
}
