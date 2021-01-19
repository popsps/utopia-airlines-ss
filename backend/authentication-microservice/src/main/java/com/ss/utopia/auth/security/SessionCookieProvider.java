package com.ss.utopia.auth.security;

import javax.servlet.http.Cookie;

import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.security.jwt.JwtProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionCookieProvider {
  @Autowired
  private JwtProvider jwtProvider;

  public Cookie createSessionCookie(final User user) {
    final String token = jwtProvider.createToken(jwtProvider.createUserClaims(user));
    final Cookie sessionCookie = new Cookie("session", token);
    sessionCookie.setPath("/");
    // sessionCookie.setHttpOnly(true);
    return sessionCookie;
  }

  public String parseAuthJwt(final Cookie sessionCookie) {
    return sessionCookie.getValue();
  }
}
