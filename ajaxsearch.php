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
<link href="/iwx/js/jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="/iwx/js/jquery-2.1.1.min.js"></script>
<script src="/iwx/js/jquery-ui/jquery-ui.js"></script>
<!--
<script src="/iwx/js/jquery-2.1.1.min.map"></script>
-->
<script src="/iwx/custom.js" type="text/javascript" charset="utf-8" ></script>

<script type="text/javascript">
$(document).ready(function() {

  var a_fieldList = '["#firstname", "#lastname", "#id"]';

  var labelfield = ["firstname", "lastname", "id"];

  var Complete = new aComplete("#search", a_fieldList, labelfield, "/iwx/search.php");

  Complete.init();
});

</script>

<body>
<!-- Main Title -->
<div id="main">
  <div class="icon"></div>
  <h1 class="title">Search Tutorial</h1>
  <h5 class="title">searches throug mysql database</h5>

  <label for="firstname">Firstname</label>
  <input id="firstname" name="firstname" type="text"><br>
  
  <label for="lastname">Lastname</label>
  <input id="lastname" name="lastname" type="text"><br>
  
  <label for="id">ID</label>
  <input id="id" name="id" type="text"> <br>

  <input id="search" type="text" name="search" value="" placeholder="Was möchten Sie suchen?" autocomplete="off">


</div>

</body>

</html>

