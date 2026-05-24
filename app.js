const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
var methodOverride = require('method-override');

let port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [
    {
        Id: uuidv4(),
        username: "sunil",
        content: "I Love coding"
    },
    {
        Id: uuidv4(),
        username: "ajeet",
        content: "passionate coder"
    },
    {
        Id: uuidv4(),
        username: "rohan",
        content: "hello world to code"
    },
    {
        Id: uuidv4(),
        username: "sumit",
        content: "greting everyone"
    }
]


app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})

app.get("/", (req, res) => {
    res.render('home.ejs', { posts });
})

//route for new user with content
app.get("/post/new", (req, res) => {
    res.render("form.ejs");
})

app.post("/post/new", (req, res) => {
    let { username, content } = req.body;
    console.log(` username=${username},content= ${content}`);
    let newpost = {
        Id: uuidv4(),
        username,
        content
    }
    posts.push(newpost);
    res.redirect("/");
})

//route for edit
app.get("/post/edit/:Id", (req, res) => {
    let {Id}=req.params;
    let post = posts.find(p => p.Id == Id);
    res.render("editpost.ejs",{post});
})

app.patch("/post/edit/:Id",(req,res)=>{
let {Id}=req.params;
let {content}=req.body;
console.log(content);
 let post = posts.find(p => p.Id == Id);
post.content=content;
res.redirect("/");
})




//route for delete the posts
app.delete("/post/delete", (req, res) => {


})

// route for student detailed view
app.get("/post/:Id", (req, res) => {
    let { Id } = req.params;
    let post = posts.find(p => p.Id == Id);
    console.log(`Id=${Id}, and detail = ${post}`);
    res.render("detailstudent.ejs", { post });
})


app.get("/:name/:Id", (req, res) => { // path parameters
    let { name, Id } = req.params;    //           <---------------
    console.log(`tha name is ${name}, And Id is ${Id}`);
    res.send(`the name is ${name}, And Id is ${Id}`);
})

app.get("/search", (req, res) => { // query strings
    let { q, r } = req.query;    //  <-----------------
    console.log(`You search for ${q} and ${r}`);
    console.log(req.query);
    res.send(`You search for ${q} and ${r}`);
})
