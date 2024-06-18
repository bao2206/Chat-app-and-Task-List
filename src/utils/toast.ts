import {toast} from "react-toastify";
import { setLoadingType } from "../Types";


export const toastErr = (msg: string, setLoading?:setLoadingType) => {
    toast.error(msg);
    if(setLoading) setLoading(false) ;   
}

export const toastSuccess = (msg: string, setLoading?:setLoadingType) => {
    toast.success(msg);
    //nếu setLoading có giá trị true thì gán cho nó giá trị false
    if(setLoading) setLoading(false);
}

export const toastWarnings = (msg: string, setLoading?:setLoadingType) => {
    toast.warning(msg);
    if(setLoading) setLoading(false);
}

export const toastInfor = (msg: string, setLoading?:setLoadingType) =>{
    toast.info(msg);
    if(setLoading) setLoading(false);
}
