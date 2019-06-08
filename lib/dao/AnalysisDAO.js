import database from '../database';

export function queryAnalyses(query){
    return database.then((db)=>{
        return db.karoake.song_analysis.find(query)
    });
}