import React from 'react';
import { connect } from 'react-redux';
import { setSymbol } from '../../reduxStore/actionCreator';
import { search } from '../../reduxStore/actions/thunkActions';
import styled from 'styled-components';
import TextInputWithAction from '../ui/TextInputWithAction';
import ErrorComponent from '../ui/ErrorComponent';
import CompanyDetails from './CompanyDetails';
import ChartDetail from './ChartDetail';
import Loader from '../ui/Loader';

class DefaultContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
  }

  render() {
    const { error, isFetching } = this.props;
    return (
      <Container>
        <Header>M-App</Header>

        <ContentSearch> 
          <TextInputWithAction onSubmit = { this.onSubmit.bind(this) } ></TextInputWithAction>
        </ContentSearch>
        
        <ContentInfo>
          {isFetching ? 
            <Loader/>
            : <CompanyDetails/>
          }
        </ContentInfo>
        
        
        <ContentChart>
          {isFetching ? 
            <Loader/>
            : <ChartDetail/>
          }
        </ContentChart>

        <ContentError>
          <ErrorComponent error = { error }/>
        </ContentError>

        <Footer>Dev KatiaCih</Footer>

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
  error: state.error,
  isFetching: state.isFetching
});

export default connect( mapStateToProps, mapDispatchToProps )( DefaultContainer );


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 5fr 1fr;
  grid-template-rows: 15vh 10vh 55vh 5vh 5vh;
  grid-template-areas: 
    'header   header    header  header'
    '.        search    search   .' 
    '.        info      chart    .' 
    '.        error     error    .' 
    'footer   footer    footer  footer';
  width: 100%;
  grid-gap: 2.5vh;
  height: 100vh;

  @media (max-width: 750px){
    padding: 0 .5em
    grid-template-columns: 1fr;
    grid-template-rows: 10vh 10vh 100vh 100vh 10vh 10vh;
    grid-template-areas: 'header' 'search' 'info''chart' 'error' 'footer';
  }
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
 
const ContentError = styled.div`
  grid-area: error;

`;

const ContentInfo = styled.div`;  
  grid-area: info;
  flex-grow: 1;
`;

const ContentChart = styled.div`
  grid-area: chart;
  flex-grow: 1;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: #f5f5f5;
  padding: 10px;
  text-align: right;
  clear: both;
`;
