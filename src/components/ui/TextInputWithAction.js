import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; 

const LINEAR_GRADIENT = 'linear-gradient(21deg, #10abff, #1beabd)';

class TextInputWithAction extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputText: '',
      isFocused: false
    };
  }
  render() {
    return (
      <Container  
        isFocused={ this.state.isFocused } >
        <InputField>
          <Input
            id="search-input"
            onFocus = { () => this.setState({ isFocused: true }) }
            onBlur = { () => this.setState({ isFocused: false }) }
            placeholder= "Example: FB, AAPL ..."
            value={this.state.inputText}
            onChange = { ( ev ) => this.setState(
              { inputText: ev.target.value.toUpperCase() }) }>

          </Input> 
          <Span></Span>
          <SearchButton
            onClick = { () => this.props.onSubmit(this.state.inputText) }
          ><FaSearch size={22} color='black'/></SearchButton> 
        </InputField>
      </Container>    
     
    );
  }
}

export default TextInputWithAction;

const Container = styled.div` 
  display:flex;
  width: 100%;
  height: 100%;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding-left: 12.5%;
  `;

const InputField = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;
  background: ${LINEAR_GRADIENT};
  width: 80%;
  height: 100%;
  border-radius: 9999em;
  padding: 2px 2px 2px 8px;
`;

const Input = styled.input`
  width: 90%;
  height: 80%;
  flex-shrink: 0;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  z-index: 2;
  padding: 8px;
  border: none;
  box-sizing: border-box;

  &:focus + span {
    opacity: 1;
    transform: scale(1);
  }
`;

const Span = styled.span`
  background-image: ${LINEAR_GRADIENT};
  flex-shrink: 0;
  width: 90%;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  height: 80%;
  transform: scale(.8, .8);
  position: relative;
  left: -90%;
  z-index: 1;
  box-sizing: border-box;
  opacity: 0;
  transition: transform 0.25s, opacity 0.5s;
  box-shadow: inset 0 0 0 3px #fff,
    0 0 0 2px #fff,
    3px -3px 30px #1beabd, 
    -3px 3px 30px #10abff;
`;

const SearchButton = styled.button`
  background-color: transparent;
  box-shadow: inset 0 0 0 1px #fff;
  border-top-right-radius: 9999em;
  border-bottom-right-radius: 9999em;
  position: relative;
  height: 80%;
  border: none;
  left: -90%;
  color: white;
  &:hover {
    background: red;
  }
`;
