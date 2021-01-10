package com.ss.utopia.auth.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_info")
public class UserInfo {
  @Id
  @Column(name = "user_id")
  Long id;
  @Column(name = "given_name")
  String givenName;
  @Column(name = "family_name")
  String familyName;
  @Column(name = "email")
  String email;
  @Column(name = "phone")
  String phone;
}
