/**
 * 
 */
package com.ss.utopia.auth.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ss.utopia.auth.entity.UserInfo;

/**
 * @author Samnj
 *
 */
public interface UserInfoDao extends JpaRepository<UserInfo, Long> {

}
