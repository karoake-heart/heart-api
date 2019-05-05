import express from 'express'
import compress from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import fs from 'fs';

import analyticsMiddleware from './lib/analytics_middleware';
let app = express();
let PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(favicon('./config/favicon/favicon.png'));
app.use(helmet());
app.use(compress());
app.use(analyticsMiddleware);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'));
app.get('/', (req, res)=> res.sendFile("public/index.html"));

app.get('/songs', (req, res)=> res.send(fs.readdirSync('analysis/songs').map((v)=>v.split('.')[0])));

app.get('/analysis/tempo/:song', (req, res)=>{
    let path = `analysis/outputs/tempo/${req.params.song}.csv`;
    if(fs.existsSync(path)){
        res.send(fs.readFileSync(path, 'utf-8'))
    }
    else{
        res.send(`song analysis ${req.params.song} does not exist!`);
    }
});


app.listen(PORT, (err)=>{
    console.log(`listening on port ${PORT}`)
});