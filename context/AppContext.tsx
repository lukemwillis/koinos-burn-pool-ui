import React from "react";
import { createContext, useReducer } from "react";

import { AppReducer, AppState, initialAppState } from "./AppReducer";

import { AppActions } from "./AppActions";

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
};

export const AppContext = createContext<AppContextType>({
  state: initialAppState,
  dispatch: () => undefined,
});

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
