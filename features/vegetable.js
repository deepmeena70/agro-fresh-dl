import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  vegetable: [],
  vegetableBulk: [],
  loadVegetable: false,
  errorVegetable: false,
  last: null,
  lastBulk: null,
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
        getLast: (state, action) => {
            state.last = action.payload; 
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
    get,
    getLast,
    getNewLast,
    getBulk, 
    getLastBulk,
    failed,
    clear
} = vegetableSlice.actions;

export const vegetableSelector = state => state.vegetable;

export default vegetableSlice.reducer;


export function fetchRegVeg(orderType){
    return async (dispatch) => {
        dispatch(clear());
        dispatch(loading())

        console.log('order type from vegetables >>>',orderType)

        try{
            const productsRef = firestore()
            .collection('products')

            const first = productsRef
            .orderBy('productName')
            .where(orderType, '==', true)
            .where('vegetable', '==', true)
            .limit(5);    

            const snapshot = await first 
                .get();

            
            const last = snapshot.docs[snapshot.docs.length - 1];

            if(orderType === 'regular') {
                dispatch(getLast(last));

                snapshot.forEach(doc => {
                    dispatch(get(doc.data()));
                })
            } else {
                dispatch(getLastBulk(last))

                snapshot.forEach(doc => {
                    dispatch(getBulk(doc.data()));
                })
            }

            if(snapshot.empty){
                console.log("vegetables >>>",'products not found')
                dispatch(failed());
                return;
            }
          
        } catch (e) {
            console.error(e);
        }
      
    }
}

export function fetchRegVegOnScroll(orderType, last) {

    return async (dispatch) => {

        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        console.log("orderType >>>",orderType)

        const next = productsRef
        .orderBy('productName')
        .where(orderType, '==', true)
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

            if(orderType === "bulk") {
                dispatch(getLastBulk(getLastBulk))
            } else {
                dispatch(getLast(lastQuery));
            }
        
        } catch(e) {
            console.error(e);
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

