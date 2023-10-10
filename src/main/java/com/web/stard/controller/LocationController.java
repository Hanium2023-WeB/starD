package com.web.stard.controller;

import com.web.stard.domain.Location;
import com.web.stard.service.LocationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

@Getter @Setter
@AllArgsConstructor
@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/{id}")
    public Location getRecommendedPlace(@PathVariable Long studyId, @RequestParam String participantsStr) throws Exception {
        // 해당 스터디(studyId)에서 모임에 참여하는 참여자들(participantsStr)로 중간 지점 구하기
        return locationService.getRecommendedPlace(studyId, participantsStr);
    }
}
