import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2vh;
  position: relative;

  p {
    position: absolute;
    bottom: -3vh;
    width: 100%;
    text-align: center;
    font-size: clamp(0.7vh, 0.2rem + 1.2vh, 3vh);
    color: ${({ theme }) => theme.colors.danger.main};
  }
`;

export const ImgButton = styled.button`
  width: 17vh;
  height: 17vh;
  display: flex;
  border: none;
  background-color: transparent;
`;

export const ChosenImg = styled.img`
  border-radius: 200px;
  width: 17vh;
  height: 17vh;
  object-fit: cover;
`;

export const Illustration = styled.div`
  border-radius: 200px;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17vh;
  width: 17vh;
  height: 17vh;

  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="171" height="171" viewBox="0 0 171 171"><g id="Group_104498" data-name="Group 104498" transform="translate(-67 -1461)"><path id="Path_85539" data-name="Path 85539" d="M85.5,0A85.5,85.5,0,1,1,0,85.5,85.5,85.5,0,0,1,85.5,0Z" transform="translate(67 1461)" fill="%23a2a4a6"/><path id="Path_84484" data-name="Path 84484" d="M127.015,117.627A59.279,59.279,0,0,0,94.1,90.651a35.863,35.863,0,1,0-36.689,0,59.238,59.238,0,0,0-32.919,26.977,3.985,3.985,0,1,0,6.9,3.985,50.946,50.946,0,0,1,88.73,0,3.985,3.985,0,1,0,6.9-3.985ZM47.858,59.849A27.893,27.893,0,1,1,75.751,87.742,27.893,27.893,0,0,1,47.858,59.849Z" transform="translate(76.855 1472.525)" fill="%236f6f6f"/></g></svg>');

  &:hover {
    background-image: url('data:image/svg+xml,<svg id="Group_101740" data-name="Group 101740" xmlns="http://www.w3.org/2000/svg" width="171" height="171" viewBox="0 0 171 171"><circle id="Ellipse_48" data-name="Ellipse 48" cx="85.5" cy="85.5" r="85.5" fill="%23f8f9fb"/><path id="Path_84488" data-name="Path 84488" d="M98.4,41.7H87.192l-5.511-8.265A3.235,3.235,0,0,0,78.992,32H53.113a3.235,3.235,0,0,0-2.689,1.439L44.909,41.7H33.7a9.7,9.7,0,0,0-9.7,9.7V96.7a9.7,9.7,0,0,0,9.7,9.7H98.4a9.7,9.7,0,0,0,9.7-9.7V51.409A9.7,9.7,0,0,0,98.4,41.7ZM101.635,96.7A3.235,3.235,0,0,1,98.4,99.931H33.7A3.235,3.235,0,0,1,30.47,96.7V51.409A3.235,3.235,0,0,1,33.7,48.174H46.644a3.235,3.235,0,0,0,2.693-1.439l5.507-8.265H77.257l5.511,8.265a3.235,3.235,0,0,0,2.693,1.439H98.4a3.235,3.235,0,0,1,3.235,3.235ZM66.052,54.644A17.791,17.791,0,1,0,83.844,72.435,17.791,17.791,0,0,0,66.052,54.644Zm0,29.113A11.322,11.322,0,1,1,77.374,72.435,11.322,11.322,0,0,1,66.052,83.757Z" transform="translate(19.734 15.805)" fill="%23ddd"/></svg>');
  }
`;

export const ImgGlass = styled.div`
  z-index: 10;
  width: 17vh;
  height: 17vh;
  position: absolute;
  &:hover {
    border-radius: 200px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="84.01" height="91.011" viewBox="0 0 84.01 91.011"><path id="Path_85551" data-name="Path 85551" d="M112.509,30h-17.5V26.5A10.5,10.5,0,0,0,84.506,16h-21A10.5,10.5,0,0,0,53,26.5V30H35.5a3.5,3.5,0,1,0,0,7H39V100.01a7,7,0,0,0,7,7h56.007a7,7,0,0,0,7-7V37h3.5a3.5,3.5,0,0,0,0-7ZM60,26.5A3.5,3.5,0,0,1,63.5,23h21a3.5,3.5,0,0,1,3.5,3.5V30H60Zm42,73.509H46V37h56.007ZM67,54.5v28a3.5,3.5,0,1,1-7,0v-28a3.5,3.5,0,1,1,7,0Zm21,0v28a3.5,3.5,0,1,1-7,0v-28a3.5,3.5,0,1,1,7,0Z" transform="translate(-32 -16)" fill="%23ddd"/></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10vh;
    width: 17vh;
    height: 17vh;
  }
`;

export const InputFileUpload = styled.input`
  display: none;
`;
