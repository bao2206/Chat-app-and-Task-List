import {createSlice} from "@reduxjs/toolkit";
import { userType } from "../Types";

export const defaultUser: userType = {
    id: "",
    img: "",
    isOnline: false,
    username: "",
    email: "",
    creationTime: "",
    lastseen: "",
    bio: "",
}

const initialState = {
    // user:[],
    currentUser: defaultUser,
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action) =>{
            const user = action.payload;

            // store user in local storage
            localStorage.setItem("superhero_user", JSON.stringify(user));
            // console.log(action);
            state.currentUser = user;
        },
        setUsers:(state, action) =>{

        }
    }
    
})

export const {setUser, setUsers} = userSlice.actions;
export default userSlice.reducer;