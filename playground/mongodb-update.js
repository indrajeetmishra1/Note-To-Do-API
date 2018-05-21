// const mongoclient=require ('mongodb').MongoClient;
// const Objectid=require ('mongodb').ObjectID;

const {MongoClient,ObjectID}=require('mongodb');

//console.log(new ObjectID());

// var user={name:'Indrajeet Mishra',collage:'KIIT'};

// var {collage}=user;
// console.log(collage);

MongoClient.connect('mongodb://127.0.0.1:27017/NoteToDoApp',(err,client)=>{


if(err)
{
    return console.log('Cannot connect to the MongoDB Server');
}

console.log('Connection successfull');

//---------------Update one data---------------------

const db=client.db('NoteToDoApp');

//db.collection('todos').update({_id:new ObjectID('5af993e3e29423db43726dae')},{text:"Hey i am updated"}).then(result=>console.log(result));

db.collection('todos').findOneAndUpdate({_id:new ObjectID('5af993e3e29423db43726dae')},{$set:{text:"Hey i am updated once again to check incrimetal data"},$inc:{age:30}},{returnOriginal:false}).then(result=>console.log(result));

// client.close();
 });