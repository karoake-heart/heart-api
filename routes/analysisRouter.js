import express from 'express';
import {queryAnalyses} from '../lib/dao/AnalysisDAO';
let router = express.Router();

router.get('/:value_type/:song_name', (req, res)=>{
    if(req.params.song_name){
        req.params['song_url LIKE'] = '%' + req.params.song_name + '%';
    }
    delete req.params.song_name;

    queryAnalyses(req.params).then((data)=>{
        res.json(data);
    })
});

export default router;