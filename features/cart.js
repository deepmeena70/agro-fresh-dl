import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.items.push(action.payload);
        },
        remove:(state,action) => {
            let index = state.items.findIndex(product => product.productName === action.payload);
            state.items.splice(index, 1);
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    add,
    remove,
    clear
} = cartSlice.actions;

export const cartSelector = state => state.cart;

export default cartSlice.reducer;

export function addToCart (items) {
    return (dispatch) => {
        dispatch(add(items))
    }
}

export function deleteFromCart (items) {
    return (dispatch) => {
        dispatch(remove(items));
    }
}

