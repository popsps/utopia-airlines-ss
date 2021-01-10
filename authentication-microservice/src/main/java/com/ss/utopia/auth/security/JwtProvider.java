package com.ss.utopia.auth.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class JwtProvider {
  private final String ROLES_KEY = "roles";
  private String secretKey;
  private long validityInMilliseconds;

  @Autowired
  public JwtProvider(@Value("${security.jwt.token.secret-key}") String secretKey,
                     @Value("${security.jwt.token.expiration}") long validityInMilliseconds) {

    this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    this.validityInMilliseconds = validityInMilliseconds;
  }

  // roles need to be added
  public String createToken(String username) {
    Claims claims = Jwts.claims().setSubject(username);
    Date now = new Date();
    Date expiresAt = new Date(now.getTime() + validityInMilliseconds);
    return Jwts.builder()
      .setClaims(claims)
      .setIssuedAt(now)
      .setExpiration(expiresAt)
      .signWith(SignatureAlgorithm.HS256, secretKey)
      .compact();
  }

  public boolean isValidToken(String token) {
    try {
      Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }

  public String getUsername(String token) {
    return Jwts.parser().setSigningKey(secretKey)
      .parseClaimsJws(token).getBody().getSubject();
  }
}
