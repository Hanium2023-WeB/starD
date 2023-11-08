import edit from "../css/mypage_css/edit.css";
import $ from 'jquery';
import { useEffect } from "react";

export function RegionSelectBOX({formData, city , district, handleRegionCityChange,handleRegionDistrictChange }) {
    const areas = {
        "시/도 선택": ["구/군 선택"],
        "서울특별시": ["강남구", "강동구", "강북구", "강서구","관악구","광진구","구로구","금천구","노원구"
            ,"도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구(서울특별시)","중랑구"],
        "인천광역시": ["계양구", "미추홀구", "남동구", "동구","미추홀구","부평구","서구(인천광역시)","연수구","중구(인천광역시)"],
        "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
        "광주광역시": ["광산구", "남구(광주광역시)", "동구(광주광역시)", "북구(광주광역시)", "서구(광주광역시)"],
        "대구광역시": ["남구", "달서구", "동구(대구광역시)", "북구", "서구(대구광역시)", "수성구", "중구(대구광역시)", "달성군"],
        "울산광역시": ["남구(울산광역시)", "동구(울산광역시)", "북구(울산광역시)", "중구(울산광역시)", "울주군"],
        "부산광역시": ["강서구(부산광역시)", "금정구", "남구(부산광역시)", "동구(부산광역시)", "동래구", "부산진구", "북구(부산광역시)", "사상구", "사하구", "서구(부산광역시)", "수영구", "연제구", "영도구", "중구(부산광역시)", "해운대구", "기장군"],
        "경기도": ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "여주군", "연천군"],
        "강원도": ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"],
        "충청북도": ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군", "청원군"],
        "충청남도": ["계룡시", "공주시", "논산시", "보령시", "서산시", "아산시", "천안시", "금산군", "당진군", "부여군", "서천군", "연기군", "예산군", "청양군", "태안군", "홍성군"],
        "전라북도": ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"],
        "전라남도": ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
        "경상북도": ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"],
        "경상남도": ["거제시", "김해시", "마산시", "밀양시", "사천시", "양산시", "진주시", "진해시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"],
        "제주특별자치도": ["서귀포시", "제주시"],

    };
    const $RegionsidoSelect = $("#sido1");
    const $RegiongugunSelect = $("#gugun1");

    function initializeSidoSelect() {
        $RegionsidoSelect.empty();

        // Add the "시/도 선택" option
        $RegiongugunSelect.append('<option value="구/군 선택">구/군 선택</option>');

        // Add options for each "시/도"
        for (const sido in areas) {
            $RegionsidoSelect.append(`<option value="${sido}">${sido}</option>`);
        }

        // Check if a "시/도" is already selected in local storage
        const selectedRegionsido = localStorage.getItem("selectedRegionsido");
        if (selectedRegionsido) {
            $RegionsidoSelect.val(selectedRegionsido);
        }
    }

    function updateGugunSelect(selectedSido) {
        $RegiongugunSelect.empty();

        // Get the list of "구/군" for the selected "시/도"
        const gugunList = areas[selectedSido] || ["구/군 선택"];

        // Populate "구/군" options
        for (const gugun of gugunList) {
            $RegiongugunSelect.append(`<option value="${gugun}">${gugun}</option>`);
        }
    }

    $RegionsidoSelect.on("change", function() {
        const selectedSido = $(this).val();

        if (selectedSido) {
            updateGugunSelect(selectedSido);
            saveSelectedSidoVal(selectedSido);
        } else {
            $RegiongugunSelect.empty();
        }
    });
    $RegiongugunSelect.on("change", function() {
        const selectedGugun = $RegiongugunSelect.val();
        if (selectedGugun) {
            saveSelectedGugunVal(selectedGugun);

        } else {
            $RegiongugunSelect.empty();
        }
    });

    // Load "시/도" options and initialize the selection
    initializeSidoSelect();

    // Function to save selected "시/도" value
    function saveSelectedSidoVal(selectedSido) {
        localStorage.setItem("selectedRegionsido", selectedSido);
        city = selectedSido;
        handleRegionCityChange(city);
    }
    function  saveSelectedGugunVal(selectedGugun){
        localStorage.setItem("selectedRegionGugun", selectedGugun);
        district = selectedGugun;
        handleRegionDistrictChange(district);
    }

}
