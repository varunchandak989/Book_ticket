import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user');

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData: storedUser ? JSON.parse(storedUser) : null
    },
    reducers : {
        setUserData: (state, action)=>{
            state.userData = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userData = null;
            localStorage.removeItem('user');
        }
    }
})

export const {setUserData,logout} = userSlice.actions
export default userSlice.reducer