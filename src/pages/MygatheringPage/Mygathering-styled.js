import styled from "styled-components";

export const MygatheringWrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto 0;
  background-color: beige;
  border-radius: 30px;
  padding: 20px;
`;

export const MygatheringItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;

  label {
    font-size: 24px;
    font-weight: bold;
    color: green;
    text-align: center;
    margin: 30px;
  }
  span {
    padding-left: 20px;
  }
`;

export const MygatheringItems = styled.div`
  height: 380px;
  margin: 20px auto;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 30px;

  p {
    margin: 10px 0;
    &:first-of-type {
      font-weight: bold;
      color: green;
      /* font-size: 20px; */
      text-align: left;

      span {
        margin-left: 0px;
        padding-left: 0px;
      }
    }
    span {
      margin-left: 5px;
      font-size: 18px;
    }
  }
  > button {
    width: 100%;
    height: 32px;
    border-radius: 15px;
    background-color: #eee;
    border: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
      transition: all 0.3s;
    }
  }
`;

export const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 45%;
    height: 32px;
    border-radius: 15px;
    background-color: #eee;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
      transition: all 0.3s;
    }
  }
`;
