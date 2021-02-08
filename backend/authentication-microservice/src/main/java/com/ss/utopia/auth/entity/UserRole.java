package com.ss.utopia.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.client.HttpServerErrorException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
  
  public UserRole(String name) {
	  if (name.toUpperCase().equals("ADMIN")) {
	      this.id = 1L;
	    } else if (name.toUpperCase().equals("CUSTOMER")) {
	      this.id = 2L;
	    } else if (name.toUpperCase().equals("AGENT")) {
	      this.id = 3L;
	    } else {
	      throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Unauthorized Role");
	    }
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
}
