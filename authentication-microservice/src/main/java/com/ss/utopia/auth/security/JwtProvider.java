package com.ss.utopia.auth.security;

import com.ss.utopia.auth.entity.UserRole;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

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
  public String createToken(String username, List<UserRole> roles) {
    Claims claims = Jwts.claims().setSubject(username);
    claims.put(ROLES_KEY, roles.stream().map(role ->
      new SimpleGrantedAuthority(role.getAuthority()))
      .filter(Objects::nonNull).collect(Collectors.toList()));
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

  public List<GrantedAuthority> getRoles(String token) {
    List<Map<String, String>> roleClaims = Jwts.parser()
      .setSigningKey(secretKey).parseClaimsJws(token).getBody()
      .get(ROLES_KEY, List.class);
    return roleClaims.stream().map(roleClaim -> new SimpleGrantedAuthority(
      roleClaim.get("authority")))
      .collect(Collectors.toList());
  }

  // ===============================================================
  public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = getUsername(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(secretKey)
      .parseClaimsJws(token).getBody();
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }
}
