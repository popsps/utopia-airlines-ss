package com.ss.utopia.auth.dao;


import com.ss.utopia.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
}
