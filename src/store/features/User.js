import { createSlice } from '@reduxjs/toolkit'


export const user = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, {payload}) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            if (payload) {
                state.isAuthenticated = payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = user.actions

export default user.reducer