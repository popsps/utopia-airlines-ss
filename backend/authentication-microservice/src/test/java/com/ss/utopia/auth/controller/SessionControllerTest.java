package com.ss.utopia.auth.controller;

import com.ss.utopia.auth.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(SessionController.class)
class SessionControllerTest {
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private UserService userService;

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  @DisplayName("Test login")
  void login() {
  }

  @Test
  @DisplayName("Test login as an admin; Post HttpStatus.CREATED")
  void loginAdmin() {
  }

  @Test
  @DisplayName("Test login as an agent; Post HttpStatus.CREATED")
  void loginAgent() {
  }

  @Test
  @DisplayName("Test get session information; Get")
  void getSession() {
  }

  @Test
  @DisplayName("Test logout; delete; HttpStatus.NO_CONTENT")
  void logout() {
  }
}