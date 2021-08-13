import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase'

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
        setSignIn(state){
            state.signIn = true;
        },
        setSignOut(state){
            state.signIn = false;
        },
        setLoading(state){
            state.userLoading = true;
        },
        setUser(state, action) {
            state.userLoading = false;
            state.user = action.payload;
        },
        setUserFailed(state) {
            state.userLoading = false;
            state.hasErrors = true;
        },
        setUserToInitial(state) {
            Object.assign(state, initialState);
        }

    }
})

export const {
    setSignIn, 
    setSignOut, 
    setLoading, 
    setUser, 
    setUserFailed,
    setUserToInitial
} = userSlice.actions;

export const userSelector = state => state.user;

export default userSlice.reducer;

export function signingIn(){
    return async (dispatch)  => {
        firebase.auth().onAuthStateChanged((user)=> {
            if(user){
                dispatch(setSignIn())
            } else {
                console.log("User not signed In")
            }
        })
    }
}

export function fetchUser(){
    return async (dispatch) => {
        dispatch(setLoading())

        try{
            firebase
            .auth()
            .onAuthStateChanged((user) => {
                (!user) ? (console.log('user is signed Out'))
                : dispatch(setUser(user.uid));
            })
        } catch (error) {
            dispatch(setUserFailed(error));
        }
    }
}

export function clearUser() {
    return async (dispatch) => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(setUserToInitial())
            })
        
    }
}

