package com.web.stard.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.web.stard.domain.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Getter @Setter
//@AllArgsConstructor
@Service
public class LocationService {

    @Autowired StudyService studyService;
    @Autowired MemberService memberService;

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    public Location getRecommendedPlace(Long studyId, String participantsStr) throws Exception {
        List<Member> participants = new ArrayList<>();
        String[] participantsSplit = participantsStr.split(",");
        List<StudyMember> studyMembers = studyService.findStudyMember(studyId, null);
        List<Location> participantsLocation = new ArrayList<>();

        for (String s : participantsSplit) {
            if (studyMembers.stream()
                    .map(StudyMember::getMember)
                    .anyMatch(member -> member.getId().equals(s))) { // studyMembers에 존재하면
                participants.add(memberService.find(s));
            }
        }

        // 겹치는 주소 가중치 부여
        for (Member m : participants) {
            if (m.getCity() != null && m.getDistrict() != null) { // 입력되어 있는 사용자만 추출
                String address = m.getCity() + " " + m.getDistrict();

                boolean exists = false;
                for (Location location : participantsLocation) {
                    if (address.equals(location.getAddress())) { // 주소가 겹치면 가중치 증가
                        exists = true;
                        location.setWeight(location.getWeight() + 1);
                    }
                }

                if (!exists) { // 겹치지 않으면 새로 추가
                    participantsLocation.add(new Location(address, 1));
                }
            }
        }

        for (Location location : participantsLocation) {
            Location geoLoc = geocoder(location);

            location.setLatitude(geoLoc.getLatitude());
            location.setLongitude(geoLoc.getLongitude());

            if (location.getAddress().equals("서울특별시 강남구")) {
                location.setWeight(location.getWeight() + 1);
            }

            System.out.println(location.toString());
        }

        return Location.calculate(participantsLocation);
    }

    /* address를 위도, 경도로 변환 */
    public Location geocoder(Location loc) {
        Location location = new Location();

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("X-NCP-APIGW-API-KEY-ID", clientId);
            headers.add("X-NCP-APIGW-API-KEY", clientSecret);

            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode")
                    .queryParam("query", loc.getAddress());

            RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(builder.toUriString()));

            ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) { // 200
                String jsonResponse = response.getBody();

                System.out.println(jsonResponse);

                // JSON 파싱을 위해 Jackson ObjectMapper를 사용합니다.
                ObjectMapper objectMapper = new ObjectMapper();

                JsonNode rootNode = objectMapper.readTree(jsonResponse);
                JsonNode addressesNode = rootNode.path("addresses");

                if (addressesNode.isArray() && addressesNode.size() > 0) {
                    JsonNode addressNode = addressesNode.get(0);

                    location.setLatitude(Double.parseDouble(addressNode.get("x").asText()));
                    location.setLongitude(Double.parseDouble(addressNode.get("y").asText()));
                } else {
                    System.out.println("정보 찾을 수 없음");
                }
            }

        } catch (Exception e) {
            System.out.println(e);
        }

        return location;
    }
}
