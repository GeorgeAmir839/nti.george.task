const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const connectionURL = "mongodb://127.0.0.1:27017"
const dbName = "bankdatatask"
addNewData = function(user){
    MongoClient.connect(connectionURL, {useNewUrlParser:true}, (err,client)=>{
        if(err) console.log('db not connected')
        const db = client.db(dbName)
        console.log('connected')
        data = db.collection('bankdata').insertMany([user]) 
        console.log(data) 
        
    })
}

showAllData = function () {
    MongoClient.connect(connectionURL, {useNewUrlParser:true}, (err,client)=>{
        if(err) console.log('db not connected'
        const db = client.db(dbName)
        console.log('connected')
         
        db.collection('user'/* asm altable */).find({name:"George"},(err,data)=>{
            if(data==[])console.table(data)
            else console.table(data)
        })
        // db.collection('user'/* asm altable */).findOne({_id:new ObjectID('6002cfcd4884d525701261f4') }, (arr, data) => {
        //     console.log(data)
        // })
    })
}
/* show all notes => done , add note => note { name:'x', type:'xt'} */
//file not found  - data in file length  = 0 - data not array => done

const fs = require('fs')
const yargs = require('yargs')
let mynote = { name: 'note 1', type: 'type 1' }
// console.log(fs.readFileSync('notes.js'));
// readFileData = function () {
//     try {
//         data = fs.readFileSync('notes.json')
//         if (data.toString().length == 0) throw new Error('errrr')
//         data = JSON.parse(data.toString())
//         if (!Array.isArray(data)) throw new Error('')
//         // if (data.toString()[accountnumber].value == data.toString()[accountnumber].value) throw new Error('accountnumber used before')
//     }
//     catch (e) {
//         data = []
//         fs.writeFileSync('notes.json', "[]")
//     }
//     return data
// }
// showAllData = function () {
//     data = readFileData()
//     if (data.length > 0) console.table(data);
//     else console.log("no notes found")   /* chalk.blue.bgRed.bold("no notes found") */
// }

// addNewData = function (note) {
//     data = readFileData() //=> return array
//     data.push(note)
//     /* ali =  */fs.writeFileSync('notes.json', JSON.stringify(data))
//     /* if (data.toString()[accountnumber].value == ali) throw new Error('accountnumber used before') */
// }

showSingleNote = function () {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
        if (err) console.log('db not connected')
        const db = client.db(dbName)
        console.log('connected')
        db.collection('user').updateOne({accountnumber:5},
        {$inc:{balance:1000}})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    })
    
}
// showAllData()
// addNewData(mynote)
// showAllData()
yargs.command({
    command: "showSingle",
    // builder: {
    //     accountnumber: {
    //         demandOption: true,
    //         descripe: "name user",
    //         type: 'number'
    //     },
    //     balance: {
    //         demandOption: true,
    //         descripe: "age user",
    //         type: 'number'
    //     }
    // },
    handler: function () {showSingleNote()}
})
yargs.command({
    command: 'showAllNotes',
    describe: 'show all stored notes',
    handler: function () {
        showAllData()
    }
})
yargs.command({
    command: 'addnew',
    descripe: 'adduser',
    builder: {
        name: {
            demandOption: true,
            descripe: "name user",
            type: 'string'
        },
        balance: {
            demandOption: true,
            descripe: "age user",
            type: 'number'
        },
        accountnumber: {
            demandOption: true,
            descripe: "name user",
            type: 'number'
        },
        age: {
            demandOption: true,
            descripe: "age user",
            type: 'number'
        },
        email: {
            demandOption: true,
            descripe: "name user",
            type: 'string'
        },
        password: {
            demandOption: true,
            descripe: "name user",
            type: 'number'
        }
        
    },
    handler: function (argv) {
        let user = { name: argv.name, balance: argv.balance, accountnumber: argv.accountnumber,age: argv.age,email: argv.email,password: argv.password}
        addNewData(user)
        // console.log(`name is ${argv.name }my age is ${argv.age} my salary is ${argv.salary}`)

    }

})
//node js/notes.js showSingle --accountnumber=5 --balance=4000
//node js/notes.js showAllNotes 
/* node js/notes.js addnew --name="george" --balance=4000 --accountnumber=5 --age=24 --email="georgeamir@gmail.com" --password=124523112
kda ana 3mlt fe addnew =>nzel fi file notes.json
34an a3rd ale 3mlto fi termnal
node js/notes.js addnew
 */
yargs.argv
