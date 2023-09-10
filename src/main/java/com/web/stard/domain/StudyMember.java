package com.web.stard.domain;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Study_Member")
public class StudyMember {      // 스터디 참여자

    @Id
    private long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @Column(name = "reply_allow")
    private boolean replyAllow;

    @Column(name = "delete_allow")
    private boolean deleteAllow;

    @Column(name = "recruiter_allow")
    private boolean recruiterAllow;

}
