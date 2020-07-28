package com.vw.onlinephotoalbum.web.rest;

import com.vw.onlinephotoalbum.domain.ThumbUp;
import com.vw.onlinephotoalbum.service.ThumbUpService;
import com.vw.onlinephotoalbum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.vw.onlinephotoalbum.domain.ThumbUp}.
 */
@RestController
@RequestMapping("/api")
public class ThumbUpResource {

    private final Logger log = LoggerFactory.getLogger(ThumbUpResource.class);

    private static final String ENTITY_NAME = "thumbUp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThumbUpService thumbUpService;

    public ThumbUpResource(ThumbUpService thumbUpService) {
        this.thumbUpService = thumbUpService;
    }

    /**
     * {@code POST  /thumb-ups} : Create a new thumbUp.
     *
     * @param thumbUp the thumbUp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thumbUp, or with status {@code 400 (Bad Request)} if the thumbUp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/thumb-ups")
    public ResponseEntity<ThumbUp> createThumbUp(@RequestBody ThumbUp thumbUp) throws URISyntaxException {
        log.debug("REST request to save ThumbUp : {}", thumbUp);
        if (thumbUp.getId() != null) {
            throw new BadRequestAlertException("A new thumbUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThumbUp result = thumbUpService.save(thumbUp);
        return ResponseEntity.created(new URI("/api/thumb-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /thumb-ups} : Updates an existing thumbUp.
     *
     * @param thumbUp the thumbUp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thumbUp,
     * or with status {@code 400 (Bad Request)} if the thumbUp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thumbUp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/thumb-ups")
    public ResponseEntity<ThumbUp> updateThumbUp(@RequestBody ThumbUp thumbUp) throws URISyntaxException {
        log.debug("REST request to update ThumbUp : {}", thumbUp);
        if (thumbUp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThumbUp result = thumbUpService.save(thumbUp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, thumbUp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /thumb-ups} : get all the thumbUps.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thumbUps in body.
     */
    @GetMapping("/thumb-ups")
    public ResponseEntity<List<ThumbUp>> getAllThumbUps(Pageable pageable) {
        log.debug("REST request to get a page of ThumbUps");
        Page<ThumbUp> page = thumbUpService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /thumb-ups/:id} : get the "id" thumbUp.
     *
     * @param id the id of the thumbUp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thumbUp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/thumb-ups/{id}")
    public ResponseEntity<ThumbUp> getThumbUp(@PathVariable Long id) {
        log.debug("REST request to get ThumbUp : {}", id);
        Optional<ThumbUp> thumbUp = thumbUpService.findOne(id);
        return ResponseUtil.wrapOrNotFound(thumbUp);
    }

    /**
     * {@code DELETE  /thumb-ups/:id} : delete the "id" thumbUp.
     *
     * @param id the id of the thumbUp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/thumb-ups/{id}")
    public ResponseEntity<Void> deleteThumbUp(@PathVariable Long id) {
        log.debug("REST request to delete ThumbUp : {}", id);
        thumbUpService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
