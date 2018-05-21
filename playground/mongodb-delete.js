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

//---------------Delete one data---------------------

// const db=client.db('NoteToDoApp');

// db.collection('todos').deleteOne({_id:new ObjectID("5af98c35e29423db43726beb")}).then((result)=>{

// console.log('data has been deleted successfully');
// //console.log(`deleted data is ${JSON.stringify(result.ops)}`);


// },(err)=>{console.log('Data doesnt deleted some error occured')}).catch(err=>{console.log(`error occured ${err}`)});



//----------------delete single data-------------------------------


//const db=client.db('NoteToDoApp');

//db.collection('todos').findOneAndDelete({text:"something to do"}).then((result)=>console.log(result));


//--------------------------delete matching data----------------


const db=client.db('NoteToDoApp');

db.collection('todos').deleteMany({text:"something to do"}).then(result=>console.log(result));

// client.close();
 });