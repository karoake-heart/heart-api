import database from './database';
import useragent from 'useragent';
import Bluebird from 'bluebird';
export function createAPIEvent(event){
    return new Bluebird((resolve, reject)=>{
        resolve(event);
        //database.then((db)=>{
        //    db.blog_events.insert(event).then((data)=>{
        //        resolve(data);
        //    }, (err)=>{
        //        resolve(err);
        //    })
        //}, (err)=>{
        //    //Resolve even when connection error since we don't want to block UI
        //    reject(err);
        //});
    })
}


export default function createAPIEventMiddleware (req, res, next){
    let shouldBeLogged = req.url && !req.hostname.includes('localhost');
    let event = {
        url: req.url,
        referrer: req.headers.referer,
        user_agent: JSON.stringify(useragent.parse(req.headers['user-agent'])),
        headers: JSON.stringify(req.headers),
        host: req.headers.host,
        ip: req.connection.remoteAddress,
        event_time: new Date()
    };
    if(shouldBeLogged){
        //TODO USER EVENT LOGGING
        //domainToUserId(req.headers.host).then((userId)=>{
        //    event.user_id = userId;
        //    createAPIEvent(event);
        //});
        next();
    }
    else{
        next();
    }
}