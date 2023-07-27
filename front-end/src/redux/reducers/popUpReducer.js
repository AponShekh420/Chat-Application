import { createSlice } from '@reduxjs/toolkit';

const popUpReducer = createSlice({
    name: "popUp",
    initialState: {
        togglePopUp: true,
        name: '',
        email: '',
    },
    reducers: {
        openPopUp: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.togglePopUp = true
        },
        closePopUp: (state) => {
            state.name = "";
            state.email = "";
            state.togglePopUp = false;
        }
    }
})


export const {openPopUp, closePopUp} = popUpReducer.actions;

export default popUpReducer.reducer;