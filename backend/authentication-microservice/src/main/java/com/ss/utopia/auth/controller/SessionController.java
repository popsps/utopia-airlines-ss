package com.ss.utopia.auth.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;

import com.ss.utopia.auth.dto.LoginDto;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.security.SessionCookieProvider;
import com.ss.utopia.auth.service.UserService;

@RestController
@RequestMapping("/api/session")
public class SessionController {
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
	@PostMapping
	public ResponseEntity<Object> login(@RequestBody @Valid LoginDto loginDto, HttpServletResponse response) {
		final User user = userService.loadAuthenticatedUser(loginDto.getUsername(), loginDto.getPassword())
				.orElseThrow(() -> new HttpServerErrorException(HttpStatus.UNAUTHORIZED, "Login Failed"));
		final Cookie sessionCookie = sessionCookieProvider.createSessionCookie(user)
				.orElseThrow(() -> new HttpServerErrorException(HttpStatus.UNAUTHORIZED, "Login Failed"));
		response.addCookie(sessionCookie);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
