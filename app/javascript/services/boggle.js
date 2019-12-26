/*
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const GET_AVAILABLE_WORDS = "GET_AVAILABLE_WORDS";

export function sendLetters(params) {
  return dispatch => {
    dispatch({type: GET_AVAILABLE_WORDS });
    return fetch(`v1/things.json`)
      .then(response => response.json())
      .then(error => console.log(error)) ;
  }
}

const structuredSelector = createStructuredSelector({
  things: state => state.things,
})
const mapDispatchToProps = { getthings };
export default connect(structuredSelector, mapDispatchToProps)(HelloWorld)

*/

import axios from 'axios';

export function sendLetters(params) {
  return axios.post(
    '/v1/words',
    params
  );
}
