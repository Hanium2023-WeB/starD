package com.web.stard.controller;

import com.web.stard.domain.Scrap;
import com.web.stard.domain.Star;
import com.web.stard.service.StarScrapService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RestController
public class StarScrapController {

    private final StarScrapService starScrapService;



    /* Post(community) 공감 추가 */
    @PostMapping("/star/post/{id}")
    public Star addPostStar(@PathVariable Long id, Authentication authentication) {
        return starScrapService.addPostStar(id, authentication);
    }

    /* Post(Community) 공감 삭제 */
    @DeleteMapping("/star/post/{id}")
    public boolean deletePostStar(@PathVariable Long id, Authentication authentication) {
        return starScrapService.deletePostStar(id, authentication);
    }



    /* Study 공감 추가 */
    @PostMapping("/star/study/{id}")
    public Star addStudyStar(@PathVariable Long id, Authentication authentication) {
        return starScrapService.addStudyStar(id, authentication);
    }

    /* Study 공감 삭제 */
    @DeleteMapping("/star/study/{id}")
    public boolean deleteStudyStar(@PathVariable Long id, Authentication authentication) {
        return starScrapService.deleteStudyStar(id, authentication);
    }





    /* Post(community) 스크랩 추가 */
    @PostMapping("/scrap/post/{id}")
    public Scrap addPostScrap(@PathVariable Long id, Authentication authentication) {
        return starScrapService.addPostScrap(id, authentication);
    }

    /* Post(Community) 스크랩 삭제 */
    @DeleteMapping("/scrap/post/{id}")
    public boolean deletePostScrap(@PathVariable Long id, Authentication authentication) {
        return starScrapService.deletePostScrap(id, authentication);
    }



    /* Study 스크랩 추가 */
    @PostMapping("/scrap/study/{id}")
    public Scrap addStudyScrap(@PathVariable Long id, Authentication authentication) {
        return starScrapService.addStudyScrap(id, authentication);
    }

    /* Study 스크랩 삭제 */
    @DeleteMapping("/scrap/study/{id}")
    public boolean deleteStudyScrap(@PathVariable Long id, Authentication authentication) {
        return starScrapService.deleteStudyScrap(id, authentication);
    }



}
