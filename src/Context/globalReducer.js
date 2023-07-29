import types from "./globalTypes";

const globalReducer = (state = {}, action = "") => {
  switch (action.type) {
    case types.addDevice:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };

    case types.changeDeviceSettings:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.id === action.payload.id) {
            return {
              ...device,
              ...action.payload,
            };
          }
          return device;
        }),
      };

    case types.changeBarTitle:
      return {
        ...state,
        barTitle: action.payload,
      };

    case types.setDevices:
      return {
        ...state,
        devices: action.payload,
      };

    case types.deleteDevice:
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== action.payload)
      }

    default:
      return state;
  }
};

export default globalReducer;
