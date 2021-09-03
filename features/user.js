import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: null,
    loading: false,
    hasErrors: false,
    signIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn(state){
            state.signIn = true;
        },
        loading(state){
            state.userLoading = true;
        },
        getUser(state, action) {
            state.userLoading = false;
            state.user = action.payload;
        },
        failure(state) {
            state.userLoading = false;
            state.hasErrors = true;
        },
        clear(state) {
            Object.assign(state, initialState);
        }

    }
})

export const {
    signIn,
    loading, 
    getUser, 
    failure,
    clear
} = userSlice.actions;

export const userSelector = state => state.user;

export default userSlice.reducer;

export function gettingUser(user){
    return (dispatch) => {
        dispatch(loading())
        if(!user) {
            return;
        }
        dispatch(signIn())
        dispatch(getUser(user));     
    }
}

export function clearUser() {
    return (dispatch) => {
        dispatch(clear());        
    }
}

