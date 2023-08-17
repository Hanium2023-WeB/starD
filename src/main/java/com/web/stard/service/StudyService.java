package com.web.stard.service;


import com.web.stard.domain.Member;
import com.web.stard.domain.Study;
import com.web.stard.dto.StudyDto;
import com.web.stard.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudyService {

    private StudyRepository studyRepository;

    public Study findById(Long id){
        Optional<Study> result = studyRepository.findById(id);

        if(result.isEmpty())
            return null;
        return result.get();

    }

    public List<Study> findAll(){
        List<Study> studies = studyRepository.findAll();
        return studies;
    }

    @Transactional
    public void deleteStudy(Study study) {
        studyRepository.delete(study);
    }

    @Transactional
    public Study createStudy(StudyDto studyDto, Authentication authentication){

//        String id = authentication.getName();

        Study result = Study.builder()
                .title(studyDto.getTitle())
                .content(studyDto.getContent())
                .capacity(studyDto.getCapacity())
                .recruiter(studyDto.getRecruiter())
                .city(studyDto.getCity())
                .district(studyDto.getDistrict())
                .tags(studyDto.getTags())
                .on_off(studyDto.getOn_off())
                .activity_start(studyDto.getActivity_start())
                .activity_deadline(studyDto.getActivity_deadline())
                .recruitment_start(studyDto.getRecruitment_start())
                .recruitment_deadline(studyDto.getRecruitment_deadline())
                .view_count(studyDto.getView_count())
                .status(studyDto.getStatus())
                .build();


        studyRepository.save(result);

        return result;
    }

    public Study updateStudy(long id, StudyDto studyDto, Authentication authentication){

//        String id = authentication.getName();

        Study result = findById(id);

        result.setTitle(studyDto.getTitle());
        result.setContent(studyDto.getContent());
        result.setCapacity(studyDto.getCapacity());
        result.setCity(studyDto.getCity());
        result.setDistrict(studyDto.getDistrict());
        result.setTags(studyDto.getTags());
        result.setOn_off(studyDto.getOn_off());
        result.setActivity_start(studyDto.getActivity_start());
        result.setActivity_deadline(studyDto.getActivity_deadline());
        result.setRecruitment_start(studyDto.getRecruitment_start());
        result.setRecruitment_deadline(studyDto.getRecruitment_deadline());
        result.setStatus(studyDto.getStatus());


        studyRepository.save(result);

        return result;
    }
}
