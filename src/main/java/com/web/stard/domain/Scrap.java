package com.web.stard.domain;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Scrap {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @Enumerated(EnumType.STRING)
    private PostType type; // 게시글 타입 (COMM / STUDY)

    @NotNull @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
