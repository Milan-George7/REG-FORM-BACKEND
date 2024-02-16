const mongoos=require('mongoose')

const studentsSchema=new mongoos.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateofBirth:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    }
})

const students=mongoos.model("students",studentsSchema)

module.exports=students