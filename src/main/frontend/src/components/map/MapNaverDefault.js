import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const MapNaverDefault = ({studyId,Member}) => {

    const accessToken = localStorage.getItem('accessToken');

	const [mapLat, setMapLat] = useState(null); // 위도
	const [mapLng, setMapLng] = useState(null); // 위도
    const [currentLocation, setCurrentLocation] = useState({});
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

    }, []);

    //지도 보여주기
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
                {/*<p>중간 장소 찾기</p>*/}
                {Member.map((member,index)=>(
                    <input value={"장소를 입력하세요"}></input>
                ))}
            </div>
            <div ref={mapElement} style={{ height: '250px', width: '400px' }} id={"naver-map"}/>
        </div>
    );
};

export default MapNaverDefault;