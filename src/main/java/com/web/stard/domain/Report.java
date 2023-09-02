package com.web.stard.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter @Setter
public class Report {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Member member;  // 신고 대상자 (글 작성자)

    private Post post;

    private Study study;

    private Reply reply;

    @NotNull
    @Column(name = "table_type")
    @Enumerated(EnumType.STRING)
    private PostType tableType;    // [COMM, QNA, STUDY, REPLY]

}
