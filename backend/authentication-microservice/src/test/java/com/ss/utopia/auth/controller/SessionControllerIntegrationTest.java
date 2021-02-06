package com.ss.utopia.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ss.utopia.auth.AuthApplication;
import com.ss.utopia.auth.dto.LoginDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
  classes = AuthApplication.class
)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class SessionControllerIntegrationTest {
  private final static String URI = "/api/session";
  @Autowired
  private MockMvc mockMvc;

  @Value("${security.jwt.token.private-key}")
  private String privateKey;
  @Value("${test}")
  private String test;

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  @DisplayName("Test login")
  void login() throws Exception {
    System.out.println("properties: " + this.test + "\n" + this.privateKey);
    ObjectMapper objectMapper = new ObjectMapper();
    LoginDto loginDto = new LoginDto("customer32434", "password");
    // request body with username and password
    String loginDtoJson = objectMapper.writeValueAsString(loginDto);

    MvcResult mvcResult = this.mockMvc
      .perform(MockMvcRequestBuilders.post(URI)
        .contentType(MediaType.APPLICATION_JSON).content(loginDtoJson)).andReturn();
    System.out.println("Login Response: " + mvcResult.getResponse());
  }

  @Test
  void loginAdmin() {
  }

  @Test
  void loginAgent() {
  }

  @Test
  void getSession() {
  }

  @Test
  void logout() {
  }
}