import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    token : Cookies.get('token'),
    isLogin : Boolean(Cookies.get('token'))
}

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setToken : (state, action) =>{
            Cookies.set('token', action.payload, {expires: 7})
            // state.token = action.payload
            state.token = Cookies.get('token')
            state.isLogin = true
        },
        removeToken : (state) =>{
            Cookies.remove('token')
            state.token = Cookies.get('token'),
            state.isLogin = false

        },


    }
})

export const{setToken,removeToken } = loginSlice.actions
export default loginSlice.reducer