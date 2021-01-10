package com.ss.utopia.auth.security;

import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.security.core.userdetails.User.withUsername;

@Service
public class UtopiaUserDetailService implements UserDetailsService {
  private final UserDao userDao;
  private final JwtProvider jwtProvider;

  @Autowired
  public UtopiaUserDetailService(UserDao userDao, JwtProvider jwtProvider) {
    this.userDao = userDao;
    this.jwtProvider = jwtProvider;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userDao.findByUsername(username).orElseThrow(() ->
      new UsernameNotFoundException(String.format("User with name %s does not exist", username)));
    return withUsername(user.getUsername())
      .password(user.getPassword())
      .authorities(Collections.emptyList())
      .accountExpired(false)
      .accountLocked(false)
      .credentialsExpired(false)
      .disabled(false)
      .build();
  }

  public Optional<UserDetails> loadUserByJwtToken(String jwtToken) {
    if (jwtProvider.isValidToken(jwtToken)) {
      return Optional.of(
        withUsername(jwtProvider.getUsername(jwtToken))
          .authorities(Collections.emptyList())
          .password("")
          .accountExpired(false)
          .accountLocked(false)
          .credentialsExpired(false)
          .disabled(false)
          .build());
    } else
      return Optional.empty();
  }

  public Optional<UserDetails> loadUserByJwtTokenAndDatabase(String jwtToken) {
    if (jwtProvider.isValidToken(jwtToken)) {
      return Optional.of(loadUserByUsername(jwtProvider.getUsername(jwtToken)));
    } else {
      return Optional.empty();
    }
  }
}
