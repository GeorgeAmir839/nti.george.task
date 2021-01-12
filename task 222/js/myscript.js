const fs = require('fs');
// const { join } = require('path');
mynote = {name: 'note 1', type: 'type 1'}

fs.writeFileSync('notes.json', JSON.stringify(mynote))

