import React, { useEffect, useState } from "react";
import {
  GatheringWrapper,
  InputWrapper,
  GatheringForm,
  ButtonWrapper,
} from "./gathering-styled";
import * as API from "../../commons/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserState } from "../../context/UserContext";

function Gathering() {
  const { isLoggedIn } = useUserState();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [rentalshop, setRentalShop] = useState("");
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gatheringData = {
      title,
      start_time: date,
      rent_name: rentalshop,
      duration: time,
      total_members: count,
      desc: content,
    };

    const res = await API.post("/gathering", gatheringData);

    console.log("모임 등록", res);
  };

  useEffect(() => {
    if (location?.state) {
      const { name } = location?.state;
      setRentalShop(name);
      console.log("name", name);
    } else {
      alert("대여소를 선택 후 모임을 만들 수 있습니다.");
      navigate("/");
    }
  }, []);

  return (
    <>
      <GatheringWrapper>
        <GatheringForm onSubmit={handleSubmit}>
          <InputWrapper>
            <label>제목</label>
            <br />
            <input
              type="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <label>날짜</label>
            <br />
            <input
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </InputWrapper>
          <InputWrapper>
            <label>대여소</label>
            <br />
            <input
              type="rentalshop"
              required
              value={rentalshop}
              onChange={(e) => setRentalShop(e.target.value)}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <label>소요시간(분)</label>
            <br />
            <input
              type="number"
              required
              value={time}
              step="5"
              onChange={(e) => setTime(e.target.value)}
              placeholder="소요시간을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <label>인원</label>
            <br />
            <input
              type="number"
              required
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="인원을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <label>내용</label>
            <br />
            <textarea
              required
              maxLength="20"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              style={{ height: "110px", width: "320px" }}
            />
          </InputWrapper>
          <br />
          <ButtonWrapper>
            <button>등록</button>
          </ButtonWrapper>
        </GatheringForm>
      </GatheringWrapper>
    </>
  );
}

export default Gathering;
