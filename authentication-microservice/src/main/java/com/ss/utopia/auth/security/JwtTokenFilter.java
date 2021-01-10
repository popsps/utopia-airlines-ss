package com.ss.utopia.auth.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenFilter extends OncePerRequestFilter {
  private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenFilter.class);

  private final UtopiaUserDetailService utopiaUserDetailService;
  @Autowired
  private JwtProvider jwtProvider;

  @Autowired
  public JwtTokenFilter(UtopiaUserDetailService utopiaUserDetailService) {
    this.utopiaUserDetailService = utopiaUserDetailService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
    LOGGER.info("Process request to check for a JSON Web Token");
    auth1(request);
    filterChain.doFilter(request, response);
  }

  private void auth1(HttpServletRequest request) {
    final String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String token = null;
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.substring(7);
      utopiaUserDetailService.loadUserByJwtToken(token).ifPresent(userDetails ->
        SecurityContextHolder.getContext().setAuthentication(
          new PreAuthenticatedAuthenticationToken(userDetails,
            "", userDetails.getAuthorities())));

    }
  }

  private void auth2(HttpServletRequest request) {
    final String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String token = null;
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.substring(7);
      username = jwtProvider.getUsername(token);
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = this.utopiaUserDetailService.loadUserByUsername(username);
      if (this.jwtProvider.isValidToken(token)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken
          .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      }
    }
  }
}
