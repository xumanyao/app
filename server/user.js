const express = require('express');
const Router = express.Router();
const model = require('./model');
const utility = require('utility');
const User = model.getModel('user');
const filter = {password:0,__v:0};

Router.get('/list',(req,res)=>{
    User.find({},(err,doc) => {
        return res.json(doc)
    })
});
Router.get("/info",function (req,res){
    // User.remove({},()=>{}) // 清空数据库
    const {userid} = req.cookies;
    User.findOne({_id:userid},filter,(err,doc)=>{     // 返回登陆状态flag，1为失败，未登陆，0为成功，已登陆。
        if (err) {
            return res.json({code:'1',msg:'服务端开小差了...'})
        }
        if (!doc) {
            return res.json({code:'1',msg:'您的登陆状态有误！'})
        }
        return res.json({code:'0',data:doc})
    })
});
Router.post('/regist',function(req,res){
    const {userName,password,type} = req.body;
    User.findOne({userName},(err,doc)=>{
        if (doc) {
            return res.json({code:'1',msg:'用户名不可用'})
        }
        const userModel = new User({userName,password:incode(password),type});
        userModel.save((err,doc)=>{
            if (err) {
                res.json({code:'1',msg:'注册失败！'})
            }
            const {userName,type,_id} = doc;
            res.cookie('userid',_id);
            return res.json({code:'0',data:{userName,type,_id}})
        });
    })
});
Router.post('/login',function (req, res) {
    const {userName,password} = req.body;
    User.findOne({userName},(err,doc)=>{
        if (!doc) {
            return res.json({code:'1',msg:'用户不存在！'});
        }
    });
    User.findOne({userName,password:incode(password)},filter,(err,doc)=>{
        if (err) {
            return res.json({code:'1',msg:'服务端错误！'})
        }
        if (!doc) {
            return res.json({code:'1',msg:'密码错误！'});
        }else {
            res.cookie('userid',doc._id);
            return res.json({code:'0',data:doc})
        }
    })
});

function incode(password){
    const salt = 'huihUIGHIUHk@123.23ERJoeipw++~~';
    return utility.md5(utility.md5(password+salt));
}

module.exports = Router;