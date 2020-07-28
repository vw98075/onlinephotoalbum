package com.vw.onlinephotoalbum.web.rest;

import com.vw.onlinephotoalbum.OnlinephotoalbumApp;
import com.vw.onlinephotoalbum.domain.ThumbUp;
import com.vw.onlinephotoalbum.repository.ThumbUpRepository;
import com.vw.onlinephotoalbum.service.ThumbUpService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ThumbUpResource} REST controller.
 */
@SpringBootTest(classes = OnlinephotoalbumApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ThumbUpResourceIT {

    private static final Instant DEFAULT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ThumbUpRepository thumbUpRepository;

    @Autowired
    private ThumbUpService thumbUpService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThumbUpMockMvc;

    private ThumbUp thumbUp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThumbUp createEntity(EntityManager em) {
        ThumbUp thumbUp = new ThumbUp()
            .created(DEFAULT_CREATED);
        return thumbUp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThumbUp createUpdatedEntity(EntityManager em) {
        ThumbUp thumbUp = new ThumbUp()
            .created(UPDATED_CREATED);
        return thumbUp;
    }

    @BeforeEach
    public void initTest() {
        thumbUp = createEntity(em);
    }

    @Test
    @Transactional
    public void createThumbUp() throws Exception {
        int databaseSizeBeforeCreate = thumbUpRepository.findAll().size();
        // Create the ThumbUp
        restThumbUpMockMvc.perform(post("/api/thumb-ups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thumbUp)))
            .andExpect(status().isCreated());

        // Validate the ThumbUp in the database
        List<ThumbUp> thumbUpList = thumbUpRepository.findAll();
        assertThat(thumbUpList).hasSize(databaseSizeBeforeCreate + 1);
        ThumbUp testThumbUp = thumbUpList.get(thumbUpList.size() - 1);
        assertThat(testThumbUp.getCreated()).isEqualTo(DEFAULT_CREATED);
    }

    @Test
    @Transactional
    public void createThumbUpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thumbUpRepository.findAll().size();

        // Create the ThumbUp with an existing ID
        thumbUp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThumbUpMockMvc.perform(post("/api/thumb-ups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thumbUp)))
            .andExpect(status().isBadRequest());

        // Validate the ThumbUp in the database
        List<ThumbUp> thumbUpList = thumbUpRepository.findAll();
        assertThat(thumbUpList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllThumbUps() throws Exception {
        // Initialize the database
        thumbUpRepository.saveAndFlush(thumbUp);

        // Get all the thumbUpList
        restThumbUpMockMvc.perform(get("/api/thumb-ups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thumbUp.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())));
    }
    
    @Test
    @Transactional
    public void getThumbUp() throws Exception {
        // Initialize the database
        thumbUpRepository.saveAndFlush(thumbUp);

        // Get the thumbUp
        restThumbUpMockMvc.perform(get("/api/thumb-ups/{id}", thumbUp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thumbUp.getId().intValue()))
            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingThumbUp() throws Exception {
        // Get the thumbUp
        restThumbUpMockMvc.perform(get("/api/thumb-ups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThumbUp() throws Exception {
        // Initialize the database
        thumbUpService.save(thumbUp);

        int databaseSizeBeforeUpdate = thumbUpRepository.findAll().size();

        // Update the thumbUp
        ThumbUp updatedThumbUp = thumbUpRepository.findById(thumbUp.getId()).get();
        // Disconnect from session so that the updates on updatedThumbUp are not directly saved in db
        em.detach(updatedThumbUp);
        updatedThumbUp
            .created(UPDATED_CREATED);

        restThumbUpMockMvc.perform(put("/api/thumb-ups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedThumbUp)))
            .andExpect(status().isOk());

        // Validate the ThumbUp in the database
        List<ThumbUp> thumbUpList = thumbUpRepository.findAll();
        assertThat(thumbUpList).hasSize(databaseSizeBeforeUpdate);
        ThumbUp testThumbUp = thumbUpList.get(thumbUpList.size() - 1);
        assertThat(testThumbUp.getCreated()).isEqualTo(UPDATED_CREATED);
    }

    @Test
    @Transactional
    public void updateNonExistingThumbUp() throws Exception {
        int databaseSizeBeforeUpdate = thumbUpRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThumbUpMockMvc.perform(put("/api/thumb-ups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thumbUp)))
            .andExpect(status().isBadRequest());

        // Validate the ThumbUp in the database
        List<ThumbUp> thumbUpList = thumbUpRepository.findAll();
        assertThat(thumbUpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThumbUp() throws Exception {
        // Initialize the database
        thumbUpService.save(thumbUp);

        int databaseSizeBeforeDelete = thumbUpRepository.findAll().size();

        // Delete the thumbUp
        restThumbUpMockMvc.perform(delete("/api/thumb-ups/{id}", thumbUp.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ThumbUp> thumbUpList = thumbUpRepository.findAll();
        assertThat(thumbUpList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
