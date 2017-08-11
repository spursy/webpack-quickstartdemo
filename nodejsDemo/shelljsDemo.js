require('shelljs/global');  
const {resolve} = require('path');

const r = (url) => resolve(process.cwd(), url);
const assetsPath = r('./assests')

rm('-rf', assetsPath)
