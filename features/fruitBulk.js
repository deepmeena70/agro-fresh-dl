import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  fruitBulk: [],
  loadFruitBulk: false,
  errorFruitBulk: false,
  lastFruitBulk:null
}

const fruitBlkSlice = createSlice({
    name: 'fruitBulk',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadFruitBulk = true;
        },
        getBulk: (state, action) => {
            state.loadFruitBulk = false;
            state.fruitBulk.push(action.payload);
        },
        getLast: (state, action) => {
            state.lastFruitBulk = action.payload; 
        },
        failed: (state) => {
            state.loadFruitBulk = false;
            state.errorFruitBulk = true;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading, 
    getBulk, 
    failed,
    getLast,
    clear
} = fruitBlkSlice.actions;

export const fruitBlkSelector = state => state.fruitBulk;

export default fruitBlkSlice.reducer;


export function fetchBlkFruit(){
    return async (dispatch) => {
        dispatch(clear())
        dispatch(loading())

        try{
            const productsRef = firestore()
                            .collection('products')


            const docLength = await productsRef
            .orderBy('productName')
            .where("bulk", '==', true)
            .where('fruit', '==', true).get();

            console.log("fruit bulk length>>>",docLength.docs.length);
  
         
            const snapshot = await productsRef
                    .where('bulk', '==', true)
                    .where('fruit', '==', true)
                    .limit(5)
                    .get();

            const last = snapshot.docs[snapshot.docs.length - 1];

            dispatch(getLast(last));
           
            if(snapshot.empty){
                console.log('products not found fruit bulk')
                dispatch(failed());
                return;
            }

            snapshot.forEach(doc => {
                dispatch(getBulk(doc.data()));
            })
             
        } catch (e) {
            console.log(e);
        }

    }
}

export function fetchBlkFruitOnScroll(last) {


    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        const next = productsRef
        .orderBy('productName')
        .where('bulk', '==', true)
        .where('fruit', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty in fruit bulk");
                dispatch(failed());
            } else {
                snapshot.forEach(doc => {
                    dispatch(getBulk(doc.data()));
                })
            }
        
            dispatch(getLast(lastQuery));
        } catch(e) {
            console.error(e);
        }

    }

}

export function fruitBulkClear() {
    return async (dispatch) => {
        
        dispatch(clear())
        
    }
}

