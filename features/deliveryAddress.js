import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
  deliveryAddress: null,
}

const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState,
    reducers: {
        getUserData: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    getUserData,
    clear
} = deliveryAddressSlice.actions;

export const deliveryAddressSelector = state => state.deliveryAddress;

export default deliveryAddressSlice.reducer;

export function getDeliveryAddress (user) {
    return async (dispatch) => {

        const ref = firestore().collection('deliveryAddress').doc(user)

        const snapshot = await ref.get();

        if(snapshot.exists) {
            dispatch(getUserData(snapshot.data()));
        }
    }
}

export function clearDeliveryAddress() {
    return (dispatch) => {
        dispatch(clear());
    }
}

