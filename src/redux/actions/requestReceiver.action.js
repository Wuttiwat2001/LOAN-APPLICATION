import {
  REQUEST_RECEIVER_FETCHING,
  REQUEST_RECEIVER_SUCCESS,
  REQUEST_RECEIVER_FAILED,
  REQUEST_RECEIVER_CLEAR,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";

export const setRequestFetchingToState = () => ({
  type: REQUEST_RECEIVER_FETCHING,
});

export const setRequestSuccessToState = (payload) => ({
  type: REQUEST_RECEIVER_SUCCESS,
  payload,
});

export const setRequestFailedToState = () => ({
  type: REQUEST_RECEIVER_FAILED,
});

export const setRequestClearToState = () => ({
  type: REQUEST_RECEIVER_CLEAR,
});

export const loadRequestReceivers = (page,pageSize,search,searchDate) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;
        const response = await api.post(
          `${server.REQUEST_URL}/requestReceiver?page=${page}&pageSize${pageSize}`,{
            userId: userId,
            search: search,
            searchDate: searchDate
          }
        );

        if ((response.data.message = SUCCESS)) {
          dispatch(setRequestSuccessToState(response.data));
        } else {
          dispatch(setRequestFailedToState());
        }
      } else {
        dispatch(setRequestFailedToState());
      }
    } catch (error) {
      dispatch(setRequestFailedToState());
    }
  };
};
