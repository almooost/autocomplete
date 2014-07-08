/**
 * aComplete: Auto Complete Class
 * Provides functions for field autocompletion
 * @author Samuel Alfano 2014
 * @param String "#searchFieldID"
 * @param Array ["DatabaseField", "DatabaseField"]
 * @param String {"#fieldID", "#fieldID"} // first element is first field in DB and so on
 * @param String {"dbfield", "dbfield"}
 * @param String "/search.php"
 * @version v0.1 
**/
function aComplete(searchField, labelField, completeFields, dbFields, postURL){

  // field which is used to search
  this.searchField = searchField;

  // Displayed label
  this.labelField = labelField;

  // autocomplete fields
  this.completeFields = JSON.parse(completeFields);

// autocomplete fields
  this.dbFields = JSON.parse(dbFields);

  // Define Post URL
  this.postURL = postURL

  // Define Accent Mapping
  this.accentMap = {
    "à": "a",
    "ä": "a",
    "ö": "o",
    "ü": "u"
  }
  // Declare names array
  this.completeList = [];

}

// Normalize function
aComplete.prototype.normalize = function(term){
  var _this = this;
  var ret = "";
  if(term !== undefined){
    for (var i = 0; i < term.length; i++) {
      ret += _this.accentMap[term.charAt(i)] || term.charAt(i);
    };
  }
  return ret;
}

// set live search on keyup
aComplete.prototype.searchCall = function() {
  var _this = this;
  // Set search string
  var query_value = $(_this.searchField).val(); 
  // Do ajax search in DB
  if (query_value !== ''){
    $.ajax({
      type: "POST",
      url: _this.postURL,
      data: { query: query_value },
      cache: false,
      dataType: "text",
      success: function(data, status, headers, config){
        // parse data to json object
        
        var elem = JSON.parse(data);
        _this.completeList = [];
        // loop through each object and write to array
        _this.completeList = $.map(elem, function(value,key){
          var counter = 0;
          // Return Array
          var rtnArray = '[{';
          $.each(_this.dbFields, function(index, field){
            if(counter == 0){
              rtnArray += '"label": "';
              $.each(_this.labelField, function(i, label){
                rtnArray += value[label.replace(/(\#)/g,'')]+" ";
              })
              rtnArray = rtnArray.slice(0, -1);
              rtnArray += '", ';
            }
            rtnArray += '"'+field.replace(/(\#)/g,'')+'": "'+value[field.replace(/(\#)/g,'')]+'",';
            counter++;
          });
          rtnArray = rtnArray.slice(0,-1);
          rtnArray += '}]';
          rtnJSON = JSON.parse(rtnArray);
          return rtnJSON
        });
      },
      error: function (event){
        // console.log("ERROR: ");
        // console.log(event);
      },
      complete: function(event){
        // console.log("Complete: ");
        // console.log(event);
      }
    });

  }return false;
}


/*
* Auto execution
*/

// Focus on div click
aComplete.prototype.focusOn = function(div, element) {
  
  $(div).click(function(){
    $(element).focus();
  });  
};



// set live search on keyup
aComplete.prototype.setListener = function() {
  var _this = this;
  $(_this.searchField).on('keyup', function(e) {

    //Set Timeout
    clearTimeout($.data(_this, 'timer'));
    
    var search_string = $(_this.searchField).val();
    // Do search
    if (search_string == ''){
      $.each(_this.completeFields, function(index, field){
        $(field).val("");
      });
    } else {      
      $(_this).data('timer', setTimeout(_this.searchCall(), 200));
    };

  });
};



// Autocomplete listener for searching input
aComplete.prototype.listComplete = function() {
  var _this = this;

  $(_this.searchField).autocomplete({

    source: function( request, response ){
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i");
      response( $.grep( _this.completeList, function( value ) {
        // value = value.label || value.value || value.key || value;
        value_out = value['label'];
        return matcher.test( value_out ) || matcher.test( _this.normalize( value_out ) );
      }) );
    },
    select: function(event, data) {
      for (var i = 0; i < _this.dbFields.length; i++) {
        $(_this.completeFields[i]).val(data.item[_this.dbFields[i].replace(/\#/g,'')]);
      };

      // $.each(_this.completeFields, function(index, field){
      //   $(field).val(data.item[field.replace(/\#/g,'')]);
      // });
    }
  });

};

aComplete.prototype.init = function() {
  this.setListener();
  this.listComplete();
};