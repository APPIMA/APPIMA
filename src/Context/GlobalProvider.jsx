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
          name: "Default",
          lectura: null,
        },
        {
          name: "Default",
          lectura: null,
        },
        {
          name: "Default",
          lectura: null,
        },
        {
          name: "Default",
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

  const context = useMemo(
    () => ({
      ...globalState,

      // Methods
      addDevice,
      changeDeviceSettings,
      changeBarTitle,
      setDevices,
    }),
    [globalState, addDevice, changeDeviceSettings, changeBarTitle, setDevices],
  );

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
