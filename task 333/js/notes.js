
/* show all notes => done , add note => note { name:'x', type:'xt'} */
//file not found  - data in file length  = 0 - data not array => done
const { notStrictEqual } = require('assert');
const fs = require('fs')
// const chalk = require('chalk');
const yargs = require('yargs');
let mynote = {name: 'note 1', type: 'type 1'}
// console.log(fs.readFileSync('notes.js'));
readFileData = function(){
    try{
        data = fs.readFileSync('notes.json')
        if(data.toString().length==0) throw new Error('errrr')
        data = JSON.parse(data.toString())
        if(!Array.isArray(data)) throw new Error('')
    }
    catch(e){
        data = []
        fs.writeFileSync('notes.json', "[]")
    }
    return data    
}
showAllData = function(){
    data = readFileData()
    if(data.length>0) console.table(readFileData());
    else console.log("no notes found")   /* chalk.blue.bgRed.bold("no notes found") */
}
addNewData = function(note) {
    data = readFileData() //=> return array
    data.push(note)
    fs.writeFileSync('notes.json', JSON.stringify(data))
}
showSingleNote = function(title){
    data = readFileData()
    result = data.find(element=>{
        return element.title == title
    })
    if(!result) console.log("not found")
    else console.table(result)
}
// showAllData()
// addNewData(mynote)
// showAllData()
yargs.command({
    command:"showSingle",
    builder:{ title:{type:'string', demandOption:true}},
    handler:function(argv){showSingleNote(argv.title)}
})
yargs.command({
    command:'showAllNotes',
    describe:'show all stored notes',
    handler: function(){
        showAllData()
    }
})
yargs.command({
    command:'addnew',
    descripe:'adduser',
    builder:{
        name:{
            demandOption:true,
            descripe:"name user",
            type:'string'
        },
        balance:{
            demandOption:true,
            descripe:"age user",
            type:'number'
        },
        accountnumber:{
            demandOption:true,
            descripe:"name user",
            type:'string'
        }
    },
    handler:function(argv){
        let user = {name:argv.name,balance:argv.balance,accountnumber:argv.accountnumber}
        addNewData(user)
        // console.log(`name is ${argv.name }my age is ${argv.age} my salary is ${argv.salary}`)

    }

})

/* node js/notes.js addnew --name="george" --balance=24 --accountnumber="4000" 
kda ana 3mlt fe addnew =>nzel fi file notes.json
34an a3rd ale 3mlto fi termnal
node js/notes.js addnew
 */
yargs.argv