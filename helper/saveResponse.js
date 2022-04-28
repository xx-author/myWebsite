const req = require('express/lib/request');
const db = require('../config/connection');

module.exports = {
    loadMessage: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection('messages').insertOne(data).then(() => {
                resolve()
            })
        })
    },

    loginCheck: (data) => {
        let response = {}
        return new Promise(async(resolve, reject) => {
            email = await db.get().collection('admins').findOne({ email: data.email })
            if (email) {
                console.log('yes email')
                body = await db.get().collection('admins').findOne({ password: data.password })
                if (body.password == data.password) {
                    response.status = true
                    response.user = email
                    resolve(response)
                } else {
                    response.status = false
                    response.message = "Wrong Password"

                }

            } else {
                console.log('no email')
                response.status = false
                response.message = "Invalid Email id!"
                resolve(response)
            }

        })
    
    },

    sample: (data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('admins').insertOne(data).then(()=>{
                resolve()
            })
        })
    },

    getMessages:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection('messages').find().toArray()
            resolve(data)
        })
    }
}