import React, { useCallback, useMemo, useReducer } from "react";

import PropTypes from "prop-types";

import DevicesContext from "./DevicesContext";
import devicesReducer from "./devicesReducer";
import types from "./devicesTypes";

function DevicesProvider({ children }) {
  const [devices, dispatch] = useReducer(devicesReducer, []);

  const addDevice = useCallback(({ deviceName, port, host }) => {
    const device = {
      id: Date.now(),
      name: deviceName,
      sensores: [
        {
          name: "Sensor 1",
          lectura: null,
        },
        {
          name: "Sensor 2",
          lectura: null,
        },
        {
          name: "Sensor 3",
          lectura: null,
        },
        {
          name: "Sensor 4",
          lectura: null,
        },
      ],
      port,
      host,
      lastUpdate: Date.now(),
    };

    const action = {
      type: types.addDevice,
      payload: device,
    };

    dispatch(action);
  }, []);

  const changeDeviceSettings = useCallback((newDevice) => {
    const action = {
      type: types.changeDeviceSettings,
      payload: newDevice,
    };

    dispatch(action);
  }, []);

  const setDevices = useCallback((newDevices) => {
    const action = {
      type: types.setDevices,
      payload: newDevices,
    };

    dispatch(action);
  }, []);

  const deleteDevice = useCallback((id) => {
    const action = {
      type: types.deleteDevice,
      payload: id,
    };

    dispatch(action);
  }, []);

  const context = useMemo(
    () => ({
      devices,

      // Methods
      addDevice,
      changeDeviceSettings,
      setDevices,
      deleteDevice,
    }),
    [
      devices,
      addDevice,
      changeDeviceSettings,
      setDevices,
      deleteDevice,
    ],
  );

  return (
    <DevicesContext.Provider value={context}>{children}</DevicesContext.Provider>
  );
}

DevicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DevicesProvider;
