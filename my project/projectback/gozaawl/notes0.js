const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const connectionURL = "mongodb://127.0.0.1:27017"
const dbName = "userbankdata" //asm aldatabase
MongoClient.connect(connectionURL, {useNewUrlParser:true}, (err,client)=>{
    if(err) console.log('db not connected')
    const db = client.db(dbName)
    console.log('connected')
    db.collection('user'/* asm altable */).insertMany/* insertOne */([
        {name:'George',
        age:24,email:'George@gmail.com',
        password:123456789},{name:"Badr",age:22,email:'George@gmail.com',password:123456789}])   
    // db.collection('user'/* asm altable */).find({name:"George"}).toArray((arr,data)=>{
    //     console.log(data)
    // })         
    // db.collection('user'/* asm altable */).findOne({_id:new ObjectID('6002cfcd4884d525701261f4') }, (arr, data) => {
    //     console.log(data)
    // })
})