import {CHANGE_LOADING} from '../action/authActions';

const changeState = {
  loading: false,
};

export const changeReducer = (state = changeState, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
