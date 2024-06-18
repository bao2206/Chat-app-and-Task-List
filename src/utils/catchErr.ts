import { toastErr, toastInfor } from "./toast";

const catchErr = (err:{code?:string}) => {
    const {code} = err;
    if(code === "auth/invalid-email"){
        toastErr("Invalid email address");
    } else if(code === "auth/weak-password"){
        toastErr("Password should be at least 6 characters");
    } else if(code === "auth/email-already-in-use"){
        toastErr("Email already exists");
    } else if(code === "auth/user-not-found"){
        toastErr("User not found");
    } else if(code === "auth/wrong-password"){
        toastErr("Wrong password");
    } else if(code === "auth/requires-recent-login") {
        //hết phiên đăng nhập
        toastInfor("Logout");
    } else if(code === "unavailable"){
        toastErr("Firebase client is offline");
    } else if(code === "auth/invalid-login-credentials"){
        toastErr("Invalid credentials");
    } else {
        toastErr("An error occured");
    }
    console.log(err, err.code);
}
export default catchErr;