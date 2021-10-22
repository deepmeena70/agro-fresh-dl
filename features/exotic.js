import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  exotic: [],
  exoticBulk: [],
  loadExotic: false,
  errorExotic: false,
}

const exoticSlice = createSlice({
    name: 'exotic',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadExotic = true;
        },
        get: (state, action) => {
            state.loadExotic = false;
            state.exotic.push(action.payload);
        },
        getBulk: (state, action) => {
            state.loadExotic = false;
            state.exoticBulk.push(action.payload);
        },
        failed: (state) => {
            state.loadExotic = false;
            state.errorExotic = true;
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
} = exoticSlice.actions;

export const exoticSelector = state => state.exotic;

export default exoticSlice.reducer;


export function fetchRegExotic(orderType){
    return async (dispatch) => {
        dispatch(clear())
        dispatch(loading())

        try{
            const productsRef = firestore()
            .collection('products')
        
            let snapshot;
            
            if(orderType === 'bulk') {
                snapshot = await productsRef
                    .where('bulk', '==', true)
                    .where('exotic', '==', true)
                    .limit(5)
                    .get();

            } else {
                snapshot = await productsRef
                        .where('regular', '==', true)
                        .where('exotic', '==', true)
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
        } catch (e) {
            console.log(e);
        }
      
    }
}

export function exoticClear() {
    return async (dispatch) => {
        
            auth()
            .signOut()
            .then(() => {
                dispatch(clear())
            })
        
    }
}

