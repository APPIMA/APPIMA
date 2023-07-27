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
      nombre: deviceName,
      lectura1: -1,
      lectura2: -1,
      lectura3: -1,
      lectura4: -1,
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

  const changeDeviceTitle = useCallback((newTitle, id) => {
    const action = {
      type: types.changeTitleDevice,
      payload: {
        newTitle,
        id,
      },
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
      changeDeviceTitle,
      changeBarTitle,
      setDevices,
    }),
    [globalState, addDevice, changeDeviceTitle, changeBarTitle, setDevices],
  );

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
