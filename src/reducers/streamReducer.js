import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';
//import _ from 'lodash';

const streamReducer = (state = [], action) => {
  // 當把陣列解構賦值後放進物件裡 {...[1,2,3]}
  // 物件的內容會是 {陣列Index:對應的陣列元素}  {0:1,1:2,2:3}
  // 透過ES6的語法，後面新增的property如果跟...state有重複的話，後面的會取代前面的
  // ref: https://stackoverflow.com/questions/5640988/how-do-i-interpolate-a-variable-as-a-key-in-a-javascript-object/30608422
  // ref: https://stackoverflow.com/questions/5640988/howdoiinterpolateavari
  switch (action.type) {
    case FETCH_STREAMS:
      let newObj = {};
      action.payload.forEach((element) => {
        newObj[element.id] = element;
      });
      return { ...state, ...newObj };
    // // lodash library
    // return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const newState = { ...state }; // create a copy of state
      delete newState[action.payload]; // remove property from copy
      return newState;
    //// lodash library
    // return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default streamReducer;
