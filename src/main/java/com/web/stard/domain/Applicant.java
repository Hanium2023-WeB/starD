package com.web.stard.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Applicant {        // 스터디 신청자

    @Id
    private long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @Column(name = "application_time")
    private LocalDateTime applicationTime;

    @Column(name = "participation_state")
    private boolean participationState;     // 참여 상태

    @Column(name = "apply_reason")
    private String applyReason;     // 지원 동기


}
