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

//------------------------ data insertion -----------------------------
var db=client.db('NoteToDoApp');

db.collection('todos').insertOne({text:'something to do',completed:false},(err,result)=>{

if(err)
{
    return console.log("Data not inserted successfully");
}

console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));

console.log(`data inserted successfully with the following result : ${JSON.stringify(result.ops)}`);

});

// client.close();
 });