import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase'

export const initialState = {
    offers: [],
    loadingOffers: false,
    offersErrors: false,
}

const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        loading(state){
            state.loadingOffers = true;
        },
        getOffer(state, action) {
            state.loadingOffers = false;
            state.offers.push(action.payload)
        },
        failure(state) {
            state.offersLoading = false;
            state.offersErros = true;
        },
        clear(state) {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading, 
    getOffer, 
    failure,
    clear
} = offersSlice.actions;

export const offersSelector = state => state.offers;

export default offersSlice.reducer;

export function fetchOffers(){
    return async (dispatch) => {
        dispatch(loading())

        const offersRef = firebase.firestore().collection('offers');
        const snapshot = await offersRef.get();

        if(snapshot.empty){
            return console.log('No offers!')
        }

        snapshot.forEach(doc=> {
            console.log('loaded from offers>>>',doc.data());
            dispatch(getOffer(doc.data()));
        })
    }
}

export function clearOffers() {
    return async (dispatch) => {
        dispatch(clear());
    }
}

