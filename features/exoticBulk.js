import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
  exoticBulk: [],
  loadExoticBulk: false,
  errorExoticBulk: false,
  lastExoticBulk: null
}

const exoticBlkSlice = createSlice({
    name: 'exoticBulk',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadExoticBulk = true;
        },
        getBulk: (state, action) => {
            state.loadExoticBulk = false;
            state.exoticBulk.push(action.payload);
        },
        getLast: (state, action) => {
            state.lastExoticBulk = action.payload; 
        },
        failed: (state) => {
            state.loadExoticBulk = false;
            state.errorExoticBulk = true;
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
} = exoticBlkSlice.actions;

export const exoticBlkSelector = state => state.exoticBulk;

export default exoticBlkSlice.reducer;

export function fetchBlkExotic(){
    return async (dispatch) => {
        dispatch(clear())
        dispatch(loading())

        try{
            const productsRef = firestore()
            .collection('products')
            
            const docLength = await productsRef
            .orderBy('productName')
            .where("bulk", '==', true)
            .where('exotic', '==', true).get();

            console.log("exotic bulk length>>>",docLength.docs.length);
        
            const  snapshot = await productsRef
                    .where('bulk', '==', true)
                    .where('exotic', '==', true)
                    .limit(5)
                    .get();

            const last = snapshot.docs[snapshot.docs.length - 1];

            dispatch(getLast(last));

            if(snapshot.empty){
                console.log('exotic Bulk>>>','products not found')
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

export function fetchBlkExoticOnScroll(last) {


    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        const next = productsRef
        .orderBy('productName')
        .where('bulk', '==', true)
        .where('exotic', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty >>> exotic bulk");
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

export function exoticBlkClear() {
    return async (dispatch) => {
        
        dispatch(clear())
        
    }
}

