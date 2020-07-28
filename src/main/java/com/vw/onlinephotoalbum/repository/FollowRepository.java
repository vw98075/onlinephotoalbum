package com.vw.onlinephotoalbum.repository;

import com.vw.onlinephotoalbum.domain.Follow;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Follow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select follow from Follow follow where follow.follower.login = ?#{principal.username}")
    List<Follow> findByFollowerIsCurrentUser();

    @Query("select follow from Follow follow where follow.following.login = ?#{principal.username}")
    List<Follow> findByFollowingIsCurrentUser();
}
