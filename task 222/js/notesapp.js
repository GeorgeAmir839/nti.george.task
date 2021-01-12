const fs = require('fs');
// const { join } = require('path');
data = [ {id:1},{name:"george"},{age:24}, {address:"shopra"}, {ofiice:"giza"}]

fs.writeFileSync('notes.json', JSON.stringify(data))

