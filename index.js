const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const { ifError } = require('assert');


app.set("view engine","ejs");//ADDING THE EJS FILE
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>
    {
        fs.readdir('./files',(err,files)=>
        {
            res.render("index",{files:files});//{files:files}IT MEANS WE SENDING THE FILE OF FILES TO THE EJS FILE
        })
        
    })
app.get("/file/:filename",(req,res)=>
{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,filedata)=>
    {
        res.render("show",{filename:req.params.filename,filedata:filedata});
        console.log("ejs file is loaded");

    })

});
app.get("/edit/:filename",(req,res)=>
    {
        res.render("edit",{filename:req.params.filename});
        console.log("rander");
    
    });
app.post("/create",(req,res)=>
    {
        fs.writeFile(`./files/${req.body.title}.txt`,req.body.details,(err)=>
        {
            if(err){
                console.log(err);
                res.send("some error")
            }
            else{
                console.log("files is saved");
                res.redirect("/");
            }
        })
            
    });
app.post("/edit",(req,res)=>
{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}.txt`,(err)=>
    {
        if(err){
            console.log(err);
        }
        else{
            console.log("file is renamed");
            res.redirect("/");
            }
    })
});
            
app.listen(3000,()=>
{
    console.log("server is running on port 3000");
})