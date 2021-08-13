import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase'

export const initialState = {
    userData: null,
    userDataLoading: false,
    hasUserDataErrors: false
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserDataLoading(state){
            state.userDataLoading = true;
        },
        setUserDataNotLoaded(state) {
            Object.assign(state, initialState);
        },
        setUserData(state, action) {
            state.userDataLoading = false;
            state.userData = action.payload;
        },
        setUserDataFailed(state) {
            state.userDataLoading = false;
            state.hasUserDataErrors = true;
        },
    }
})

export const {
    setUserDataLoading,
    setUserDataNotLoaded, 
    setUserData, 
    setUserDataFailed
} = userDataSlice.actions;

export const userDataSelector = state => state.userData;

export default userDataSlice.reducer;

export function fetchUserData(user){
    
    return async (dispatch) => {
        if(!user) {
            return dispatch(setUserDataNotLoaded())
        }

        dispatch(setUserDataLoading())

        const userRef = firebase
                            .firestore()
                            .collection('users')
                            .doc(user);
        const snapshot = await userRef.get();

        if(!snapshot.exists) {
            dispatch(setUserDataFailed())
            return;
        }
        // console.log(snapshot.data())
        dispatch(setUserData(snapshot.data()))     
       
    }
}

