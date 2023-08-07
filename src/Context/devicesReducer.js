import types from "./devicesTypes";

const devicesReducer = (state = {}, action = "") => {
  switch (action.type) {
    case types.addDevice:
      return [...state, action.payload];

    case types.changeDeviceSettings:
      return state.map((device) => {
        if (device.id === action.payload.id) {
          return {
            ...device,
            ...action.payload,
          };
        }
        return device;
      });

    case types.setDevices:
      return action.payload;

    case types.updateLectures:
      return state.map((device) => {
        if (device.id === action.payload.id) {
          return {
            ...device,
            lastUpdate: Date.now(),
            sensores: action.payload.newLectures,
          };
        }
        return device;
      });

    case types.deleteDevice:
      return state.filter((device) => device.id !== action.payload);

    default:
      return state;
  }
};

export default devicesReducer;
