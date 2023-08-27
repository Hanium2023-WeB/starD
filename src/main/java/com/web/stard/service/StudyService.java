package com.web.stard.service;


import com.web.stard.domain.Study;
import com.web.stard.dto.StudyDto;
import com.web.stard.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
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
                .onOff(studyDto.getOn_off())
                .activityStart(studyDto.getActivity_start())
                .activityDeadline(studyDto.getActivity_deadline())
                .recruitmentStart(studyDto.getRecruitment_start())
                .recruitmentDeadline(studyDto.getRecruitment_deadline())
                .viewCount(studyDto.getView_count())
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
        result.setOnOff(studyDto.getOn_off());
        result.setActivityStart(studyDto.getActivity_start());
        result.setActivityDeadline(studyDto.getActivity_deadline());
        result.setRecruitmentStart(studyDto.getRecruitment_start());
        result.setRecruitmentDeadline(studyDto.getRecruitment_deadline());
        result.setStatus(studyDto.getStatus());


        studyRepository.save(result);

        return result;
    }
}
