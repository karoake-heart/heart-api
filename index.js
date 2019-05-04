import express from 'express'
import compress from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import favicon from'serve-favicon';
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
app.get('/', (req, res)=> res.send('hello world'));
app.listen(PORT, (err)=>{
    console.log(`listening on port ${PORT}`)
});