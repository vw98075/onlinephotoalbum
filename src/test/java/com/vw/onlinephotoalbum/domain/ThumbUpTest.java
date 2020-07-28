package com.vw.onlinephotoalbum.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vw.onlinephotoalbum.web.rest.TestUtil;

public class ThumbUpTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThumbUp.class);
        ThumbUp thumbUp1 = new ThumbUp();
        thumbUp1.setId(1L);
        ThumbUp thumbUp2 = new ThumbUp();
        thumbUp2.setId(thumbUp1.getId());
        assertThat(thumbUp1).isEqualTo(thumbUp2);
        thumbUp2.setId(2L);
        assertThat(thumbUp1).isNotEqualTo(thumbUp2);
        thumbUp1.setId(null);
        assertThat(thumbUp1).isNotEqualTo(thumbUp2);
    }
}
