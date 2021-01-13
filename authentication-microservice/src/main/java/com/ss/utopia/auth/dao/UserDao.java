package com.ss.utopia.auth.dao;


import com.ss.utopia.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  Optional<User> findByPhone(String phone);
  Optional<User> findByUsernameOrEmailOrPhone(String username, String email, String phone);
}
