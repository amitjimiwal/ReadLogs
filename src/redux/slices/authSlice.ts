import { createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";
interface AuthState {
     status: boolean;
     userData?: Models.User<Models.Preferences>  ;
}
const initialState:AuthState = {
     status: true,
     userData: undefined
};
const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          //login
          login: (state, action) => {
               state.status = true;
               state.userData = action.payload;
          },
          //logout , action is not required in this case 
          logout: (state) => {
               state.status = false;
               state.userData = undefined;
          },
     },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

