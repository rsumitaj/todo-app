const express = require('express');
const port = 8000;

const db=require("./config/mongoose");

const Task = require('./models/tasks');

const app = express();


// setup view engine 

app.set('view engine','ejs');
app.set('views','./views');

// middleware

app.use(express.urlencoded());

app.use(express.static('assets'));


app.get('/',function(req,res){

  Task.find({},function(err,tasks){
    if(err){
      console.log("error in fetching data from db");
      return;
    }

    return res.render('home',{
      title:"TODO App",
      task_list : tasks
    })
  
  });

});

// adding task
app.post('/add-task',function(req,res){

  Task.create({
    description:req.body.description,
    category:req.body.category,
    date:req.body.date
  },function(err,newTask){
    if(err){
      console.log('err in creating tasks');
      return;
    }
    return res.redirect('back');

  });
});

// deleting task
app.post("/remove-task/",function(req,res){
  
  let id = req.body.checkbox;

  Task.findByIdAndDelete(id,function(err){
    if(err){
      console.log('err in deleting from db');
      return;
    }

    return res.redirect('back');

  });

});


app.listen(port,function(err){
  if(err){
    console.log(`Error : ${err}`);
  }
  console.log(`server is running at port: ${port}`);
});