import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  fruit: [],
  fruitBulk: [],
  loadFruit: false,
  errorFruit: false,
  last:null
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
        getLast: (state, action) => {
            state.last = action.payload; 
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
    getLast,
    clear
} = fruitSlice.actions;

export const fruitSelector = state => state.fruit;

export default fruitSlice.reducer;


export function fetchRegFruit(orderType){
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
                    .where('fruit', '==', true)
                    .limit(5)
                    .get();

            } else {
                snapshot = await productsRef
                        .where('regular', '==', true)
                        .where('fruit', '==', true)
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

export function fetchRegFruitOnScroll(orderType, last) {


    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        const next = productsRef
        .orderBy('productName')
        .where('regular', '==', true)
        .where('vegetable', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("collection is empty");
                dispatch(failed());
            } else {
                snapshot.forEach(doc => {
                    dispatch(get(doc.data()));
                })
            }
        
            dispatch(getLast(lastQuery));
        } catch(e) {
            console.error(e);
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

