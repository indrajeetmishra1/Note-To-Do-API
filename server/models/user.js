var mongoose = require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

const bcrypt=require('bcrypt');


var UserSchema= new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }

  },
  Password:{type:String,required:true,minlength:6},
  Tokens:[{

    access:{type:String,required:true},
    token:{type:String,required:true}

  }]


});


UserSchema.methods.toJSON=function()
  {
    var user=this;

    var userobj=user.toObject();
    
    return _.pick(userobj,['Email','_id'])

  }

  UserSchema.methods.deleteToken=function(token){
var user=this;
console.log(user);

return user.update({
$pull:{

  Tokens:{
    token:token
  }
}


});



  }

UserSchema.methods.GenerateAuthToken=function(){

  var user=this;
  var access='Auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.Tokens.push({access,token});
  //user.Tokens=user.Tokens.concat([{access,token}]);
  
  console.log(user);
  return user.save().then(()=>{
    //console.log('Data has been saved successfully in database')
    return token
  })
  
  
  }

  UserSchema.statics.findbyEmail=function(email,Password){

    var user=this;
    return user.findOne({Email:email}).then((user)=>{

      if(!user)
      {
        return Promise.reject();
      }

      return new Promise((resolve,reject)=>{
        bcrypt.compare(Password,user.Password,(err,result)=>{
   
          console.log(result);
           //promise= new Promise (resolve,reject);
           if(result)
           {
               resolve(user);
           }
           else{
            reject();
           }
         
    
          });
       

      });
    
   });
  }
 
  UserSchema.statics.findbyToken=function(token){

    var User=this;
    var decoded;
    try{

      decoded=jwt.verify(token,'abc123');

    }
    catch(err)
    {

      return Promise.reject();

    }

    return User.findOne(

      {
        '_id':decoded._id,
        'Tokens.token':token,
        'Tokens.access':'Auth'
      }
    )

  }

UserSchema.pre('save',function(next){

  var user=this;

if(user.isModified('Password'))
{

  bcrypt.genSalt(10,(err,salt)=>{

bcrypt.hash(user.Password,salt,(err,hash)=>{

console.log(hash);
  user.Password=hash;
  next();


});

  });
 // next();
}
else{
next();
}

  });

  var User = mongoose.model('User',UserSchema)
module.exports = {User}
