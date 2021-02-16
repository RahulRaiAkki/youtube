var mysql = require('mysql');
const got = require('got');
const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'youtube',
    connectionLimit: 2
});

module.exports = {
    saveList,
    getList,
    getVideoDetails,
};

function saveList(req, res) {
    makeRequest('https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=50&regionCode=IN&key=AIzaSyDQvCYx2o4XA96VqqTDPiRFlfzfNexJe70&part=snippet&part=statistics', 'get', {}, {}, async function (error, response, body) {
        if (!error && (response.statusCode == 200 || response.statusCode == 204)) {

            let list = JSON.parse(body).items;

            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    let listItem = list[i];
                    connectionPool.query("INSERT INTO youtube.videos(youtube_id, etag,title,snippet,channel_id,stats) VALUES(?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title = ? ,channel_id = ? ,snippet = ?,stats = ? ;", [listItem.id, listItem.etag, listItem.snippet.title, JSON.stringify(listItem.snippet),listItem.snippet.channelId,JSON.stringify(listItem.statistics), listItem.snippet.title,listItem.snippet.channelId, JSON.stringify(listItem.snippet),JSON.stringify(listItem.statistics)], async function (err, result, fields) {
                        if (err) {
                        } else {
                            await saveChannelDetails(listItem.snippet.channelId);
                        }
                    });
                }
            }
            res.send({status: 'success', message: 'updated list'});
        } else {

        }
    });
}

function getList(req, res) {
    connectionPool.query("SELECT youtube_id as id,title FROM youtube.videos order by id desc limit 50;", function (err, result, fields) {
        if (err) {
            res.send({status: 'error', message: err, data: ''});
        } else {
            console.log(result);
            res.send({status: 'success', message: 'success', data: result});
        }
    });
}

async function saveChannelDetails(id){
   await makeRequest('https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDQvCYx2o4XA96VqqTDPiRFlfzfNexJe70&part=snippet&part=statistics&id='+id, 'get', {}, {}, async function (error, response, body) {
        if (!error && (response.statusCode == 200 || response.statusCode == 204)) {
            let listItem = (JSON.parse(body).items)[0];
            connectionPool.query("INSERT INTO youtube.channels(channel_id, snippet,stats) VALUES(?,?,?) ON DUPLICATE KEY UPDATE snippet=?,stats=?", [listItem.id, JSON.stringify(listItem.snippet),JSON.stringify(listItem.statistics),JSON.stringify(listItem.snippet),JSON.stringify(listItem.statistics)], function (err, result, fields) {
                if (err) {
                    console.log('err sni',listItem.snippet);
                    console.log("err", err);
                } else {
                }
            });
        } else {

        }
    });
}

function getVideoDetails(req, res) {
    let id = req.params.id;
    connectionPool.query("SELECT vid.snippet video_snippet,vid.stats video_stats, chnl.snippet channel_snippet,chnl.stats channel_stats FROM youtube.videos vid, youtube.channels chnl where youtube_id = ? and vid.channel_id = chnl.channel_id ;", [id], function (err, result, fields) {
        if (err) {
            res.send({status: 'error', message: err, data: ''});
        } else {
            res.send({status: 'success', message: 'success', data: result});
        }
    });
}

const makeRequest = async (url, method, headers, jsonBody, callback = false) => {
    try {
        var params = {method: method, headers: headers};
        if (method === 'POST' || method === 'PUT') {
            params.json = jsonBody;
            headers['Content-Type'] = 'application/json';
        }
        const response = await got(url, params);
        if (callback) {
            callback(null, response, response.body)
        }
    } catch (error) {
        console.log(new Date(), 'GOT err', error.response.body);
        if (callback) {
            callback(error, error.response.body, error.response.body)
        }
    }
};