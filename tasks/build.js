// rm (rf,  assestsPath)
// mkdir(assetsPath)
// renderConf.entry
// var compiler = webpack(renderConf)
// compiler.watch({}, (err, stats))
require('shelljs/global');

const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');
const {resolve} = require('path');

const r = url => resolve(process.cwd(), url)

const webpackConf = require('./webpack.conf');
const config = require(r('./mina-config'));
const assetsPath = r('./dist');

rm('-rf', assetsPath)
mkdir(assetsPath)

var renderConf = webpackConf

var entry = () => _.reduce(config.json.pages, (en, i) => {
    en[i] = resolve(process.cwd(), './', `${i}.mina`)
    return en
}, {})

renderConf.entry = entry()
renderConf.entry.app = config.app

renderConf.output = {
    path: r('./dist'),
    filename: '[name].js'
}

var compiler = webpack(renderConf)
fs.writeFileSync(r('./dist/app.json'), JSON.stringify(config.json), 'utf-8')

compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, (err, stats) => {
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: true,
        chunkModules: true
    }) + '\n\n')
})