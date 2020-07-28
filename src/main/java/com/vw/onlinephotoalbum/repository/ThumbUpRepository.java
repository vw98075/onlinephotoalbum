package com.vw.onlinephotoalbum.repository;

import com.vw.onlinephotoalbum.domain.ThumbUp;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ThumbUp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThumbUpRepository extends JpaRepository<ThumbUp, Long> {

    @Query("select thumbUp from ThumbUp thumbUp where thumbUp.reviewer.login = ?#{principal.username}")
    List<ThumbUp> findByReviewerIsCurrentUser();
}
