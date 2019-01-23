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
  @media (max-width: 750px){
    padding: 8px;
  }

  `;

const InputField = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;
  background: ${LINEAR_GRADIENT};
  width: 80%;
  height: 100%;
  border: none;
  border-radius: 9999em;
  padding: 2px 2px 2px 8px;
  @media (max-width: 750px){
    width: 100%;
  }
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
  outline: none;
  @media (max-width: 500px){
    width: 84%;
  }

`;

const SearchButton = styled.button`
  background-color: transparent;
  box-shadow: inset 0 0 0 1px #fff;
  border-top-right-radius: 9999em;
  border-bottom-right-radius: 9999em;
  min-width: 9%;
  position: relative;
  height: 80%;
  border: none;
  color: white;
  outline: none;

  @media (max-width: 500px){
    min-width: 14.5%;
  }
`;
