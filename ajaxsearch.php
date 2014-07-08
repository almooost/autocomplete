<?php


?>

<!DOCTYPE html>

<html>
<meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
<head>
    <title> </title>
</head>
<link href="style.css" rel="stylesheet" type="text/css" />
<link href="/git/autocomplete/js/jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="/git/autocomplete/js/jquery-2.1.1.min.js"></script>
<script src="/git/autocomplete/js/jquery-ui/jquery-ui.js"></script>
<!--
<script src="/git/autocomplete/js/jquery-2.1.1.min.map"></script>
-->
<script src="/git/autocomplete/custom.js" type="text/javascript" charset="utf-8" ></script>

<script type="text/javascript">
$(document).ready(function() {

  var a_labelfield = ["firstname", "lastname", "id"];

  var s_fieldList = '["#first_name", "#last_name", "#idnum"]';

  var s_dbList = '["firstname", "lastname", "id"]';

  var Complete = new aComplete("#search",a_labelfield, s_fieldList, s_dbList, "/git/autocomplete/search.php");

  Complete.init();
});

</script>

<body>
<!-- Main Title -->
<div id="main">
  <div class="icon"></div>
  <h1 class="title">Search Tutorial</h1>
  <h5 class="title">searches throug mysql database</h5>

  <label for="first_name">Firstname</label>
  <input id="first_name" name="first_name" type="text"><br>
  
  <label for="last_name">Lastname</label>
  <input id="last_name" name="last_name" type="text"><br>
  
  <label for="idnum">ID</label>
  <input id="idnum" name="idnum" type="text"> <br>

  <input id="search" type="text" name="search" value="" placeholder="Was möchten Sie suchen?" autocomplete="off">


</div>

</body>

</html>

