import {
  REQUEST_RECEIVER_FETCHING,
  REQUEST_RECEIVER_SUCCESS,
  REQUEST_RECEIVER_FAILED,
  REQUEST_RECEIVER_CLEAR,
} from "./../../constants/actionType";

const initialState = {
  requests: [],
  page: 1,
  pageSize: 10,
  totalRequests: 0,
  isFetching: false,
  isFailed: false,
  errorMessage: "",
  statusCount: [
    { status: "รอดำเนินการ", countStatus: 0 },
    { status: "อนุมัติ", countStatus: 0 },
    { status: "ปฏิเสธ", countStatus: 0 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_RECEIVER_FETCHING:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: true,
        isFailed: false,
        errorMessage: "",
        statusCount: [
          { status: "รอดำเนินการ", countStatus: 0 },
          { status: "อนุมัติ", countStatus: 0 },
          { status: "ปฏิเสธ", countStatus: 0 },
        ],
      };
    case REQUEST_RECEIVER_SUCCESS:
      return {
        ...state,
        requests: payload.requests,
        page: payload.page,
        pageSize: payload.pageSize,
        totalRequests: payload.totalRequests,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
        statusCount: payload.statusCount,
      };

    case REQUEST_RECEIVER_FAILED:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: false,
        isFailed: true,
        errorMessage: payload,
        statusCount: [
          { status: "รอดำเนินการ", countStatus: 0 },
          { status: "อนุมัติ", countStatus: 0 },
          { status: "ปฏิเสธ", countStatus: 0 },
        ],
      };
    case REQUEST_RECEIVER_CLEAR:
      return {
        ...state,
        requests: [],
        page: 1,
        pageSize: 10,
        totalRequests: 0,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
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
