import React from 'react';
import { connect } from 'react-redux';
import { setSymbol } from '../../reduxStore/actionCreator';
import { search } from '../../reduxStore/actions/thunkActions';

class DefaultContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
  }

  render() {
    return (
      <div>
        <div 
          style= {{ height:100, width: 100, backgroundColor: 'salmon' }} 
          onClick ={() => this.onSubmit() }
        > </div>
        <input 
          value={this.state.inputText}
          onChange = { ( ev ) => this.setState(
            { inputText: ev.target.value.toUpperCase() }) }>
        </input>
          
          
      </div>
      
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