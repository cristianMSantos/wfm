import { createSlice } from '@reduxjs/toolkit'
import api from '../../axios'

export const login = createSlice({
    name: 'login',
    initialState: {
        user: null,
        message: null,
        isAuthenticated: localStorage.getItem('token'),
    },
    reducers: {
        setLogin: async (state, {payload}) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.

            const options = {
                url: `/auth/login`,
                method: 'POST',
                data: {
                    loginPassword: payload.password,
                    loginMatricula: payload.matricula,
                },
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
            return await api(options)
                .then((response) => {
                    if(response.data){
                        localStorage.setItem('token', response.data.access_token)
                        state.isAuthenticated = localStorage.getItem('token')
                    }
                    state.user = response.data
                    state.message = response
                })
                .catch((error) => {
                    state.message = error.response
                })

        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLogin, decrement, incrementByAmount } = login.actions

export default login.reducer