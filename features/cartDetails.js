import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  cartDetails: null,
}

const cartDetailsSlice = createSlice({
    name: 'cartDetails',
    initialState,
    reducers: {
        add: (state, action) => {
            state.cartDetails = action.payload;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    add,
    clear
} = cartDetailsSlice.actions;

export const cartDetailsSelector = state => state.cartDetails;

export default cartDetailsSlice.reducer;

export function getCartDetails (details) {
    return (dispatch) => {
        dispatch(add(details));
    }
}

export function clearCartDetails () {
    return (dispatch) => {
        dispatch(clear());
    }
}

