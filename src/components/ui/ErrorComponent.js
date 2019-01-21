import React from 'react';
import styled, { keyframes }from 'styled-components';
import { FaTimes } from 'react-icons/fa'; 

class ErrorComponent extends React.Component {
  render() {
    return (

      this.props.error ==='' ? null 
        : (<Container>

          <IconContainer>
            <FaTimes size={22} color='red' />
          </IconContainer>

          <ErrorContainer> {`Message:  ${this.props.error}` }
          </ErrorContainer>

        </Container>)
      
    );
  }
}

export default ErrorComponent;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  background-color: #ff000055; 
  color: red;
  animation: ${FadeIn} 0.3s ease-in-out 0s 1 forwards ; 
  padding: 8px;  
`;

const IconContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ErrorContainer = styled.p`
  font-size: 16px;
  padding: 0 8px; 
  text-align: center;
`;
