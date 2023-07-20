import React, { useCallback, useReducer } from "react";

import PropTypes from "prop-types";

import GlobalContext from "./GlobalContext";
import globalReducer from "./globalReducer";
import types from "./globalTypes";

const init = () => ({
  devices: []
})

function GlobalProvider({ children }) {
  const [globalState, dispatch] = useReducer(globalReducer, {}, init);

  const addDevice = useCallback(() => {
    const device = {
      id: Date.now(),
      nombre: 'Default',
      lecturas: [
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
        Math.floor(Math.random() * (100 - 1) + 1),
      ],
    };


    const action = {
      type: types.addDevice,
      payload: device,
    };

    dispatch(action);
  },[]);

  return (
    <GlobalContext.Provider
      value={{
        ...globalState,

        // Methods
        addDevice
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default GlobalProvider;
