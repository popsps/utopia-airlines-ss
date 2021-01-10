package com.ss.utopia.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "USER")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "role_id", nullable = false)
  private Long roleId;
  @Column(name = "username", nullable = false)
  private String username;
  @Column(name = "password", nullable = false)
  @JsonIgnore
  private String password;

  protected User() {
  }

  public User(Long id, Long roleId, String username, String password) {
    this.id = id;
    this.roleId = roleId;
    this.username = username;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
