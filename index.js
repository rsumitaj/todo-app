const express = require('express');
const port = 8000;

const db=require("./config/mongoose");

const app = express();


// setup view engine 

app.set('view engine','ejs');
app.set('views','./views');

// middleware

app.use(express.urlencoded());

app.use(express.static('assets'));

// tasks

var tasks = [
  {
    description:"todo app",
    category:"WORK",
    date:"2021-06-06"
  },
  {
    description:"gym",
    category:"WORKOUT",
    date:"2021-06-05"
  }
];

app.get('/',function(req,res){
  return res.render('home',{
    title:"TODO App",
    task_list : tasks
  })
});

app.post('/add-task',function(req,res){
  tasks.push(req.body);
  return res.redirect('back');
});

app.get('/remove-task',function(req,res){
  let description =req.query.checkbox;
  let taskIndex = tasks.findIndex(task => task.checkbox == description);

  if(taskIndex!=-1){
    tasks.splice(taskIndex,1);
  }
  return res.redirect('back');
});


app.listen(port,function(err){
  if(err){
    console.log(`Error : ${err}`);
  }
  console.log(`server is running at port: ${port}`);
});