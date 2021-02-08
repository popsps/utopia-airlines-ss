package com.ss.utopia.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ss.utopia.auth.AuthApplication;
import com.ss.utopia.auth.dao.UserDao;
import com.ss.utopia.auth.entity.User;
import com.ss.utopia.auth.entity.UserRole;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
  classes = AuthApplication.class
)
@TestPropertySource(locations = "classpath:application-test.properties")
class UserServiceIntegrationTest {

  @Autowired
  private UserService userService;
  @Autowired
  PasswordEncoder passwordEncoder;
//  @SpyBean
//  private UserDao userDao;

  private User getAdminUser() throws JsonProcessingException {
    return new User(1001L, "admin", "password", new UserRole(1L, "ADMIN"),
      "Admin", "Admin", "admin@utopia.com", "56760989888");
  }

  private User getAgentUser() throws JsonProcessingException {
    return new User(332L, "aeggleton97", "password", new UserRole(3L, "AGENT"),
      "Alix", "Eggleton", "aeggleton97@ucla.edu", "9241933200");
  }

  private User getCustomerUser() throws JsonProcessingException {
    return new User(2L, "tmckernan1", "password", new UserRole(2L, "CUSTOMER"),
      "Trever", "McKernan", "tmckernan1@hibu.com", "1138845977");
  }

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  @DisplayName("")
  void loadUserByUsername() {
  }

  @Test
  @DisplayName("")
  void loadAuthenticatedUser() {
  }

  @Test
  @DisplayName("")
  void signup() {
  }

  @Test
  @DisplayName("")
  void updateUser() {
  }

  @Test
  @DisplayName("")
  void deleteUser() {
  }

  @Test
  @DisplayName("")
  void getAll() {
  }

  @Test
  @DisplayName("")
  void getUserById() {
  }

  @Test
  @DisplayName("")
  void verifyOwnershipAndReturnOwner() {
  }

  @Test
  @DisplayName("")
  void removeCookie() {
  }

  @Test
  @DisplayName("Test finding a user in the database by its user name; the username exists")
  void getUserByUsername() throws JsonProcessingException {
    User expectedUser = getCustomerUser();
    String username = expectedUser.getUsername();
    User actualUser = userService.getUserByUsername(username);
    assertEquals(expectedUser, actualUser);
  }

  @Test
  @DisplayName("")
  void isUserAdmin() {
  }

  @Test
  @DisplayName("")
  void isUserAgent() {
  }
}