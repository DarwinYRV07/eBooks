import { CheckBox } from "native-base";
import React, { Children, useReducer } from "react";

export default (reducer,action,defaultValue) => {
    const Context = React.createContext();
    const Provider = ({children}) => {
        const [state,dispatch]=useReducer(reducer,defaultValue);
        const boundActions = {};
        for(let key in action) {
            boundActions[key] = actions[key](dispatch);
        }
        return(
            <Context.Provider value = {{state, ...boundActions }}>
                {Children}
            </Context.Provider>
        );
    }

    return (Context, Provider);

}
