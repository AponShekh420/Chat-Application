import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";
import popUpReducer from "./reducers/popUpReducer";

const store = configureStore({
    reducer: {
        sidebarMenu: menuReducer,
        popUp: popUpReducer,
    }
})

export default store;