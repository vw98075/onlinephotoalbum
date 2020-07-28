package com.vw.onlinephotoalbum.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ThumbUp.
 */
@Entity
@Table(name = "thumb_up")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ThumbUp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created")
    private Instant created;

    @ManyToOne
    @JsonIgnoreProperties(value = "thumbUps", allowSetters = true)
    private Photo photo;

    @ManyToOne
    @JsonIgnoreProperties(value = "thumbUps", allowSetters = true)
    private User reviewer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreated() {
        return created;
    }

    public ThumbUp created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Photo getPhoto() {
        return photo;
    }

    public ThumbUp photo(Photo photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public User getReviewer() {
        return reviewer;
    }

    public ThumbUp reviewer(User user) {
        this.reviewer = user;
        return this;
    }

    public void setReviewer(User user) {
        this.reviewer = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThumbUp)) {
            return false;
        }
        return id != null && id.equals(((ThumbUp) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThumbUp{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
