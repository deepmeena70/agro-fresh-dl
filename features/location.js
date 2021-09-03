import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase'

export const initialState = {
    location: null,
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        getLocation: (state, action) => {
            state.location = action.payload;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    getLocation,
    clear
} = locationSlice.actions;

export const locationSelector = state => state.location;

export default locationSlice.reducer;

export function fetchLocation(location) {
    return (dispatch) => {
        dispatch(getLocation(location))
    }
}

