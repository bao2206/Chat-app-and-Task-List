import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "./Firebase"
import {toastErr,toastInfor} from "../utils/toast";
import catchErr from '../utils/catchErr';
import { setLoadingType, authDataType, userType } from '../Types';
import { NavigateFunction } from 'react-router';
import {doc, setDoc, serverTimestamp, getDoc, updateDoc} from "firebase/firestore"
import {db} from "./Firebase"
import {defaultUser} from "../Redux/userSlice";
import {setUser} from "../Redux/userSlice";
import { AppDispatch } from '../Redux/store';
import convertTime from '../utils/convertTime';
import AvatarGenerator from '../utils/avatarGenerator';

export const BE_signup = (data: authDataType, setLoading: setLoadingType,
    reset:() => void, 
    goTo: NavigateFunction,
    dispatch: AppDispatch
) => {
    const {email, password, confirmPassword} = data;
    setLoading(true);
    // dang ky tai khoan
    if(email && password){
        if(password === confirmPassword){
            createUserWithEmailAndPassword(auth, email,password).then(async ({user}) => {
                const imgLink =  AvatarGenerator(user.email?.split("@")[0])
                const userInfo = await addUserToCollection(user.uid, user.email || "", user.email?.split("@")[0] || "", imgLink);
                console.log(user);
                //TODO: setUserInfor in store and local storage
                // set user to store
                dispatch(setUser(userInfo));
                setLoading(false);
                reset();
                // toastInfor("Successfully signed up");
                goTo("/dashboard");
            }).catch(err => {
                // console.log(err.code);
                // console.log(err.message);
                catchErr(err);
                setLoading(false);
            });   
        } else {
            toastErr("Password must match with confirm password",setLoading);
        }
    } else {
        // console.log("Field should not be empty")
        toastErr("Field should not be empty", setLoading);
    }
   
};

export const BE_signin = (
    data:authDataType,
    setLoading : setLoadingType,
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch
) => {
    const {email, password} = data;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then(async({user}) => {
        await updateUserInfo({id: user.uid, isOnline: true})
        const userInfor = await getUserInfor(user.uid);
        console.log(user);
        //set user in store
        dispatch(setUser(userInfor));
        setLoading(false);
        reset();
        goTo("/dashboard")
    }).catch((err) => {
        catchErr(err);
        setLoading(false);
    })
}


// collection names:
const userCollection = "users";
const taskCollection = "tasks";
const taskListCollection = "taskList";
const chatsCollection = "chats";
// thêm người dùng vào db 
export const addUserToCollection = async(uid: string, email: string, username: string, img: string) =>{
    await setDoc(doc(db, userCollection, uid), {
      isOnline: true,
      img,
      username,
      email,
      creationTime: serverTimestamp(),
      lastSeen: serverTimestamp(),
      bio: `Hi my name ${username}`
    });
    return getUserInfor(uid);
}
// lấy thông tin người dùng
const getUserInfor = async(id: string):Promise<userType> => {
    const userRef = doc(db, userCollection, id);
    const user = await getDoc(userRef);
    if(user.exists()) {
        const {isOnline, img, username, email, creationTime, lastseen, bio} = user.data();
        return {
            id: user.id,
            img,
            isOnline,
            username, 
            email, 
            creationTime: creationTime ? convertTime(creationTime.toDate()) :"no date yet: userinfo",
            lastseen: lastseen ? convertTime(lastseen.toDate()) : "no date yet: userinfo",
            bio,
        }
    } else {
        toastErr("User not found");
        return defaultUser;
    }
}


// cập nhật thông tin người dùng
const updateUserInfo = async(
    {
        id,
        username,
        img,
        isOnline,
        isOffline,
    }: {
        id ?: string;
        username ?: string;
        img?: string;
        isOnline ?: boolean;
        isOffline ?: boolean;
    } )=>{
    if(!id){
        id =  getStorageUser().id;
    }
    if(id){
        await updateDoc(doc(db, userCollection, id), {
            ...(username && {username}),
            ...(img && {img}),
            ...(isOnline && {isOnline}),
            ...(isOffline && {isOnline:false}),
            lastseen: serverTimestamp()
        });
    }
} 

const getStorageUser = () => {
    const usr = localStorage.getItem("superhero_user")
    if(usr) return JSON.parse(usr);
    else return null;
}
  