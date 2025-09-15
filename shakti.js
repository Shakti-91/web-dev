const express =require("express");
const jwt=require("jsonwebtoken");
const path = require("path");
const app=express();
app.use(express.json());
const JWT_SECRET="lalalalalalla";
const user=[];
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "lalalal", "index.html"));
})
app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    user.push({
        username,
        password
    })
    res.json({
        message:"sign up"
    });
});
function authanication(req,res,next){
    
    const founduser=user.find(u=>u.username===req.body.username && u.password===req.body.password);
    
    if(!founduser) return res.status(401).send("Invalid username or password");
    else {
        
        req.token=jwt.sign({
           username: founduser.username,
            password:founduser.password
        },JWT_SECRET);
        
        next();
    }
}
app.post("/signin",authanication,(req,res)=>{
   const token=req.token;
   res.json({
    token
   });
})

app.get("/me",function (req,res){
   const authHeader = req.headers["authorization"];
if (!authHeader) return res.status(401).json({ message: "No token provided" });

// Remove "Bearer " from the string
const token = authHeader.split(" ")[1]; 

try {
  const verified = jwt.verify(token, JWT_SECRET);
  res.json({ username: verified.username });
} catch (err) {
  res.status(401).json({ message: "Invalid token" });
}

    
})

app.listen(3000);