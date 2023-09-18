package com.web.stard.service;

import com.web.stard.domain.*;
import com.web.stard.repository.StarScrapRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter @Setter
@Service
@AllArgsConstructor
public class StarScrapService {

    MemberService memberService;
    CommunityService communityService;
    StudyService studyService;
    StarScrapRepository starScrapRepository;


    /* Post(community) Star 여부 확인 */
    public StarScrap existsCommStar(Member member, Post post) {
        Optional<StarScrap> star = starScrapRepository.findByMemberAndPostAndTypeAndTableType(member, post, ActType.STAR, PostType.COMM);

        if (star.isPresent()) {
            return star.get();
        } return null;
    }

    /* 공감한 Post(community) List 조회 */
    public List<StarScrap> allPostStarList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return starScrapRepository.findAllByMemberAndTypeAndTableType(member, ActType.STAR, PostType.COMM);
    }

    /* 해당 Post(community)의 공감 개수 */
    public int countPostStar(Long id) {
        Post post = communityService.getCommunityPost(id);

        List<StarScrap> allStarList = starScrapRepository.findAllByPostAndTypeAndTableType(post, ActType.STAR, PostType.COMM);

        return allStarList.size();
    }


    /* Post(community) 공감 추가 */
    public StarScrap addPostStar(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());

        // 자신의 글은 공감 불가능
        if (post.getMember().equals(member.getId())) {
            return null;
        }

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        StarScrap star = existsCommStar(member, post);
        if (star != null) {
            return star;
        }

        star = StarScrap.builder()
                .post(post)
                .type(ActType.STAR)
                .tableType(PostType.COMM)
                .member(member)
                .build();

        starScrapRepository.save(star);

        return star;
    }

    /* Post(community) 공감 삭제 */
    public boolean deletePostStar(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());
        StarScrap star = existsCommStar(member, post);

        if (star == null) { // 혹시 모를 오류 방지
            return false;
        }

        starScrapRepository.delete(star);

        star = existsCommStar(member, post);
        if (star == null) {
            return true;
        } return false;
    }



    /* ScrapStudySlide Star 여부 확인 */
    public StarScrap existsStudyStar(Member member, Study study) {
        Optional<StarScrap> star = starScrapRepository.findByMemberAndStudyAndTypeAndTableType(member, study,ActType.STAR, PostType.STUDY);

        if (star.isPresent()) {
            return star.get();
        } return null;
    }

    /* 공감한 ScrapStudySlide List 조회 */
    public List<StarScrap> allStudyStarList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        return starScrapRepository.findAllByMemberAndTypeAndTableType(member,ActType.STAR, PostType.STUDY);
    }

    /* 해당 Study의 공감 개수 */
    public int countStudyStar(Long id) {
        Study study = studyService.findById(id);

        List<StarScrap> allStarList = starScrapRepository.findAllByStudyAndTypeAndTableType(study, ActType.STAR, PostType.STUDY);

        return allStarList.size();
    }

    /* study 공감 여부 */
    public Boolean getStudyStar(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        StarScrap star = existsStudyStar(member, study);
        if (star != null) {
            return true;
        } return false;
    }

    /* ScrapStudySlide 공감 추가 */
    public StarScrap addStudyStar(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        // 자신의 글은 공감 불가능
        if (study.getRecruiter().equals(member.getId())) {
            return null;
        }

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        StarScrap star = existsStudyStar(member, study);
        if (star != null) {
            return star;
        }

        star = StarScrap.builder()
                .study(study)
                .type(ActType.STAR)
                .tableType(PostType.STUDY)
                .member(member)
                .build();

        starScrapRepository.save(star);

        return star;
    }

    /* ScrapStudySlide 공감 삭제 */
    public boolean deleteStudyStar(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());
        StarScrap star = existsStudyStar(member, study);

        if (star == null) { // 혹시 모를 오류 방지
            return false;
        }

        starScrapRepository.delete(star);

        star = existsStudyStar(member, study);
        if (star == null) {
            return true;
        } return false;
    }






    /* Post(community) Scrap 여부 확인 */
    public StarScrap existsCommScrap(Member member, Post post) {
        Optional<StarScrap> scrap = starScrapRepository.findByMemberAndPostAndTypeAndTableType(member, post, ActType.SCRAP, PostType.COMM);

        if (scrap.isPresent()) {
            return scrap.get();
        } return null;
    }

    /* 스크랩한 Post(community) List 조회 */
    public List<Study> allPostScrapList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        List<StarScrap> scraps = starScrapRepository.findAllByMemberAndTypeAndTableType(member, ActType.SCRAP, PostType.COMM);
        List<Study> scrapList = null;
        if (scraps.size() > 0) {
            scrapList = new ArrayList<>();
        }
        for (StarScrap s : scraps) {
            scrapList.add(s.getStudy());
        }
        return scrapList;
    }

    /* 해당 Post(community)의 스크랩 개수 */
    public int countPostScrap(Long id) {
        Post post = communityService.getCommunityPost(id);

        List<StarScrap> allScrapList = starScrapRepository.findAllByPostAndTypeAndTableType(post, ActType.SCRAP, PostType.COMM);

        return allScrapList.size();
    }

    /* Post(community) Scrap 추가 */
    public StarScrap addPostScrap(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        StarScrap scrap = existsCommScrap(member, post);
        if (scrap != null) {
            return scrap;
        }

        scrap = StarScrap.builder()
                .post(post)
                .type(ActType.SCRAP)
                .tableType(PostType.COMM)
                .member(member)
                .build();

        starScrapRepository.save(scrap);

        return scrap;
    }

    /* Post(community) Scrap 삭제 */
    public boolean deletePostScrap(Long id, Authentication authentication) {
        Post post = communityService.getCommunityPost(id);
        Member member = memberService.find(authentication.getName());
        StarScrap scrap = existsCommScrap(member, post);

        if (scrap == null) { // 혹시 모를 오류 방지
            return false;
        }

        starScrapRepository.delete(scrap);

        scrap = existsCommScrap(member, post);
        if (scrap == null) {
            return true;
        } return false;
    }



    /* ScrapStudySlide Scrap 여부 확인 */
    public StarScrap existsStudyScrap(Member member, Study study) {
        Optional<StarScrap> scrap = starScrapRepository.findByMemberAndStudyAndTypeAndTableType(member, study, ActType.SCRAP, PostType.STUDY);

        if (scrap.isPresent()) {
            return scrap.get();
        } return null;
    }

    /* 스크랩한 ScrapStudySlide List 조회 */
    public List<Study> allStudyScrapList(Authentication authentication) {
        Member member = memberService.find(authentication.getName());
        List<StarScrap> scraps = starScrapRepository.findAllByMemberAndTypeAndTableType(member, ActType.SCRAP, PostType.STUDY);
        List<Study> scrapList = null;
        if (scraps.size() > 0) {
            scrapList = new ArrayList<>();
        }
        for (StarScrap s : scraps) {
            scrapList.add(s.getStudy());
        }
        return scrapList;
    }

    /* 해당 Study의 스크랩 개수 */
    public int countStudyScrap(Long id) {
        Study study = studyService.findById(id);

        List<StarScrap> allScrapList = starScrapRepository.findAllByStudyAndTypeAndTableType(study, ActType.SCRAP, PostType.STUDY);

        return allScrapList.size();
    }

    /* study 스크랩 여부 */
    public Boolean getStudyScrap(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        StarScrap scrap = existsStudyScrap(member, study);
        if (scrap != null) {
            return true;
        } return false;
    }

    /* ScrapStudySlide Scrap 추가 */
    public StarScrap addStudyScrap(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());

        // 이미 존재하는지 확인 (혹시 모를 중복 저장 방지)
        StarScrap scrap = existsStudyScrap(member, study);
        if (scrap != null) {
            return scrap;
        }

        scrap = StarScrap.builder()
                .study(study)
                .type(ActType.SCRAP)
                .tableType(PostType.STUDY)
                .member(member)
                .build();

        starScrapRepository.save(scrap);

        return scrap;
    }

    /* ScrapStudySlide Scrap 삭제 */
    public boolean deleteStudyScrap(Long id, Authentication authentication) {
        Study study = studyService.findById(id);
        Member member = memberService.find(authentication.getName());
        StarScrap scrap = existsStudyScrap(member, study);

        if (scrap == null) { // 혹시 모를 오류 방지
            return false;
        }

        starScrapRepository.delete(scrap);

        scrap = existsStudyScrap(member, study);
        if (scrap == null) {
            return true;
        } return false;
    }



    public List<Boolean> getStudyPageStar(int page, Authentication authentication) {
        Page<Study> studies = studyService.findAllByOrderByRecruitStatus(page);
        Member member = memberService.find(authentication.getName());
        List<Boolean> stars = new ArrayList<>();

        for (Study study : studies.getContent()) {
            if (existsStudyStar(member, study) == null) {
                stars.add(false);
            } else {
                stars.add(true);
            }
        }

        return stars;
    }

    public List<Boolean> getStudyPageScrap(int page, Authentication authentication) {
        Page<Study> studies = studyService.findAllByOrderByRecruitStatus(page);
        Member member = memberService.find(authentication.getName());
        List<Boolean> scraps = new ArrayList<>();

        for (Study study : studies.getContent()) {
            if (existsStudyScrap(member, study) == null) {
                scraps.add(false);
            } else {
                scraps.add(true);
            }
        }

        return scraps;
    }

    public List<Boolean> getStudyPageStarByScrap(Authentication authentication) {
        List<Study> studies = allStudyScrapList(authentication);
        Member member = memberService.find(authentication.getName());
        List<Boolean> stars = new ArrayList<>();

        for (Study study : studies) {
            if (existsStudyStar(member, study) == null) {
                stars.add(false);
            } else {
                stars.add(true);
            }
        }

        return stars;
    }

    public List<Boolean> getMyPageStudyStarScrap(int page, Authentication authentication,
                                                 String status, String type) {
        // status -> 참여, 개설, 신청
        // type -> 공감, 스크랩

        List<Boolean> starScraps = new ArrayList<>();
        Member member = memberService.find(authentication.getName());
        List<Study> studies = null;

        if (status.equals("participate")) {
            if (type.equals("star")) {

            } else { // scrap

            }
        } else if (status.equals("open")) {
            Page<Study> studyList = studyService.findByRecruiter(authentication, page);
            if (type.equals("star")) {
                for (Study study : studyList.getContent()) {
                    if (existsStudyStar(member, study) == null) {
                        starScraps.add(false);
                    } else {
                        starScraps.add(true);
                    }
                }
            } else { // scrap
                for (Study study : studyList.getContent()) {
                    if (existsStudyScrap(member, study) == null) {
                        starScraps.add(false);
                    } else {
                        starScraps.add(true);
                    }
                }
            }
        } else { // apply
            Page<Applicant> applicants = studyService.findByMember(authentication, page);
            studies = new ArrayList<>();
            for (Applicant applicant : applicants.getContent()) {
                studies.add(applicant.getStudy());
            }

            if (type.equals("star")) {
                for (Study study : studies) {
                    if (existsStudyStar(member, study) == null) {
                        starScraps.add(false);
                    } else {
                        starScraps.add(true);
                    }
                }
            } else { // scrap
                for (Study study : studies) {
                    if (existsStudyScrap(member, study) == null) {
                        starScraps.add(false);
                    } else {
                        starScraps.add(true);
                    }
                }
            }
        }

        return starScraps;
    }
}
