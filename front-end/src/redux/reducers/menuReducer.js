import { createSlice } from '@reduxjs/toolkit';

const menuReducer = createSlice({
    name: 'menutoggle',
    initialState: {
        menuToggle: false,
    },
    reducers: {
        menuOpen: (state) => {
            state.menuToggle = true;
        },
        menuClose: (state) => {
            state.menuToggle = false;
        }
    }
})



export const {menuOpen, menuClose} = menuReducer.actions;

export default menuReducer.reducer;