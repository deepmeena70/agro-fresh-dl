import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  fruit: [],
  fruitBulk: [],
  loadFruit: false,
  errorFruit: false,
}

const fruitSlice = createSlice({
    name: 'fruit',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadFruit = true;
        },
        get: (state, action) => {
            state.loadFruit = false;
            state.fruit.push(action.payload);
        },
        getBulk: (state, action) => {
            state.loadFruit = false;
            state.fruitBulk.push(action.payload);
        },
        failed: (state) => {
            state.loadFruit = false;
            state.errorFruit = true;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading, 
    get,
    getBulk, 
    failed,
    clear
} = fruitSlice.actions;

export const fruitSelector = state => state.fruit;

export default fruitSlice.reducer;


export function fetchRegFruit(orderType){
    return async (dispatch) => {
        dispatch(loading())

        const productsRef = firestore()
                            .collection('products')
  
        let snapshot;
        
        if(orderType === 'bulk') {
            snapshot = await productsRef
                .where('bulk', '==', true)
                .where('fruit', '==', true)
                .get();

        } else {
             snapshot = await productsRef
                    .where('regular', '==', true)
                    .where('fruit', '==', true)
                    .get();
        }

        if(snapshot.empty){
            console.log('products not found')
            dispatch(failed());
            return;
        }

        if(orderType === 'bulk') {
            snapshot.forEach(doc => {
                dispatch(getBulk(doc.data()));
            })
        } else {
            snapshot.forEach(doc => {
                dispatch(get(doc.data()));
            })
        }

    }
}

export function fruitClear() {
    return async (dispatch) => {
        
            auth()
            .signOut()
            .then(() => {
                dispatch(clear())
            })
        
    }
}

