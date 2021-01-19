package com.ss.utopia.auth.security.jwt;

import com.ss.utopia.auth.entity.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Optional;

@Service
public class JwtProvider {
  @Value("${security.jwt.token.secret-key}")
  private String secretKey;
  @Value("${security.jwt.token.expiration}")
  private long validityInMilliseconds;

  public Claims createUserClaims(final User user) {
    final Claims claims = Jwts.claims().setSubject(Long.toHexString(user.getId()));
    return claims;
  }

  /**
   * Create A JWT Token based on username and roles associated to the user
   *
   * @param userId
   * @param roles
   * @return
   */
  public String createToken(final Claims claims) {
    final Date now = new Date();
    final Date expiresAt = new Date(now.getTime() + validityInMilliseconds);
    return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(expiresAt)
        .signWith(SignatureAlgorithm.HS256, secretKey).compact();
  }

  public Optional<Claims> validateToken(final String token) {
    try {
      final Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
      if (claims.getExpiration().before(new Date()))
        throw new IllegalArgumentException();
      return Optional.of(claims);
    } catch (JwtException | IllegalArgumentException e) {
      return Optional.empty();
    }
  }

  /**
   * extract userId from the jwt token claims
   *
   * @param claims
   * @return
   */
  public Long getUserId(final Claims claims) {
    return Long.parseLong(claims.getSubject(), 16);
  }
}
