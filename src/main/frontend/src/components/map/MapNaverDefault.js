import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const MapNaverDefault = ({studyId}) => {

    const accessToken = localStorage.getItem('accessToken');

	const [mapLat, setMapLat] = useState(null); // 위도
	const [mapLng, setMapLng] = useState(null); // 위도
    const [currentLocation, setCurrentLocation] = useState({});
    const mapElement = useRef(null);
    const { naver } = window;
    // function getLocation() {
    //     if (navigator.geolocation) { // GPS를 지원하면
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             console.log("현재 위치",position.coords); // lat lng을 통해 좌표값을 얻어옵니다.
    //             setCurrentLocation(position.coords)
    //         }, function (error) {
    //             console.error(error);
    //         }, {
    //             enableHighAccuracy: false,
    //             maximumAge: 0,
    //             timeout: Infinity
    //         });
    //     } else {
    //         alert('NoGPS');
    //     }
    // }

    // useEffect(() => {
    //     getLocation()
    // }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/location/${studyId}/all`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("Location : ", res.data);

                setMapLat(res.data.latitude);
                setMapLng(res.data.longitude);
            })
            .catch((error) => {
                console.error("위도, 경도 불러오기 실패", error);
            });

    }, []);

    // useEffect(() => {
    //     // console.log("dd:", currentLocation.latitude);
    //     // console.log("ss: ", currentLocation.longitude);
    //     // const latitude = currentLocation.latitude;
    //     // const longitude = currentLocation.longitude;
    //     const { naver } = window;
    //     if (!mapElement.current || !naver) return;
    //
    //     //로케이션표시 Google maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있다.
    //     const location = new naver.maps.LatLng(mapLng, mapLat);
    //
    //     //네이버 지도 옵션 선택
    //     const mapOptions = {
    //         center: location,
    //         zoom: 16,
    //         zoomControl: true,
    //         zoomControlOptions: {
    //             position: naver.maps.Position.TOP_RIGHT,
    //         },
    //     };
    //     const map = new naver.maps.Map(mapElement.current, mapOptions);
    //
    //     //지도상에 핀 표시 할 부분
    //     new naver.maps.Marker({
    //         position: location,
    //         map: map,
    //     });
    // }, [currentLocation]);


    useEffect(() => {
        if (!mapElement.current || !naver) return;

        if (naver.maps) {
            const location = new naver.maps.LatLng(mapLng, mapLat);
            const mapOptions = {
                center: location,
                zoom: 16,
                zoomControl: true,
            };

            const map = new naver.maps.Map(mapElement.current, mapOptions);
                new naver.maps.Marker({
                    position: location,
                    map,
                });
        }
    }, [mapLat, mapLng, naver]);

    return (
        <div className={"map_content"}>
            <div id={"input-location"}>
                <input value={"장소를 입력하세요"}></input>
            </div>
            <div ref={mapElement} style={{ height: '400px', width: '400px' }} />
        </div>
    );
};

export default MapNaverDefault;