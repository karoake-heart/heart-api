import express from 'express'
import compress from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import analyisRouter from './routes/analysisRouter';
import renderRouter from './routes/renderRouter';
import analyticsMiddleware from './lib/analytics_middleware';
let app = express();
let PORT = process.env.PORT || 3000;



app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});


app.set('views', 'visualizer/client');
app.set('view engine', 'jsx');

app.use(favicon('./config/favicon/favicon.png'));
app.use(helmet());
app.use(compress());
app.use(analyticsMiddleware);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('visualizer'));
app.use('/api/v1/analysis', analyisRouter);

app.use('/', renderRouter);

app.listen(PORT, (err) => {
    console.log(`listening on port ${PORT}`)
});