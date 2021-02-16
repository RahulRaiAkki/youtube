<html>
<head>
    <title>Trending videos list</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<h2>Trending videos list</h2>
<ol class="list">
</ol>
<script>

    var settings = {
        "url": "http://localhost:3000/getList",
        "method": "GET",
    };

    $.ajax(settings).done(function (response) {
        let data = response.data;
        let childElements = '';
        data.forEach((val) => {
            childElements += `<li><a href="video-details.php?${val.id}">${val.title}</a></li>`;
        });
        $('.list').empty().append(childElements);
    });


</script>
</body>
</html>