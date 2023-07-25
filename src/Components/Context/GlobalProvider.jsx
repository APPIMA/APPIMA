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

  const addDevice = useCallback(({ deviceName, port, IP }) => {
    const device = {
      id: Date.now(),
      nombre: deviceName,
      port,
      IP,
      lectura1: Math.floor(Math.random() * (100 - 1) + 1),
      lectura2: Math.floor(Math.random() * (100 - 1) + 1),
      lectura3: Math.floor(Math.random() * (100 - 1) + 1),
      lectura4: Math.floor(Math.random() * (100 - 1) + 1),
      lastUpdate: Date.now()
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
      payload: newTitle
    }

    dispatch(action)
  }, []);

  const context = useMemo(
    () => ({
      ...globalState,

      // Methods
      addDevice,
      changeDeviceTitle,
      changeBarTitle,
    }),
    [globalState, addDevice, changeDeviceTitle, changeBarTitle],
  );

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default GlobalProvider;
