package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.ScrapRepository;
import com.web.stard.repository.StarRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Getter @Setter
@Service
public class StarScrapService {

    MemberService memberService;
    CommunityService communityService;
    StudyService studyService;
    StarRepository starRepository;
    ScrapRepository scrapRepository;



    /* Post(community) Star 여부 확인 */
    public Star existsCommStar(Member member, Post post) {
        Optional<Star> star = starRepository.findByMemberAndPostAndType(member, post, PostType.COMM);

        if (star.isPresent()) {
            return star.get();
        } return null;
    }

    /* 공감한 Post(community) List 조회 */
    public List<Star> allPostStarList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return starRepository.findAllByMemberAndType(member, PostType.COMM);
    }


    /* Post(community) 공감 추가 */
    public Star addPostStar(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        Star star = existsCommStar(member, post);
        if (star != null) {
            return star;
        }

        star = Star.builder()
                .post(post)
                .type(PostType.COMM)
                .member(member)
                .build();

        starRepository.save(star);

        return star;
    }

    /* Post(community) 공감 삭제 */
    public boolean deletePostStar(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());
        Star star = existsCommStar(member, post);

        if (star == null) { // 혹시 모를 오류 방지
            return false;
        }

        starRepository.delete(star);

        star = existsCommStar(member, post);
        if (star == null) {
            return true;
        } return false;
    }



    /* Study Star 여부 확인 */
    public Star existsStudyStar(Member member, Study study) {
        Optional<Star> star = starRepository.findByMemberAndStudyAndType(member, study, PostType.STUDY);

        if (star.isPresent()) {
            return star.get();
        } return null;
    }

    /* 공감한 Study List 조회 */
    public List<Star> allStudyStarList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return starRepository.findAllByMemberAndType(member, PostType.STUDY);
    }

    /* Study 공감 추가 */
    public Star addStudyStar(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        Star star = existsStudyStar(member, study);
        if (star != null) {
            return star;
        }

        star = Star.builder()
                .study(study)
                .type(PostType.STUDY)
                .member(member)
                .build();

        starRepository.save(star);

        return star;
    }

    /* Study 공감 삭제 */
    public boolean deleteStudyStar(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());
        Star star = existsStudyStar(member, study);

        if (star == null) { // 혹시 모를 오류 방지
            return false;
        }

        starRepository.delete(star);

        star = existsStudyStar(member, study);
        if (star == null) {
            return true;
        } return false;
    }






    /* Post(community) Scrap 여부 확인 */
    public Scrap existsCommScrap(Member member, Post post) {
        Optional<Scrap> scrap = scrapRepository.findByMemberAndPostAndType(member, post, PostType.COMM);

        if (scrap.isPresent()) {
            return scrap.get();
        } return null;
    }

    /* 스크랩한 Post(community) List 조회 */
    public List<Scrap> allPostScrapList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return scrapRepository.findAllByMemberAndType(member, PostType.COMM);
    }

    /* Post(community) Scrap 추가 */
    public Scrap addPostScrap(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        Scrap scrap = existsCommScrap(member, post);
        if (scrap != null) {
            return scrap;
        }

        scrap = Scrap.builder()
                .post(post)
                .type(PostType.COMM)
                .member(member)
                .build();

        scrapRepository.save(scrap);

        return scrap;
    }

    /* Scrap 공감 삭제 */
    public boolean deletePostScrap(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());
        Scrap scrap = existsCommScrap(member, post);

        if (scrap == null) { // 혹시 모를 오류 방지
            return false;
        }

        scrapRepository.delete(scrap);

        scrap = existsCommScrap(member, post);
        if (scrap == null) {
            return true;
        } return false;
    }



    /* Study Scrap 여부 확인 */
    public Scrap existsStudyScrap(Member member, Study study) {
        Optional<Scrap> scrap = scrapRepository.findByMemberAndStudyAndType(member, study, PostType.STUDY);

        if (scrap.isPresent()) {
            return scrap.get();
        } return null;
    }

    /* 스크랩한 Study List 조회 */
    public List<Scrap> allStudyScrapList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return scrapRepository.findAllByMemberAndType(member, PostType.STUDY);
    }

    /* Study Scrap 추가 */
    public Scrap addStudyScrap(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        Scrap scrap = existsStudyScrap(member, study);
        if (scrap != null) {
            return scrap;
        }

        scrap = Scrap.builder()
                .study(study)
                .type(PostType.STUDY)
                .member(member)
                .build();

        scrapRepository.save(scrap);

        return scrap;
    }

    /* Study Scrap 삭제 */
    public boolean deleteStudyScrap(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());
        Scrap scrap = existsStudyScrap(member, study);

        if (scrap == null) { // 혹시 모를 오류 방지
            return false;
        }

        scrapRepository.delete(scrap);

        scrap = existsStudyScrap(member, study);
        if (scrap == null) {
            return true;
        } return false;
    }
}
