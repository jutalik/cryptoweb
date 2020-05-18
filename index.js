const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require('./models/User')

const config =require('./config/key')

//applaction/x-www-form=urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//appication/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('몽고디비 연결 성공'))
  .catch(err => console.log(err))






app.get('/',(req,res) => res.send('hello web!!! '))



//회원가입
app.post('/register', (req,res) =>{
    //회원가입시 필요한 정보들은 클라이언트에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    //새로운 객체 생성
    const user = new User(req.body)

    //객체 정보들 세이브, 성공시 json 형식의 success 값을 ture로 반환 
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))