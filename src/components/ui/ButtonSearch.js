import React from 'react';
import styled , { css } from 'styled-components';

const Container = styled.div`
  align-items: center;
  align-content: center;
  text-align: center;
`
const Button = styled.button
 `  background: red;
    border-radius: 8px;
    color: pink;

    ${props => props.primary && css`
      height: 50px;
      background: palevioletred;
      color:white
      :hover{
        color: blue;
      }
    `}
`;


class ButtonSearch extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.isActive = false;
  }
  render() {
    return (
      <Container>
        <Button>Normal</Button>
        <Button primary
          onClick ={() => this.onSubmit() } >
      
        </Button>
      </Container>  
    );
  }

  onSubmit(){
    this.setState({ isActive: !this.isActive})
  }
}


export default ButtonSearch;