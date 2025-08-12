import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import methodOverride from 'method-override';
const app = express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static("public"))
 
app.get("/",(req,res)=>{
    res.render("index.ejs",{thewholdata:Data})
})

 let Data=[
       
 ]

 let id=0;

 

app.post("/Post",(req,res)=>{
    const {Title,Description}=req.body
    
    
    let update={
           Title,
            Description,
            idtask:id++
    }

     Data=[update,...Data,]
    console.log(Title,Description,update.idtask,Data[0])
  
    res.render("index.ejs",{thewholdata:Data})
})  
   
app.delete("/posts/:id",(req,res)=>{
 const id=parseInt(req.params.id)
 Data=Data.filter((t)=> t.idtask !==id)
 res.redirect("/")
})

app.get("/Blogpost",(req,res)=>{
    res.render("Blogpost.ejs")
})

app.post("/update",(req,res)=>{
  const id=parseInt(req.body.idtask)
  const post=Data.find((c)=> c.idtask === id)
  res.render("Update.ejs",post)
   
     
})

app.patch("/Update/:id",(req,res)=>{
  const id=parseInt(req.params.id)
  const post=Data.find((c)=> c.idtask === id)
if (post) {
    post.Title = req.body.Title;
    post.Description = req.body.Description;
}

res.redirect("/");
})

app.listen(port,()=>{
    console.log("server is running")
})

