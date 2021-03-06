import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

const initialState = [];
export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      //this is gonna return all the payloads except that matches with the id
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
