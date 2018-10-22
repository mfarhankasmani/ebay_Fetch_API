import * as actionType from "../actions/actionType";

const initialState = {
  items: [],
  loading: false,
  data: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.fetchStart:
      return { loading: true, data: false };
    case actionType.fetchSuccess:
      return { items: action.resData, loading: false, data: true };
    case actionType.fetchFailure:
      return { loading: false, data: false };
    default:
      return state;
  }
};

export default reducer;
