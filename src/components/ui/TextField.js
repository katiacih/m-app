import React from 'react';
import styled, { keyframes } from 'styled-components';

const INPUT_BG = 'linear-gradient(21deg, #10abff, #1beabd)';
const MAX_HEIGHT = '40px';

const emphase = keyframes`
  from{
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const FadeInButton = styled.button`
  animation: 1s ${fadeIn} ease-out;
`

const SearchButton =  styled.button`
  
  background: #10abff;
  border-radius: 8px;
  color: white;

  ::before {
    content: '🚀';
  }

  &:hover {
    color: red;
    animation: 1s ${emphase} ease-out;
  }
`;

const Container = styled.div`
  height: ${MAX_HEIGHT};
  class: w3-col m2;
  background: ${INPUT_BG};
  position:relative;
  display: inline-block;
  font-size: 1em;
  padding: 3px;
  color: black;


  &:focus {
    color: red;
    animation: ${rotate} 2s linear infinite;
    animation: 1s ${emphase} ease-out;
  }
  
  
`;

const Input = styled.input`
  
  font-family: inherit;
  line-height:inherit;
  color:#2e3750;
  min-width:20em;
 
`;


class TextField extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
  }
  render() {
    return (
      <Container>
         <Input 
          placeholder= "Example: FB, AAPL ..."
          value={this.state.inputText}
          onChange = { ( ev ) => this.setState(
            { inputText: ev.target.value.toUpperCase() }) }>
        </Input> 
        <SearchButton>search</SearchButton>
      
      </Container>
        
      
    );
  }
}

export default TextField;