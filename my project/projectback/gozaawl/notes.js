// const mongodb = require('mongodb')
// const mongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
             /* ===== */
const {MongoClient,ObjectID}= require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const dbName = "georgedata" //asm aldatabase
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log('db not connected')
    const db = client.db(dbName)
    console.log('connected')
    // db.collection('user'/* asm altable */).insertMany/* insertOne */([{name:"George",age:24},{name:"Badr",age:22}])   
    /* 1 */
    // db.collection('user'/* asm altable */).find({name:"George"}).toArray((arr,data)=>{
    //     if(arr) return console.log('error')
    //     console.log(data)
    // })   
    /*2 */
    // db.collection('user'/* asm altable */).findOne({_id:new ObjectID('6002cfcd4884d525701261f4') }, (arr, data) => {
    //     console.log(data)
    // })
    /* 3 */
    // db.collection('user').updateOne({_id:new ObjectID('6002cfcd4884d525701261f4')}/* ==={name:'george'} */,
    // {$set:{name:'georgeamir'}}/* {$inc:{age:1}} */)
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
    /* 4 */
    db.collection('user').deleteOne({name:'Badr'})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
})
