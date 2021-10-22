import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
    searching: false,
    searchItems: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        loading:(state) => {
            state.searching = true;
        },
        get: (state, action) => {
            state.searching = false;
            state.searchItems.push(action.payload);
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading,
    get,
    clear
} = searchSlice.actions;


export const searchSelector = state => state.search;

export default searchSlice.reducer;

export function fetchSearch(text) {
    return async (dispatch) => {
        dispatch(loading());

        const docRef = firestore().collection("products");
        
        const snapshot = await docRef.where("productName","==", text).get().then(dispatch(clear()));

        if(snapshot.empty) {
            return console.log(text,"Product not found in search")
        }

        snapshot.forEach(doc => {
            dispatch(get(doc.data()));
        })
    }
}