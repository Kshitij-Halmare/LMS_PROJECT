import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./CartSlice.jsx"
const store=configureStore({
    reducer:{
        Cart:CartSlice
    }
})
export default store;