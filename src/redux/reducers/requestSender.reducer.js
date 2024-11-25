import {
  REQUEST_SENDER_FETCHING,
  REQUEST_SENDER_SUCCESS,
  REQUEST_SENDER_FAILED,
  REQUEST_SENDER_CLEAR,
} from "./../../constants/actionType";

const initialState = {
  requests: [],
  page: 1,
  pageSize: 10,
  totalRequests: 0,
  isFetching: false,
  isFailed: false,
  statusCount: [
    { status: "รอดำเนินการ", countStatus: 0 },
    { status: "อนุมัติ", countStatus: 0 },
    { status: "ปฏิเสธ", countStatus: 0 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_SENDER_FETCHING:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: true,
        isFailed: false,
        statusCount: [
          { status: "รอดำเนินการ", countStatus: 0 },
          { status: "อนุมัติ", countStatus: 0 },
          { status: "ปฏิเสธ", countStatus: 0 },
        ],
      };
    case REQUEST_SENDER_SUCCESS:
      return {
        ...state,
        requests: payload.requests,
        page: payload.page,
        pageSize: payload.pageSize,
        totalRequests: payload.totalRequests,
        isFetching: false,
        isFailed: false,
        statusCount: payload.statusCount,
      };

    case REQUEST_SENDER_FAILED:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: false,
        isFailed: true,
        statusCount: [
          { status: "รอดำเนินการ", countStatus: 0 },
          { status: "อนุมัติ", countStatus: 0 },
          { status: "ปฏิเสธ", countStatus: 0 },
        ],
      };
    case REQUEST_SENDER_CLEAR:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: false,
        isFailed: false,
        statusCount: [
          { status: "รอดำเนินการ", countStatus: 0 },
          { status: "อนุมัติ", countStatus: 0 },
          { status: "ปฏิเสธ", countStatus: 0 },
        ],
      };

    default:
      return state;
  }
};
