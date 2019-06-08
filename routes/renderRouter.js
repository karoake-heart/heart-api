import express from 'express';
let router = express.Router();
import {queryAnalyses} from '../lib/dao/AnalysisDAO';
import Html from '../visualizer/client/Html.js';
import App from '../visualizer/client/App.js'
import React from 'react';
import {ServerStyleSheet} from 'styled-components'; // <-- importing ServerStyleSheet
import {renderToString} from 'react-dom/server';


router.get('/song/:song_name', (req, res) => {
    console.log(req.params);
    queryAnalyses({'song_url LIKE': '%' + req.params.song_name + '%', value_type: 'tempo'}).then((data) => {
        /**
         * This is where all the magic happens with Styled Components and
         * rendering our React application to string so we can insert it
         * into our HTML template to send to the client.
         */
        const sheet = new ServerStyleSheet();

        const body = renderToString(sheet.collectStyles(<App objects={data} title={"Nobody Beats the Drum"}/>));
        const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
        const title = req.params.song_name;
        let state = {
            objects: data,
            title: "Nobody Beats the Drum"
        };

        res.send(
            Html({
                body,
                styles,
                title,
                state
            })
        );
    });
});

export default router;