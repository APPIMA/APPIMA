import React, { useCallback, useMemo, useReducer } from "react";

import PropTypes from "prop-types";

import GlobalContext from "./GlobalContext";
import globalReducer from "./globalReducer";
import types from "./globalTypes";

const init = () => ({
  devices: [],
});

function GlobalProvider({ children }) {
  const [globalState, dispatch] = useReducer(globalReducer, {}, init);

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

  const changeBarTitle = useCallback((newTitle) => {
    const action = {
      type: types.changeTitleDevice,
      payload: newTitle,
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
    }

    dispatch(action)
  }, []);

  const context = useMemo(
    () => ({
      ...globalState,

      // Methods
      addDevice,
      changeDeviceSettings,
      changeBarTitle,
      setDevices,
      deleteDevice
    }),
    [globalState, addDevice, changeDeviceSettings, changeBarTitle, setDevices, deleteDevice],
  );

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
