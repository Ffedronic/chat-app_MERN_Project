import { createStore } from "redux";

import { initialState} from "./initialState"

import produce from "immer";

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const SetConnection = (data) => ({
    type: "SetConnection",
    payload: data
});

export const SetDisconnection = () => ({
    type: "SetDisconnection"
});

export const SetProfilPicture = (data) => ({
    type: "SetProfilPicture",
    payload: data
});

export const SetSelectedContact = (contact) => ({
    type: "SetSelectedContact",
    payload: contact
});

function reducer(state = initialState, action) {
    
    if(action.type === "SetConnection") {
        const data = action.payload;
        localStorage.setItem(`chat-app-userToken/${data.userId}`, data.token);
        localStorage.setItem(`chat-app-userAvatar/${data.userId}`, data.avatarImage)
        return produce(state, (draft) => {
            draft.isConnected = true;
            draft.userId = data.userId;
            draft.userName = data.username;
            draft.avatarIs = data.avatarImage;
        })
    }
    if(action.type === "SetDisconnection") {
        localStorage.clear();
        return produce(state, (draft) => {
            draft.isConnected = false;
            draft.userId = "";
            draft.avatarIs = "";
            draft.userName = "";
            draft.SelectedContact = "";
        })
    }
    if(action.type === "SetProfilPicture") {
        return produce(state, (draft) => {
            draft.avatarIs = action.payload;
            localStorage.setItem(`chat-app-userAvatar/${state.userId}`, action.payload)
        })
    }
    if(action.type === "SetSelectedContact") {
        return produce(state, (draft) => {
            draft.SelectedContact = action.payload;
        })
    }
    return state;
}

export const store = createStore(reducer, reduxDevtools);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});
