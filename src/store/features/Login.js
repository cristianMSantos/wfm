import { createSlice } from '@reduxjs/toolkit'


export const login = createSlice({
    name: 'login',
    initialState: {
        isAuthenticated: localStorage.getItem('token'),
    },
    reducers: {
        setLogin: (state, {payload}) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            if (payload) {
                localStorage.setItem('token', payload)
                state.isAuthenticated = localStorage.getItem('token')
            }
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