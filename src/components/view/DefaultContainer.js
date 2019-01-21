import React from 'react';
import { connect } from 'react-redux';
import { setSymbol } from '../../reduxStore/actionCreator';
import { search } from '../../reduxStore/actions/thunkActions';
import styled from 'styled-components';
import TextField from '../ui/TextField';

const Container = styled.div`
  display: grid;
  grid-template-areas: 'header'
   'body' 
   'footer';
  width: 100%;
  height: 600px;
  background-image: url('../../assets/images/backgroundImageFourPeople.jpg');
  background-repeat: no-repeat;
  // -webkit-filter: blur(5px) grayscale();
  // filter: blur(5px) grayscale(70%);
  align-items: center;
  align-container: center;
  background-size: cover;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #f5f5f5;
  padding: 30px;
  align-items: center
  text-align: center;
  font-size: 35px;
`;

const Body = styled.body`
  padding: 30px;
  grid-area: body;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: center;
  background-color: black;
  align-content: center;
  justify-content: center
`;

const ContentSearch = styled.div`
  grid-area: search;
  height: 60px;
  width: 800px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #707070;
`;

const Contents = styled.div`
  height: 300px;
  width: 800px;
  display: grid;
  grid-template-areas: 'info chart';
  justify-content: space-around;
  background-color: white;
`;
const ContentError = styled.div`
  grid-area: error;
  height: 40px;
  width: 800px;
  -webkit-column-count: 2; 
  -moz-column-count: 2; 
  column-count: 2;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: black;
`;

const ContentInfo = styled.div`
  padding: 30px;
  width: 200px;
  grid-area: info;  
  background-color: #424242;
  border-style: solid;
`;

const ContentChart = styled.div`
  padding: 30px;
  width: 200px;
  grid-area: chart;
  background-color: #424242;
  border-style: dashed;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: #f5f5f5;
  padding: 10px;
  text-align: right;
  clear: both;
`;


class DefaultContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
  }

  render() {
    return (
      <Container>
        <Header>I'm a Header </Header>
        <Body>

          <ContentSearch> 
            <TextField></TextField>
          </ContentSearch>

          <ContentError>Area Error</ContentError>

          <Contents> 
            <ContentInfo>Info</ContentInfo>
            <ContentChart>Chart</ContentChart>
          </Contents>
          
        </Body>
        <Footer>Hey aqui que acaba!!</Footer>
      </Container>
        
    );
  }

  onSubmit(){
    this.props.fazerBusca( this.state.inputText );
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  fazerBusca: ( text ) => {
    dispatch( setSymbol(text) );
    dispatch( search());
  }
});

export default connect( null, mapDispatchToProps )( DefaultContainer );