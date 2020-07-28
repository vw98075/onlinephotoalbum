package com.vw.onlinephotoalbum.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Follow.
 */
@Entity
@Table(name = "follow")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Follow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "request_time")
    private Instant requestTime;

    @Column(name = "approved")
    private Boolean approved;

    @ManyToOne
    @JsonIgnoreProperties(value = "follows", allowSetters = true)
    private User follower;

    @ManyToOne
    @JsonIgnoreProperties(value = "follows", allowSetters = true)
    private User following;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRequestTime() {
        return requestTime;
    }

    public Follow requestTime(Instant requestTime) {
        this.requestTime = requestTime;
        return this;
    }

    public void setRequestTime(Instant requestTime) {
        this.requestTime = requestTime;
    }

    public Boolean isApproved() {
        return approved;
    }

    public Follow approved(Boolean approved) {
        this.approved = approved;
        return this;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public User getFollower() {
        return follower;
    }

    public Follow follower(User user) {
        this.follower = user;
        return this;
    }

    public void setFollower(User user) {
        this.follower = user;
    }

    public User getFollowing() {
        return following;
    }

    public Follow following(User user) {
        this.following = user;
        return this;
    }

    public void setFollowing(User user) {
        this.following = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Follow)) {
            return false;
        }
        return id != null && id.equals(((Follow) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Follow{" +
            "id=" + getId() +
            ", requestTime='" + getRequestTime() + "'" +
            ", approved='" + isApproved() + "'" +
            "}";
    }
}
