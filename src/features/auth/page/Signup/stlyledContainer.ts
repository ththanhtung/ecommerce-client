import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(124, 116, 244, 1) 21%,
    rgba(154, 49, 195, 0.8018557764902836) 65%,
    rgba(0, 212, 255, 1) 100%
  );
  & .form-container {
    /* border: 1px solid red; */
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    margin: 0 auto;
  }
`;
