import React from 'react';
import { connect } from 'react-redux';
import { setSymbol } from '../../reduxStore/actionCreator';
import { search } from '../../reduxStore/actions/thunkActions';
import styled from 'styled-components';
import TextInputWithAction from '../ui/TextInputWithAction';
import ErrorComponent from '../ui/ErrorComponent';

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

        <ContentSearch> 
          <TextInputWithAction onSubmit = { this.onSubmit.bind(this) } ></TextInputWithAction>
        </ContentSearch>


        <Contents> 
          <ContentInfo>Info</ContentInfo>
          <ContentChart>Chart</ContentChart>
        </Contents>

        <ContentError>
          <ErrorComponent error = {this.props.error }/>
        </ContentError>

        <Footer>Dev Katia Cibele</Footer>

      </Container>
        
    );
  }

  onSubmit( newValue ){
    this.props.fazerBusca( newValue );
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  fazerBusca: ( text ) => {
    dispatch( setSymbol(text) );
    dispatch( search());
  }
});

const mapStateToProps = ( state ) => ({
  error: state.error
});

export default connect( mapStateToProps, mapDispatchToProps )( DefaultContainer );


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 15vh 10vh 55vh 5vh 5vh;
  grid-template-areas: 
    'header   header    header  header'
    '.        search    search   .' 
    '.        contents  contents    .' 
    '.        error     error    .' 
    'footer   footer    footer  footer';
  width: 100%;
  grid-gap: 2.5vh;
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 35px;
`;

const ContentSearch = styled.div`
  grid-area: search;
  height: 60px;
  text-align: center;
  align-items: center;
  justify-content: center;
  `;
 
  
const Contents = styled.div`
  display: flex;
  grid-area: contents
  -webkit-column-count: 2; 
  -moz-column-count: 2; 
  column-count: 2;
  justify-content: space-around;
  background-color: white;
`;
const ContentError = styled.div`
  grid-area: error;

`;

const ContentInfo = styled.div`;  
  background-color: #424242;
  flex-grow: 1;
  border-style: solid;
`;

const ContentChart = styled.div`
  flex-grow: 1;
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
