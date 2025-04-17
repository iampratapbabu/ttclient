export const initialCommonState = {
  allFeatures:[],
  cstate: "initial state"
};

export const commonReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ALL_FEATURES":
      return {
        ...state,
        allFeatures: action.payload,
      };
    default:
      return state;
  }
};