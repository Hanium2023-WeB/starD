import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const MapNaverDefault = ({studyId}) => {

    const accessToken = localStorage.getItem('accessToken');

	const [mapLat, setMapLat] = useState(null); // 위도
	const [mapLng, setMapLng] = useState(null); // 위도

    const mapElement = useRef(null);
    const { naver } = window;

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

    }, [studyId]);

    useEffect(() => {
        if (!mapElement.current || !naver) return;

        if (naver.maps) {
            const location = new naver.maps.LatLng(mapLat, mapLng);
            const mapOptions = {
                center: location,
                zoom: 10,
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
        <>
            <div ref={mapElement} style={{ height: '400px', width: '400px' }} />
        </>
    );
};

export default MapNaverDefault;