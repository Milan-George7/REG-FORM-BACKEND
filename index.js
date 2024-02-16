require('dotenv').config()
const express=require('express')
const cors=require('cors')
const regServer=express()
const mongoose=require('mongoose')
const router = express.Router()
const students=require('./registerModel')
regServer.use(cors())
regServer.use(express.json())
regServer.use(router)


const connectionString=process.env.db_connection
mongoose.connect(connectionString).then(()=>{
    console.log("MonogoDB Atlas Connected with regServer!!");
}
).catch((err)=>{
    console.log("MongoDB connection failed!!!",err);
})

const PORT=3000 || process.env.PORT

regServer.listen(PORT,()=>{
    console.log(`Register started at port:${PORT}`);
})

regServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Register Server running  !!! Waiting For Client Request...</h1>")
})
// add student
router.post('/addStudent',async(req,res)=>{
    const {firstName,lastName,address,email,gender,mobile,password,dateofBirth,course}=req.body
    console.log(req.body);
    try{
        const existingStudent=await students.findOne({email})
        if(existingStudent){
            res.status(406).json("This Student is Already Existed!!")
        }else{
            const newStudent= students({
                firstName,lastName,address,email,gender,mobile,password,dateofBirth,course
            })
            await newStudent.save()
            res.status(200).json(newStudent)
        }
    }catch(err){
        res.status(401).json(err)
    }
})
// Get All Students
router.get('/getAllStudents',async(req,res)=>{
    try{
       const allStudents=await students.find()
       if(allStudents){
        res.status(200).json(allStudents)
       } else{
        res.status(406).json("No Students Found!!!")
       }
    }catch(err){
        res.status(401).json(err)
    }
})
