import React from 'react';
import styled, { keyframes } from 'styled-components';


class Loader extends React.Component {
  render() {
    return (
      <SvgContainer>
        <svg
          style ={{ height: 50, width: 50 }}
          viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <CircleAnim 
            pathLength="400" 
            fill="none" 
            cx="33" cy="33" r="28">
          </CircleAnim>
        </svg>
      </SvgContainer>
      
    );
  }
}

export default Loader;

const SvgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const continuosAnim = keyframes`
  0% {
    stroke: red;
    stroke-dasharray: 0 400;
    stroke-dashoffset: 0;
  }
  100% {
    stroke: green;
    stroke-dasharray: 400 0;
    stroke-dashoffset: 400;
  }
 
`;


const CircleAnim = styled.circle`
  animation: ${continuosAnim} 0.8s ease-in-out 0s infinite ;
  stroke-width: 8;
  stroke-linecap:butt;
  transform-origin: center center;
`;