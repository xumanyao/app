import axios from 'axios';
import {redirectToPath} from "../util";

const ERR_Msg = 'ERR_Msg';
const REGIST_SUCCESS = 'REGIST_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    userName:'',
    type:'',
    msg:'',
    isAuth:'',
    redirectTo:''
};
 // action creator 用于返回各类action，将在reducer中根据所给到的action进行操作
function errMsg(message) {
    return { message, type: ERR_Msg }
}

function Regist_Success(data) {
    return { data, type:REGIST_SUCCESS}
}

function Login_Success(data) {
    return {data,type:LOGIN_SUCCESS}
}

// reducer 根据给到的action对状态进行更新
export function user(state=initState,action) {
    switch (action.type) {
        case REGIST_SUCCESS:
            return {...state,redirectTo:redirectToPath(action.data),msg:'',isAuth:true,...action.data};
        case ERR_Msg:
            return {...state,msg:action.message,isAuth:false};
        case LOGIN_SUCCESS:
            return {...state,redirectTo:redirectToPath(action.data),msg:'',isAuth:true,...action.data};
        case LOAD_DATA:
            return {...state,...action.data};
        default:
            return {state}
    }
}

// dispatch 外部将调用这个函数，触发reducer
export function regist({userName,password,rePassword,type}) {
    if (!userName || !password){
        return errMsg('用户名或密码不能为空！')
    }
    if (password !== rePassword) {
        return errMsg('两次输入密码不同！')
    }
    return dispatch=>{
        axios.post('/user/regist',{userName,password,type})
            .then((res)=>{
                if (res.status === 200 && res.data.code === '0') {
                    return dispatch(Regist_Success(res.data.data));
                } else {
                    return dispatch(errMsg(res.data.msg))
                }
            })
    }
}

export function login({userName,password}) {
    if (!userName) {
        return errMsg('用户名不可为空！');
    }
    if (!password) {
        return errMsg('请输入密码！');
    }
    return dispatch => {
        axios.post('/user/login',{userName,password})
            .then((res)=>{
                if (res.status === 200 && res.data.code === '0') {
                    return dispatch(Login_Success(res.data.data))
                } else {
                    return dispatch(errMsg(res.data.msg))
                }
            })
    }
}
export function loadData(data) {
    return {type:LOAD_DATA,data}
}