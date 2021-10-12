import React, { createContext } from "react";
import { useMainReducer } from "./Reducer";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
    const [store, dispatch] = useMainReducer();

    return (
        <MainContext.Provider value={{ store, dispatch }}>
            {children}
        </MainContext.Provider>
    );
}
