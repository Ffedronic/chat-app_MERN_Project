import { createStore } from "redux";

import produce from "immer";

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = {
    isConnected: false,
    hasUsername: "",
    hasToken: ""
}

export const SetConnection = (data) => ({
    type: "SetConnection",
    payload: data
});

export const SetDisconnection = () => ({
    type: "SetDisconnection"
});

function reducer(state = initialState, action) {
    
    if(action.type === "SetConnection") {
        const data = action.payload;
        localStorage.setItem("chat-app-userToken", data.token);
        return produce(state, (draft) => {
            draft.isConnected = true;
            draft.hasToken = data.token;
            draft.hasUsername = data.username;
        })
    }
    if(action.type === "SetDisconnection") {
        localStorage.clear();
        return produce(state, (draft) => {
            draft.isConnected = false;
            draft.hasToken = "";
            draft.hasUsername = "";
        })
    }
  
    return state;
}

export const store = createStore(reducer, reduxDevtools);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});
