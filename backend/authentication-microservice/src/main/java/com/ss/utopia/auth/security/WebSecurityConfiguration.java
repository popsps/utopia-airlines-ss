package com.ss.utopia.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration file for web security
 */
@Configuration
//@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final UtopiaUserDetailService utopiaUserDetailService;
  private final JwtProvider jwtProvider;

  @Autowired
  public WebSecurityConfiguration(UtopiaUserDetailService utopiaUserDetailService, JwtProvider jwtProvider) {
    this.utopiaUserDetailService = utopiaUserDetailService;
    this.jwtProvider = jwtProvider;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Entry points
    http.authorizeRequests()
      .antMatchers("/users/signin", "/users/signup").permitAll()
      // Disallow everything else
      .anyRequest().authenticated();
    // Disable CSRF (cross site request forgery)
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    http.addFilterBefore(new JwtTokenFilter(utopiaUserDetailService, jwtProvider),
      UsernamePasswordAuthenticationFilter.class);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(11);
  }
}
