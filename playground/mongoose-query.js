const {ObjectID}=require('mongodb');

const {mongoose}=require ('./../Server/db/mongoose');
const {todo}=require ('./../Server/db/module/todo');

var id='6agda9eddab2f32910aacc6f';

if(!ObjectID.isValid(id))
{
    console.log('Id is not valid');
}

todo.find({_id:id}).then((doc)=>{console.log(doc)},(err)=>{console.log(err)});
todo.findOne({_id:id}).then((doc)=>{console.log(doc)},(err)=>{console.log(err)});
todo.findById(id).
then((doc)=>
{
    if(!doc)
    {
       return console.log('Doc not found');
    }
    console.log(doc)
}).catch((err)=>{console.log(err)});