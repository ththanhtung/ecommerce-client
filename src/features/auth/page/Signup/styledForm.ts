import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: 70px;
  border: 1px solid red;
  grid-gap: 1em;
  place-items: center;
  /* @media screen and (max-width:500px) {
    grid-template-columns: 100%;
  } */
  .input-field {
    width: 100%;
    height: 100%;
    label{
        display: block;
    }
  }
`;
