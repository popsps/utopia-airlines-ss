/**
 * 
 */
package com.ss.utopia.auth.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author Samnj
 *
 */
public class SignUpDto {

	@NotBlank
	@Size(min = 3)
	private String username;
	
	@NotBlank
	@Size(min = 6)
	private String password;
	
	@NotBlank
	@Size(min = 2)
	private String givenName;
	
	@NotBlank
	@Size(min = 2)
	private String familyName;
	
	@NotBlank
	private String email;
	
	@NotBlank
	@Size(min = 10)
	private String phone;

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

	public String getGivenName() {
		return givenName;
	}

	public void setGivenName(String givenName) {
		this.givenName = givenName;
	}

	public String getFamilyName() {
		return familyName;
	}

	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
