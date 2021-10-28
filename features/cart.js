import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
        let itemFound = state.items.some(product=>{
            return product[0].productName === action.payload[0].productName;
        })
        if(itemFound) {
            return console.log(`${action.payload[0].productName} already exists!`)
        }

            state.items.push(action.payload);
        },
        remove:(state,action) => {
            let index = state.items.findIndex(product => product[0].productName === action.payload);
            state.items.splice(index, 1);
        },
        increment: (state, action) => {
            let index = state.items.findIndex(product => product[0].productName === action.payload);
            state.items[index][2]+=0.1;
            console.log('item >>>',state.items[index][0].productName);
        },
        decrement: (state, action) => {
            let index = state.items.findIndex(product => product[0].productName === action.payload);
            state.items[index][2]-=0.1;
            console.log('item >>>',state.items[index][0].productName);
        },
        incrementBasket: (state, action) => {
            let index = state.items.findIndex(product => product[0].productName === action.payload);
            state.items[index][2]+=1;
            console.log('item >>>',state.items[index][0].productName);
        },
        decrementBasket: (state, action) => {
            let index = state.items.findIndex(product => product[0].productName === action.payload);
            state.items[index][2]-=1;
            console.log('item >>>',state.items[index][0].productName);
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    add,
    remove,
    increment,
    decrement,
    incrementBasket,
    decrementBasket,
    clear
} = cartSlice.actions;

export const cartSelector = state => state.cart;

export default cartSlice.reducer;

export function addToCart (items, selectedValue) {
    return (dispatch) => {
        // arr of items, selected package and purchase quantity
        const arr = [items, selectedValue, 1];
        dispatch(add(arr));
    }
}

export function deleteFromCart (items) {
    return (dispatch) => {
        dispatch(remove(items));
    }
}

// value is boolean type

export function changeQty (items, value) {
    return (dispatch) => {
        if(value) {
            return dispatch(increment(items))
        }
        return dispatch(decrement(items))
    }
}
export function changeQtyBasket (items, value) {
    return (dispatch) => {
        if(value) {
            return dispatch(incrementBasket(items))
        }
        return dispatch(decrementBasket(items))
    }
}

export function clearCart () {
    return (dispatch) => {
        dispatch(clear());
    }
}

