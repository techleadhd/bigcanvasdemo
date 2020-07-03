<?php
require_once 'global.php';

print <<<EOF

<!doctype html>
<html>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<head>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="index.js?version=$VERSION"></script>
    <link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
    <div class="headbar">
        <br>
        <h2>Big Canvas Demo</h2>
        <br>
    </div>
    <script>
        let DIMENSION = $DIMENSION;
    </script>
    <center>
        <div style='padding:8px;color:#222; margin-top: 20pt;'>
            <p>
                YouTube video walkthrough: <a href=https://youtu.be/t1aXuJkmTg8>https://youtu.be/t1aXuJkmTg8</a>
            </p>
            <BR>
            <p>
                Source code: <a href=https://github.com/techleadhd/bigcanvasdemo>https://github.com/techleadhd/bigcanvasdemo/</a>
            </p>
            <BR>
            <BR>
          
            </div>
            <div id=mycanvasWrapper style="margin-top: 25pt;">
                <canvas id=mycanvas></canvas>
            </div>
            <br>
            <br>
            <p>
                Looking for more coding tips?
            </p>
            <BR>
            <p>
                Join ex-Google/ex-Facebook engineers at
                <a href=http://techinterviewpro.com>http://techinterviewpro.com</a> for interview prep to FANG companies.
            </p>
    </center>
</body>

</html>
EOF;
