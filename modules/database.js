const { type } = require('os')
const sequelize=require('sequelize')
const db=new sequelize({
         database:'dbproject',
         username:'root',
         password:'shukl@',
         host:'localhost',
         dialect:'mysql'
})


const user=db.define('user',{
   

    name:{
     type:sequelize.DataTypes.STRING(34),
     allowNull:false,
    },
    username:{
        type:sequelize.DataTypes.STRING(23),
        unique:true,
        primaryKey:true,
        allowNull:false
    },
    password:{
        type:sequelize.DataTypes.STRING(44),
        allowNull:false,
    }
})

module.exports={
    db,
    user
}


