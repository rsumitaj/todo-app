const express = require('express');
const port = 8000;

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
    task:"todo app",
    category:"WORK"
  },
  {
    task:"gym",
    category:"WORKOUT"
  }
];

app.get('/',function(req,res){
  return res.render('home',{
    title:"TODO App",
    task_list : tasks
  })
});


app.listen(port,function(err){
  if(err){
    console.log(`Error : ${err}`);
  }
  console.log(`server is running at port: ${port}`);
});