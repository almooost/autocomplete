$(document).ready(function() {


  // Define Accent Mapping
  var accentMap = {
    "à": "a",
    "a": "ä",
    "ö": "o",
    "ü": "u"
  }
  // Declare names array
  var names = [];

  // Normalize function
  function normalize(term){
    var ret = "";
    for (var i = 0; i < term.length; i++) {
      ret += accentMap[term.charAt(i)] || term.charAt(i);
    };
    return ret;
  }

  // set live search on keyup
  function search() {
    // Set search string
    var query_value = $('input#search').val(); 
    $('b#search_string').html(query_value);

    // Do search
    if (query_value !== ''){
      $.ajax({
        type: "POST",
        url: "/iwx/search.php",
        data: { query: query_value },
        cache: false,
        dataType: "text",
        success: function(data, status, headers, config){
          // parse data to json object
          var elem = JSON.parse(data);

          names = [];
          var values = '';
          // loop through each object and write to array
          names = $.map(elem, function(value,key){
            return {
              label: value.firstname+" "+value.lastname,
              firstname: value.firstname,
              lastname: value.lastname,
              idnum: value.idnum
            }
          });

          // $.each(elem, function(index, obj){
          //   names.push(obj.firstname+" "+obj.lastname);
          //   values += obj.html;
          // })

         // $('datalist#results').html(values);
         // $('input#firstname').val(values.name);
          
        },
        error: function (event){
          console.log("ERROR: ");
          console.log(event);
          $('input#name').val(event);
        },
        complete: function(event){
          console.log("Complete: ");
          console.log(event);
          // var elem = $.parseJSON(event.responseText);
        }
      });
    }return false;
  }


/*
* Auto execution
*/

  // Focus on div click
  $('div.icon').click(function(){
    $('input#search').focus();
  });  

  // set live search on keyup
  $('input#search').on('keyup', function(e) {

    //Set Timeout
    clearTimeout($.data(this, 'timer'));

    var search_string = $(this).val();

    // Do search
    if (search_string == ''){
      $('ul#results').fadeOut();
      $('h4#results-text').fadeOut();
    } else {

      $('ul#results').fadeIn();
      $('h4#results-text').fadeIn();
      $(this).data('timer', setTimeout(search, 200));
    };

  });


  // Autocomplete listener for searching input
  $('input#search').autocomplete({
      source: function( request, response ){
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i");
        response( $.grep( names, function( value ) {
          // value = value.label || value.value || value.key || value;
          value_out = value.label;
          return matcher.test( value_out ) || matcher.test( normalize( value_out ) );
        }) );
      },
      select: function(event, data) {
        // add selected values to input field
        $('input#firstname').val(data.item.firstname);
        $('input#lastname').val(data.item.lastname);
        $('input#idnum').val(data.item.idnum);
      }
    });


});
