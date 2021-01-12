// const { require } = require("yargs");
const yargs = require('yargs');

// const yargs = require('yargs')


yargs.command({
    command:'addnew',
    descripe:'adduser',
    builder:{
        name:{
            demandOption:true,
            descripe:"name user",
            type:'string'
        },
        age:{
            demandOption:true,
            descripe:"age user",
            type:'number'
        },
        salary:{
            demandOption:true,
            descripe:"name user",
            type:'string'
        }
    },
    handler:function(argv){
        console.log(`name is ${argv.name }my age is ${argv.age} my salary is ${argv.salary}`)

    }

})
yargs.argv
// node js/myscript.js addnew --name:george --age:24 --salary:4000