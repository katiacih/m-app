import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  ResponsiveContainer,
  Tooltip } from 'recharts';
import { fetchChartByRange } from '../../reduxStore/actions/thunkActions';

class ChartDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      optionChart : '1m'
    };
    this.intervalId = null;
    this.chartRef = null;
  }

  componentWillUnmount(){
    if( this.intervalId ) clearInterval( this.intervalId );
  }


  componentDidUpdate( prevProps, prevState ){
    const { optionChart } = this.state;

    if( prevState.optionChart !== optionChart ){
      if( this.intervalId ) clearInterval( this.intervalId );

      switch ( optionChart ) {
      case '1d':
        this.props.refreshChart('1d');
        this.intervalId = setInterval(() => {
          this.props.refreshChart('1d');
        }, 60000);
        break;
      default:
        this.props.refreshChart( this.state.optionChart );
      }
    }
  }

  render() {
    const { dataSet } = this.props;

    return (
      <Container>
        <Header>Stock value over time</Header>
        { dataSet
          ? (<ContentChart>
            <ResponsiveContainer width='100%' height='50%'>
              <LineChart 
                margin={{ top: 5, right: 60, bottom: 5, left: 0 }}
                data={ dataSet }>
                <Line type='linear' dot={false} dataKey='price' stroke='#8884d8'/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis 
                  type="number" 
                  domain={[dataMin => Math.floor( dataMin ) - 1,
                    dataMax => Math.ceil( dataMax )+ 1]}/>
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <ContainerButtons>
              <Select onChange = { this.onChange }> 
                <option value="1m">Past month</option>
                <option value="3m">Past 3 months</option>
                <option value="6m">Past 6 months</option>
                <option value="1d">Realtime</option>
              </Select> 
            </ContainerButtons>
          </ContentChart>
          )
          : null  
        }
        
        
      </Container>
    );
  }

  onChange = (ev) => {
    let selectedValue = ev.target.options[ ev.target.selectedIndex ].value;
    this.setState({ optionChart: selectedValue });
  }
}


const mapStateToProps = ( state ) => {
  return state.current.company
    ? ({
      dataSet: state.current.chartData
    })
    : {};
};
const mapDispatchToProps = ( dispatch ) => ({
  refreshChart : ( value ) => {
    dispatch( fetchChartByRange( value ) );
  }
});

export default connect( mapStateToProps, mapDispatchToProps )( ChartDetail );


const Container = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  background: #f5f5f5;
  position: inherit;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px #000000;
  flex-direction: column; 
  `;
  
const ContentChart = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  background: transparent;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  @media (max-width: 750px){
   width: 100vw;
  }
`;

const Select = styled.select`
  @media (max-width: 750px){
    font-size: 12px;
  }
`;

const ContainerButtons = styled.div`
  padding: 8px;
  height: 10%;
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;

`;
const Header = styled.h2`
  padding-left: 30px;
  margin-bottom: 0px;
  margin-top: 20px; 
  height: 10%;
  display: flex;
`;
