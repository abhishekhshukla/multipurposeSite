const express=require('express')
const app=express()
const {db,user}=require('./modules/database')
const socketio=require('socket.io')
const expresSession=require('express-session')
const http=require('http')
const { session } = require('passport')
const { urlencoded } = require('express')
const server=http.createServer(app)
const io=socketio(server)

const PORT=process.env.PORT||8989
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))
app.use('public',express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(expresSession({
    resave:true,
    saveUninitialized:true,
    secret:"adasasdasdasdasdasdasd",
   
    
}))

app.get('/',(req,res)=>{
    console.log(session.id)
    res.render('index')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async (req,res)=>{
    if ((!req.body.username) || (!req.body.name) || (!req.body.password))
      {
          res.status(400).render('signup',{error:'Please Fill All Options'})
      }
     

      const users =await user.create({
          username:req.body.username,
          name:req.body.name,
          password:req.body.password
      })

       
         // req.session.user=users.username;
      res.status(200).render('index')

})

db.sync()
.then(function(){
    server.listen(PORT,function(){
        console.log(`server started on http://localhost:${PORT}`)
    })
    console.log("Done")
})
.catch(function(err){
    console.log(err)
})

