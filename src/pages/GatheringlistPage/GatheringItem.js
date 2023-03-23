import { useEffect, useState } from "react";
import {
  GatheringItemWrapper,
  ApplyButtonWrapper,
  EditButtonWrapper,
  GatheringDetail,
} from "./gatheringlist-styled";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faPersonBiking,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";

import { timeFormat } from "../../commons/utils";

const GatheringItem = (gatheringItem) => {
  const [isApplied, setIsApplied] = useState(faTruckMedical);
  // useEffect(() => {
  //   const test = timeFormat(gatheringItem.start_time);
  //   console.log("test", test);
  // }, [gatheringItem]);

  return (
    <GatheringItemWrapper>
      <GatheringDetail>
        <p>{gatheringItem.title}</p>
        <p>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{gatheringItem.rental_name}</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>{timeFormat(gatheringItem.start_time)}</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} />
          <span>{gatheringItem.duration}분</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faPersonBiking} />
          <span>{gatheringItem.total_members}명</span>
        </p>
        <div>{gatheringItem.gather_desc}</div>
      </GatheringDetail>

      {isApplied ? (
        <ApplyButtonWrapper>
          <button>참가 신청</button>
        </ApplyButtonWrapper>
      ) : (
        <EditButtonWrapper>
          <button>수정</button>
          <button>삭제</button>
        </EditButtonWrapper>
      )}
    </GatheringItemWrapper>
  );
};

export default GatheringItem;
