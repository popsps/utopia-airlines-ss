package com.ss.utopia.auth.dto;

public class SessionCookieDto {
  private String jwt;

  public void setJwt(final String jwt) {
    this.jwt = jwt;
  }

  public String getJwt() {
    return jwt;
  }
}
