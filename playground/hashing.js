// const {SHA256}=require('crypto-js');
// var msg="Hello Indra";

// var hashvalue=SHA256(msg);
// // console.log(msg);
// // console.log(hashvalue.toString());

// var objdata={id:4};
// var token={
//     objdata,
//     hash:SHA256(JSON.stringify(objdata)).toString()
// }

// console.log(token.hash);
// console.log(SHA256(objdata).toString())

const jwt=require('jsonwebtoken');

var data={id:10};

var Token=jwt.sign(data,'123');
console.log(Token);
console.log(jwt.verify(Token,'123'));