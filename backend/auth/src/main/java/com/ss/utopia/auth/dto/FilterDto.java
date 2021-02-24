package com.ss.utopia.auth.dto;

import java.util.Map;

import javax.validation.constraints.NotNull;

public class FilterDto {

	@NotNull
	private int offset;
	
	@NotNull
	private int limit;
	
	private String username;
	
	private String email;
	
	private String role;
	
	private boolean hasUsername;
	
	private boolean hasEmail;
	
	private boolean hasRole;
	
	public boolean hasUsername() {
		return hasUsername;
	}

	public boolean hasEmail() {
		return hasEmail;
	}

	public boolean hasRole() {
		return hasRole;
	}

	public FilterDto(Map<String,String> params) {
		setOffset(Integer.parseInt(params.get("offset")));
		setLimit(Integer.parseInt(params.get("limit")));
		setUsername(params.get("username"));
		setEmail(params.get("email"));
		setRole(params.get("role"));
	}
	
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		if(username == null) {
			this.username = "";
			this.hasUsername = false;
			return;
		}
		this.hasUsername = true;
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		if(email == null) {
			this.email = "";
			this.hasEmail = false;
			return;
		}
		this.hasEmail = true;
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		if(role == null) {
			this.role = "";
			this.hasRole = false;
			return;
		}
		this.hasRole = true;
		this.role = role;
	}
}
