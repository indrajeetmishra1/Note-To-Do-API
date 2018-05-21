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

//---------------Fetching the all data---------------------

const db=client.db('NoteToDoApp');

db.collection('todos').find().toArray().then((data)=>{

console.log('Todos');
console.log(JSON.stringify(data));


},(err)=>{console.log('unable to find the data',err)});

//----------------Fetching single data-------------------------------


// const db=client.db('NoteToDoApp');

// db.collection('todos').find({_id:new ObjectID('5af9791236fdaf2068801189')}).toArray().then((data)=>{

// console.log('Todos');
// console.log(JSON.stringify(data));


// },(err)=>{console.log('unable to find the data',err)});

//--------------------------Counting matching data----------------


// const db=client.db('NoteToDoApp');

// db.collection('todos').find({completed:false}).count().then((data)=>{

// console.log('Todos');
// console.log(`Total count is ${JSON.stringify(data)}`);


// },(err)=>{console.log('unable to find the data',err)});


// client.close();
 });