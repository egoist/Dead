<!DOCTYPE html>
<html>
<head>
    <title>Dead Timer</title>
    <link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/normalize/3.0.1/normalize.min.css">
    <link rel="stylesheet" type="text/css" href="css/DateTimePicker.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script type="text/javascript" src="http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="js/jstorage.min.js"></script>
    <script type="text/javascript" src="js/DateTimePicker.min.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
</head>
<body>
<div class="wrap">
    <h1 class="logo">Dead Timer</h1>
    <h2 class="slogan">Focus on one thing and make it done or make you die.</h2>
    <div class="set">
    <label>
       <input id="thing" class="input" placeholder="Type just one thing"> 
    </label>  
    <label>
        <input id="time" type="text" class="input" data-field="datetime" placeholder="Pick up a deadline" readonly>
    </label>
    </div>
    <div class="dead">
        <h3 class="dead-title"></h3>
        <div class="dead-remain"></div>
    </div>
    <label class="start">
        <a href="#" class="button" id="start">Start!</a>
    </label>
    <div id="dtBox"></div>
</div>
</body>
</html>
