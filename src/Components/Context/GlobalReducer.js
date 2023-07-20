import types from "./globalTypes";

const globalReducer = (state = {}, action = '') => {
  switch (action.type) {
    case types.addDevice:
      return {
        ...state,
        devices: [...state.devices, action.payload]
      };

    default:
      return state;
  }
};

export default globalReducer;
