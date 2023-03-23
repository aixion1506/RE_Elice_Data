import { useEffect, useState, useMemo } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import {
  MapWrapper,
  LocationInfoWrapper,
  LocationDataWrapper,
  GotoGatheringButton,
  MapContainer,
  AlertZoomInfo,
  AlertMarkerInfo,
} from "./map-styled";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSquareParking,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";

const Map = ({ bikeData }) => {
  const [locationData, setLocationData] = useState(null);

  /** 지도 경도 위도값 */
  const [maxLongitude, setMaxLongitude] = useState(0);
  const [minLongitude, setMinLongitude] = useState(0);
  const [maxLatitude, setMaxLatitude] = useState(0);
  const [minLatitude, setMinLatitude] = useState(0);

  /** zoom 값 */
  const [zoom, setZoom] = useState(15);

  // instead of window.naver.maps
  const navermaps = useNavermaps();

  /** 지도 state */
  const [map, setMap] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("data", locationData);
  // }, [locationData]);

  // useEffect(() => {
  //   console.log("bike data", bikeData);
  // }, [bikeData]);

  useEffect(() => {
    if (!map) return;
    const bounds = map.bounds;

    setMaxLongitude(bounds._max._lng);
    setMinLongitude(bounds._min._lng);
    setMaxLatitude(bounds._max._lat);
    setMinLatitude(bounds._min._lat);
  }, [map]);

  /** 지도의 위도 경도 값으로 데이터 필터링 */
  const filteredBikeData = useMemo(() => {
    return bikeData.filter((b) => {
      const lat = parseFloat(b.stationLatitude);
      const long = parseFloat(b.stationLongitude);

      return (
        lat < maxLatitude &&
        lat > minLatitude &&
        long < maxLongitude &&
        long > minLongitude
      );
    });
  }, [bikeData, maxLongitude, minLongitude, maxLatitude, minLatitude]);

  /** 줌 바꼈을 때 실행되는 함수 */
  const zoomListener = () => {
    console.log("changed", map.zoom);
    setZoom(map?.zoom);
  };

  /** 모임 생성 페이지로  */

  const goToGathering = () => {
    const stationInfo = locationData?.stationName?.split(".");
    navigate("/gathering", {
      state: {
        id: stationInfo[0].trim(),
        name: stationInfo[1].trim(),
      },
    });
    console.log("대여소 정보", stationInfo);
  };

  return (
    <MapWrapper>
      <MapContainer>
        {zoom <= 13 && (
          <AlertZoomInfo>대여소 위치 정보를 확인하려면 지도 확대</AlertZoomInfo>
        )}
        <MapDiv
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <NaverMap
            ref={setMap}
            defaultCenter={
              new navermaps.LatLng(
                bikeData[0]?.stationLatitude || 37.5556488,
                bikeData[0]?.stationLongitude || 126.91062927
              )
            }
            onZoomChanged={zoomListener}
            defaultZoom={15}
            onBoundsChanged={(bounds) => {
              setMaxLongitude(bounds._max._lng);
              setMinLongitude(bounds._min._lng);
              setMaxLatitude(bounds._max._lat);
              setMinLatitude(bounds._min._lat);
            }}
          >
            <>
              {zoom > 13 &&
                filteredBikeData &&
                filteredBikeData?.map((item) => {
                  return (
                    <Marker
                      onClick={() => setLocationData(item)}
                      key={item.stationId}
                      position={
                        new navermaps.LatLng(
                          item.stationLatitude,
                          item.stationLongitude
                        )
                      }
                    />
                  );
                })}
            </>
          </NaverMap>
        </MapDiv>
      </MapContainer>
      <LocationInfoWrapper>
        {locationData ? (
          <LocationDataWrapper>
            <div>
              <p>대여소 이름</p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{locationData?.stationName?.split(".")[1].trim()}</span>
              </p>
            </div>
            <div>
              <p>거치대개수</p>
              <p>
                <FontAwesomeIcon icon={faSquareParking} />
                <span>{locationData?.rackTotCnt}개</span>
              </p>
            </div>
            <div>
              <p>자전거주차총건수</p>
              <p>
                <FontAwesomeIcon icon={faBicycle} />
                <span>{locationData?.parkingBikeTotCnt}개</span>
              </p>
            </div>

            <GotoGatheringButton>
              <span onClick={goToGathering}>모임 만들기</span>
            </GotoGatheringButton>
          </LocationDataWrapper>
        ) : (
          <AlertMarkerInfo>
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
            </p>
            <p>마커를 클릭해서</p>
            <p>대여소 정보를 확인해보세요!</p>
          </AlertMarkerInfo>
        )}
      </LocationInfoWrapper>
    </MapWrapper>
  );
};

export default Map;
