package com.web.stard.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private float credibility; // 신뢰도 (별점 평균)
    private String introduce; // 자기소개
    private String img_name; // 이미지 이름
    private String img_url; // 이미지 경로
}
