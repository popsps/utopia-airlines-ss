package com.ss.utopia.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.entity.UserRole;
import com.ss.utopia.auth.security.SessionCookieProvider;
import com.ss.utopia.auth.security.jwt.JwtProvider;
import com.ss.utopia.auth.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SessionController.class)
class SessionControllerTest {
  private final static String URI = "/api/session";
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private UserService userService;
  @MockBean
  private SessionCookieProvider sessionCookieProvider;
  @MockBean
  private JwtProvider jwtProvider;
  @MockBean
  private UserDao userDao;

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
  @WithMockUser("customer32434")
  void getSession() throws Exception {
    String currentUsername = "customer32434";
    User userToReturn =
      new User(32434L, currentUsername, "password", new UserRole(2L, "CUSTOMER"),
        "fname", "lname", "flcust@gmail.com", "2028769868");
    when(userService.getUserByUsername(any())).thenReturn(userToReturn);
    ObjectMapper objectMapper = new ObjectMapper();
    String userInfoJsonString = objectMapper.writeValueAsString(userToReturn);
    this.mockMvc
      .perform(MockMvcRequestBuilders.get(URI).contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andDo(result -> System.out.println("user info: " + result.getResponse().getContentAsString()))
      .andExpect(MockMvcResultMatchers.content().json(userInfoJsonString));
  }

  @Test
  @DisplayName("Test logout; delete; HttpStatus.NO_CONTENT")
  void logout() {
  }
}