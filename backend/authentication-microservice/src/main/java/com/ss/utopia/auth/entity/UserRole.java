package com.ss.utopia.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "user_role")
public class UserRole implements GrantedAuthority {
  private static final long serialVersionUID = 1L;
  @Id
  @Column(name = "id")
  Long id;
  @Column(name = "name")
  String name;

  public UserRole(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  protected UserRole() {

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @JsonIgnore
  @Override
  public String getAuthority() {
    return "ROLE_" + name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof UserRole)) return false;
    UserRole userRole = (UserRole) o;
    return getId().equals(userRole.getId()) && getName().equals(userRole.getName());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getName());
  }
}
