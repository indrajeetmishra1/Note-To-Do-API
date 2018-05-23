var mongoose = require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');


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

var User = mongoose.model('User',UserSchema)

module.exports = {User}
