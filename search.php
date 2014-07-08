<?php

$dbhandle = array('localhost','iwx','root','');

global $dbs;

$dbs = new mysqli();
$dbs->connect($dbhandle[0],$dbhandle[2],$dbhandle[3],$dbhandle[1]);
$dbs->set_charset('utf8');

if($dbs->connect_errno){
  printf("Connect failed %s\n", $dbs->connect_errno);
  exit();
}

/*

$html = '';
$html .= '<option value=\'firstnameString lastnameString\'>customerID</option>';
$html .= '<li class="result">';
$html .= '<a href="lastnameString" target="_blank">';
$html .= '<h3>nameString</h3>';
$html .= '<h4>customerID</h4>';
$html .= '</a>';
$html .= '</li>';
*/
$s_search_string = preg_replace("/[^\w]/", ' ', $_POST['query']);
$s_search_string = $dbs->real_escape_string($s_search_string);

if(strlen($s_search_string) >= 1 && $s_search_string !== ' '){


  // Build Query
  $sqlquery = 'SELECT * FROM customers WHERE `firstname` LIKE "%'.$s_search_string.'%" OR `lastname` LIKE "%'.$s_search_string.'%"';

  // Do Search
  $sqlres = $dbs->query($sqlquery);
  while($results = $sqlres->fetch_array()){
    $a_result_array[] = $results;
  }

  // Check if We Have Results
  if (isset($a_result_array)){
    $a_rtnarray = array();
    foreach ($a_result_array as $h_result) {
      // Format Output Strings
      /*
      // Format Output Strings And Hightlight Matches
      $s_display_id = preg_replace("/".$s_search_string."/i", $s_search_string, $h_result['id'] );
      $s_display_firstname = preg_replace("/".$s_search_string."/i", $s_search_string, $h_result['firstname'] );
      $s_display_lastname = $h_result['lastname'];
      
      // Insert Name
      $h_output['html'] = str_replace('firstnameString', $s_display_firstname, $html);
      //Insert Function
      $h_output['html'] = str_replace('customerID', $s_display_id, $h_output['html'] );
      //Insert URL
      $h_output['html'] = str_replace('lastnameString', $s_display_lastname, $h_output['html'] );
      
      $h_output['firstname'] = $s_display_firstname;
      $h_output['id'] = $s_display_id;
      $h_output['lastname'] = $s_display_lastname;
      */
      // Output
      $a_rtnarray[] = $h_result;
    }
      echo (json_encode($a_rtnarray));
  } else {
    
    // Format No Results h_Output
    // $h_output['html'] = str_replace('lastnameString', 'JavaScript:void(0)', $html );
    // $h_output['name'] = str_replace('nameString', 'Keine Resultate gefunden', $h_output['html'] );
    // $h_output['id'] = str_replace('customerID', 'Sorry', $h_output['html'] );
    $h_output['error'] = "Keine Resultate gefunden";
    // Output
    
    echo(json_encode($h_output));
  }
}


/*
// Compile Functions Array
$functions = get_defined_functions();
$functions = $functions['internal'];

// Loop, Format and Insert
foreach ($functions as $function) {
  $function_name = str_replace("_", " ", $function);
  $function_name = ucwords($function_name);

  $sqlquery = '';
  $sqlquery = 'INSERT INTO search SET `id`= "", `function`="'.$function.'" name = "'.$function_name.'"';

  $dbs->query($sqlquery);

}
*/
?>

