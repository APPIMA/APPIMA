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

  const addDevice = useCallback(() => {
    const device = {
      id: Date.now(),
      nombre: "Default",
      lecturas: [
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
      ],
      connection: Math.floor(Math.random() * (3 - 1) + 1) === 1,
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

  const context = useMemo(
    () => ({
      ...globalState,

      // Methods
      addDevice,
      changeDeviceTitle,
    }),
    [globalState, addDevice, changeDeviceTitle],
  );

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default GlobalProvider;
