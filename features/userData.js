import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    userData: null,
    userDataLoading: false,
    hasUserDataErrors: false
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        loading(state){
            state.userDataLoading = true;
        },
        getUserData(state, action) {
            state.userDataLoading = false;
            state.userData = action.payload;
        },
        failure(state) {
            state.userDataLoading = false;
            state.hasUserDataErrors = true;
        },
        clear(state) {
            Object.assign(state, initialState);
        },
    }
})

export const {
    loading,
    failure, 
    getUserData, 
    clear
} = userDataSlice.actions;

export const userDataSelector = state => state.userData;

export default userDataSlice.reducer;

export function fetchUserData(user){
    
    return (dispatch) => {
        if(!user) {
            return;
        }

        dispatch(loading())

        const data = {
            displayName: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
        };

        console.log('userData slice >>>',user);

        console.log('user data >>>',data);

        dispatch(getUserData(data));
       
    }
}

export function clearUserData() {
    return (dispatch) => {
        dispatch(clear());
    }
}

