import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaHandHoldingUsd } from 'react-icons/fa'; 

class CompanyDetails extends React.Component {
  render() {
    const { latestPrice, symbol, ceo, industry, description, website, exchange, company} = this.props;
    return (
      <Container>

        <PriceContent>
          
          <Icon>
            <FaHandHoldingUsd size={32} color='#616161' style ={{ }}/>
          </Icon>
          <LatestPriceContent>
            <LatestPriceTitle>Latest Price</LatestPriceTitle>
            <LatestPriceValue>{`US$ ${latestPrice || ''}` }</LatestPriceValue>
          </LatestPriceContent> 
        </PriceContent>

        <CompanyInfoContent>
          <InfoCompany>
            <span>Symbol:</span>{symbol}</InfoCompany>
          <InfoCompany><span>Company:</span>{company}</InfoCompany>
          <InfoCompany><span>CEO:</span>{ceo}</InfoCompany>
          <InfoCompany><span>Industry:</span>{industry}</InfoCompany>
          <InfoCompany><span>Description:</span>{description}</InfoCompany>
          <InfoCompany><span>Website:</span>{website}</InfoCompany>
          <InfoCompany><span>Exchange:</span>{exchange}</InfoCompany>
        </CompanyInfoContent>


      </Container>
      
    );
  }
}
const mapStateToProps = ( state ) => {
  return state.current.company
    ? ({
      latestPrice: state.current.latestPrice,
      symbol: state.current.company.symbol,
      company: state.current.company.companyName,
      ceo: state.current.company.CEO,
      industry: state.current.company.industry,
      description: state.current.company.description,
      website: state.current.company.website,
      exchange: state.current.company.exchange,
    })
    : {};
};

export default connect( mapStateToProps, null )( CompanyDetails );

const Container = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  background: #f5f5f5;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  position: inherit;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px #000000;
`;

const PriceContent = styled.div`
  padding: 8px;
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

`;

const LatestPriceContent = styled.div`
  height: 100%;
  align-items: center;
  flex-grow: 3;
  text-align: start;
`;
const LatestPriceTitle = styled.h6`
  color: #616161;
  margin-bottom: 10px;
`;

const LatestPriceValue = styled.h1`
  margin-top: 0;
`;

const CompanyInfoContent = styled.div`
  padding: 8px;
  width: 100%;
  height: 75%;
  display: flex;
  background: #bdbdbd;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  & span {
    color: red;
    margin-right: 8px;
  }

`;
const InfoCompany = styled.h5`
  margin: 0px;
  padding: 4px;
`;


// {
//   "symbol": "AAPL",
//   "companyName": "Apple Inc.",
//   "exchange": "Nasdaq Global Select",
//   "industry": "Computer Hardware",
//   "website": "http://www.apple.com",
//   "description": "Apple Inc is an American multinational technology company. It designs, manufactures, and markets mobile communication and media devices, personal computers, and portable digital music players.",
//   "CEO": "Timothy D. Cook",
