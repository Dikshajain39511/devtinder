const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello from server")
})

app.use("/namaste",(req,res)=>{
    res.send("Namaste from server")
})
app.listen(3000,()=>{
    console.log("Server is successfully listening to port 3000");
});
