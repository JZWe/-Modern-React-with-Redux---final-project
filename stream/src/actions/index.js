import { Router } from 'react-router-dom';
import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// use redux-thunk utility functions to update db.json
// 1) Action creator runs code to make an API request
// 2) API responds with data
// 3) Action creator returns with fetched data on the payload property
export const createStream = (formValues) => async (dispatch, getState) => {
  // 用 getState() 得到目前 Store 的 state
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  // dispatch 會把物件傳到 store
  dispatch({ type: CREATE_STREAM, payload: response.data });
  if (response) {
    history.push('/');
  }
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// 當我們執行 PUT request 的時候
// 傳進的物件會取代原本的，而不是只更新原本物件跟傳進物件之間重複的 property
// 只更新重複的 property 的話應該要用 patch
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  if (response) {
    history.push('/');
  }
};
export const deleteStream = (id) => async (dispatch) => {
  // no need to get data back
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
