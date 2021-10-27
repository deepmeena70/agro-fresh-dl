import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
  vegetable: [],
  loadVegetable: false,
  errorVegetable: false,
  lastVeg: null,
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
        failed: (state) => {
            state.loadVegetable = false;
            state.errorVegetable = true;
        },
        getLast: (state, action) => {
            state.lastVeg = action.payload; 
        },
        clear: (state) => {
            Object.assign(state, initialState);
        }

    }
})

export const {
    loading, 
    get,
    failed,
    getLast,
    clear
} = vegetableSlice.actions;

export const vegetableSelector = state => state.vegetable;

export default vegetableSlice.reducer;


export function fetchRegVeg(){
    return async (dispatch) => {
        dispatch(clear());
        dispatch(loading())

        console.log('order type from vegetables >>>',"regular")

        try{
            const productsRef = firestore()
            .collection('products')

            const docLength = await productsRef
            .orderBy('productName')
            .where("regular", '==', true)
            .where('vegetable', '==', true).get();

            console.log("vegetable regular length>>>",docLength.docs.length);

            const first = productsRef
            .orderBy('productName')
            .where("regular", '==', true)
            .where('vegetable', '==', true)
            .limit(5);    

            const snapshot = await first 
                .get();
            
            const last = snapshot.docs[snapshot.docs.length - 1];

            dispatch(getLast(last));

            snapshot.forEach(doc => {
                dispatch(get(doc.data()));
            })

            if(snapshot.empty){
                console.log("vegetables >>>",'products not found in regular')
                dispatch(failed());
                return;
            }
          
        } catch (e) {
            console.error(e);
        }
      
    }
}

export function fetchRegVegOnScroll(last) {

    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        console.log("orderType >>>","regular")

        const next = productsRef
        .orderBy('productName')
        .where("regular", '==', true)
        .where('vegetable', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty >>> vegetables");
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

export function vegetableRegClear() {
    return async (dispatch) => {
       dispatch(clear());        
    }
}

