package com.vw.onlinephotoalbum.service;

import com.vw.onlinephotoalbum.domain.ThumbUp;
import com.vw.onlinephotoalbum.repository.ThumbUpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ThumbUp}.
 */
@Service
@Transactional
public class ThumbUpService {

    private final Logger log = LoggerFactory.getLogger(ThumbUpService.class);

    private final ThumbUpRepository thumbUpRepository;

    public ThumbUpService(ThumbUpRepository thumbUpRepository) {
        this.thumbUpRepository = thumbUpRepository;
    }

    /**
     * Save a thumbUp.
     *
     * @param thumbUp the entity to save.
     * @return the persisted entity.
     */
    public ThumbUp save(ThumbUp thumbUp) {
        log.debug("Request to save ThumbUp : {}", thumbUp);
        return thumbUpRepository.save(thumbUp);
    }

    /**
     * Get all the thumbUps.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ThumbUp> findAll(Pageable pageable) {
        log.debug("Request to get all ThumbUps");
        return thumbUpRepository.findAll(pageable);
    }


    /**
     * Get one thumbUp by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ThumbUp> findOne(Long id) {
        log.debug("Request to get ThumbUp : {}", id);
        return thumbUpRepository.findById(id);
    }

    /**
     * Delete the thumbUp by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ThumbUp : {}", id);
        thumbUpRepository.deleteById(id);
    }
}
