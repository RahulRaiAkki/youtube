<html>
<head>
    <title>Trending videos list</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<div class="container">
    <h1 class="video-title"></h1>
    <div class="video-container">
        <iframe class="source_url" width="420" height="315"
                src="" allow='autoplay'>
        </iframe>
    </div>
    <div class="description">
    </div>
    <div class="thumbnail_container">
        <h2>Video thumbnails</h2>
        <div class="video_thumbnail"></div>
        <h2>Channel thumbnails</h2>
        <div class="channel_thumbnail"></div>
    </div>
    <div class="counts">
        <h2>Video Stats</h2>
        <div class="video_stats"></div>
        <h2>Channel Stats</h2>
        <div class="channel_stats"></div>
    </div>

</div>

<script>
    const id = window.location.search.replace('?','');
    var settings = {
        "url": "http://localhost:3000/videoDetails/"+id,
        "method": "GET",
    };

    $.ajax(settings).done(function (response) {
        let videoData = JSON.parse(response.data[0].video_snippet);
        let videoStats = JSON.parse(response.data[0].video_stats);
        let channelData = JSON.parse(response.data[0].channel_snippet);
        let channelStats = JSON.parse(response.data[0].channel_stats);
        let video_thumbnails = videoData.thumbnails;
        let channel_thumbnail = channelData.thumbnails;

        let videoImgs = '';
        let channelImgs = '';
        let stats = '';
        let channel_stats = '';
        $('.video-title').text(videoData.title)
        for (key in video_thumbnails) {
            videoImgs += `${key} : <a target="_blank" href='${video_thumbnails[key].url}' width="${video_thumbnails[key].width}" height="${video_thumbnails[key].height}"> ${video_thumbnails[key].url}</a><br>`
        }
        for (key in channel_thumbnail) {
            channelImgs += `${key} : <a target="_blank" href='${channel_thumbnail[key].url}' width="${channel_thumbnail[key].width}" height="${channel_thumbnail[key].height}"> ${channel_thumbnail[key].url}</a><br>`
        }
        for (key in videoStats) {
            stats += `${key} : ${videoStats[key]}<br>`
        }
        for (key in channelStats) {
            channel_stats += `${key} : ${channelStats[key]}<br>`
        }
        $('.video_thumbnail').append(videoImgs);
        $('.channel_thumbnail').append(channelImgs);
        $('.video_stats').append(stats);
        $('.channel_stats').append(channel_stats);

        $('.source_url').attr('src','https://www.youtube.com/embed/'+id+'?autoplay=0&mute=0')
    });
</script>
</body>
</html>