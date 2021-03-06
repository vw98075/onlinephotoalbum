package com.vw.onlinephotoalbum.service;

import com.vw.onlinephotoalbum.domain.Follow;
import com.vw.onlinephotoalbum.repository.FollowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Follow}.
 */
@Service
@Transactional
public class FollowService {

    private final Logger log = LoggerFactory.getLogger(FollowService.class);

    private final FollowRepository followRepository;

    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    /**
     * Save a follow.
     *
     * @param follow the entity to save.
     * @return the persisted entity.
     */
    public Follow save(Follow follow) {
        log.debug("Request to save Follow : {}", follow);
        return followRepository.save(follow);
    }

    /**
     * Get all the follows.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Follow> findAll(Pageable pageable) {
        log.debug("Request to get all Follows");
        return followRepository.findAll(pageable);
    }


    /**
     * Get one follow by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Follow> findOne(Long id) {
        log.debug("Request to get Follow : {}", id);
        return followRepository.findById(id);
    }

    /**
     * Delete the follow by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Follow : {}", id);
        followRepository.deleteById(id);
    }
}
