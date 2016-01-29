(function() {
  // shorthand for $(document).ready
  $(function() {
    var $otherArgs = $("#otherArgs");
    $otherArgs.keyup(function(){
    $otherArgs.autocomplete({
      source: function(request, response) {
        $.ajax({
          url: "../api/IngredientChoices",
          dataType: "json",
          response: ($.map(data, function(v, i) {
            return {
              label: v.argv,
              value: v.argv
            };
          }))
        });
      }
    });
  });
  });
}());
