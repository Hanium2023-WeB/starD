import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const MapNaverDefault = ({studyId}) => {

    const accessToken = localStorage.getItem('accessToken');

    const [mapLat, setMapLat] = useState(null); // 위도
    const [mapLng, setMapLng] = useState(null); // 위도

    const mapElement = useRef(null);
    // const { naver } = window;

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

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;

        //로케이션표시 Google maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있다.
        const location = new naver.maps.LatLng(37.5663, 126.9779);

        //네이버 지도 옵션 선택
        const mapOptions = {
            center: location,
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);

        //지도상에 핀 표시 할 부분
        new naver.maps.Marker({
            position: location,
            map: map,
        });
    }, []);


    // useEffect(() => {
    //     if (!mapElement.current || !naver) return;
    //
    //     if (naver.maps) {
    //         const location = new naver.maps.LatLng(mapLat, mapLng);
    //         const mapOptions = {
    //             center: location,
    //             zoom: 10,
    //             zoomControl: true,
    //         };
    //
    //         const map = new naver.maps.Map(mapElement.current, mapOptions);
    //             new naver.maps.Marker({
    //                 position: location,
    //                 map,
    //             });
    //     }
    // }, [mapLat, mapLng, naver]);

    return (
        <>
            <div ref={mapElement} style={{ height: '400px', width: '400px' }} />
        </>
    );
};

export default MapNaverDefault;