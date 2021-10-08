import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  vegetable: [],
  vegetableBulk: [],
  loadVegetable: false,
  errorVegetable: false,
}

const vegetableSlice = createSlice({
    name: 'vegetable',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadVegetable = true;
        },
        get: (state, action) => {
            state.loadVegetable = false;
            state.vegetable.push(action.payload);
        },
        getBulk: (state, action) => {
            state.loadVegetable = false;
            state.vegetableBulk.push(action.payload);
        },
        failed: (state) => {
            state.loadVegetable = false;
            state.errorVegetable = true;
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
} = vegetableSlice.actions;

export const vegetableSelector = state => state.vegetable;

export default vegetableSlice.reducer;


export function fetchRegVeg(orderType){
    return async (dispatch) => {
        dispatch(clear());
        dispatch(loading())

        const productsRef = firestore()
                            .collection('products')

        let snapshot;
        
        if(orderType === 'bulk') {
            snapshot = await productsRef
                .where('bulk', '==', true)
                .where('vegetable', '==', true)
                .limit(5)
                .get();

        } else {
             snapshot = await productsRef
                    .where('regular', '==', true)
                    .where('vegetable', '==', true)
                    .limit(5)
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

export function vegetableClear() {
    return async (dispatch) => {
            auth()
            .signOut()
            .then(() => {
                dispatch(clear())
            })
        
    }
}

