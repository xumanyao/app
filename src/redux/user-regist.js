import axios from 'axios';

const ERR_Msg = 'ERR_Msg';
const REGIST_SUCCESS = 'REGIST_SUCCESS';
const initState = {
    userName:'',
    password:'',
    rePassword: '',
    type:'',
    msg:'',
    isAuth:''
};

function errMsg(message) {
    return { message, type: ERR_Msg }
}

function success(data) {
    return { data, type:REGIST_SUCCESS}
}

export function user(state=initState,action) {
    switch (action.type) {
        case REGIST_SUCCESS:
            return {...state,msg:'',isAuth:true,...action.data};
        case ERR_Msg:
            return {...state,msg:action.message,isAuth:false};
        default:
            return {state}
    }
}

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
                if (res.status === 200 && res.data.code === 0) {
                    return dispatch(success({userName,password,type}))
                } else {
                    return dispatch(errMsg(res.data.msg))
                }
            })
    }
}