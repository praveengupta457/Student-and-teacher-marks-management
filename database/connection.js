const mongoose= require('mongoose');

const mongodb = mongoose.connect('mongodb://127.0.0.1:27017/Student_Teachers_Database')
.then(()=>console.log("databse connected"))
.catch((error)=>console.log('database not connected'+error));
module.exports=mongodb;