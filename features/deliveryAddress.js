import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
  deliveryAddress: null,
}

const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState,
    reducers: {
        get: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    get,
    clear
} = deliveryAddressSlice.actions;

export const deliveryAddressSelector = state => state.deliveryAddress;

export default deliveryAddressSlice.reducer;

export function getDeliveryAddress (user) {
    return async (dispatch) => {

        const ref = firestore().collection('deliveryAddress').doc(user)

        const snapshot = await ref.get();

        if(snapshot.exists) {
            dispatch(get(snapshot.data()));
        }
    }
}

export function clearDeliveryAddress() {
    return (dispatch) => {
        dispatch(clear());
    }
}

