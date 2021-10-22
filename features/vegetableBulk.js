import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  vegetableBulk: [],
  loadVegetableBulk: false,
  errorVegetableBulk: false,
  lastBulk: null,
}

const vegetableBlkSlice = createSlice({
    name: 'vegetableBulk',
    initialState,
    reducers: {
        loading: (state) =>{
            state.loadVegetableBulk = true;
        },
        getBulk: (state, action) => {
            state.loadVegetableBulk = false;
            state.vegetableBulk.push(action.payload);
        },
        failed: (state) => {
            state.loadVegetableBulk = false;
            state.errorVegetableBulk = true;
        },
        getLastBulk: (state, action) => {
            state.lastBulk = action.payload;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading, 
    getBulk, 
    getLastBulk,
    failed,
    clear
} = vegetableBlkSlice.actions;

export const vegetableBlkSelector = state => state.vegetableBulk;

export default vegetableBlkSlice.reducer;

export function fetchBlkVeg(){
    return async (dispatch) => {
        dispatch(clear());
        dispatch(loading())

        console.log('order type from vegetables >>>',"bulk")

        try{
            const productsRef = firestore()
            .collection('products')

            const first = productsRef
            .orderBy('productName')
            .where("bulk", '==', true)
            .where('vegetable', '==', true)
            .limit(5);    

            const snapshot = await first 
                .get();
            
            const last = snapshot.docs[snapshot.docs.length - 1];


            dispatch(getLastBulk(last))

            snapshot.forEach(doc => {
                dispatch(getBulk(doc.data()));
            })

            if(snapshot.empty){
                console.log("vegetables >>>",'products not found in bulk')
                dispatch(failed());
                return;
            }
          
        } catch (e) {
            console.error(e);
        }
      
    }
}

export function fetchBlkVegOnScroll(last) {

    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        console.log("orderType >>>","bulk")

        const next = productsRef
        .orderBy('productName')
        .where("bulk", '==', true)
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
                    dispatch(getBulk(doc.data()));
                })
            }

            dispatch(getLastBulk(lastQuery))
        
        } catch(e) {
            console.error(e);
        }

    }

}

export function vegetableBlkClear() {
    return async (dispatch) => {
            auth()
            .signOut()
            .then(() => {
                dispatch(clear())
            })
        
    }
}

