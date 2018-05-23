

require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _=require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authentication}=require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res)=>{

var id=req.params.id;
if(!ObjectID.isValid(id))
{
  return res.status(404).send({Message:"ID is not valid"})
}

console.log(id);

var body=_.pick(req.body,['text','completed']);



if(_.isBoolean(body.completed) && body.completed)
{
  body.completedAt=new Date().getTime();
}

else{
  body.completed=false;
  body.completedAt=null;
}

Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{

if(!todo)
{
 return res.status(404).send({Message:"ID is not found"});
}

res.status(200).send(todo);


}).catch(err=>res.status(400).send(err));


});

app.post('/user',(req,res)=>{

  var body=_.pick(req.body,['Email','Password']);
  
  var user=new User(body);
  //console.log(user);

  user.save().then((user)=>
       {
        // res.status(200).send(doc)
       return user.GenerateAuthToken()
        }).then((token)=>{
          res.header('x-auth',token).send(user);
        })
        .catch(err=>res.status(400).send(err));
});



app.get('/user/me',authentication,(req,res)=>{

res.status(400).send(req.user);

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
