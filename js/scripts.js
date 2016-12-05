// Searchbar Handler

$(function() {
  var searchField = $('#query'); // form
  var icon = $('#search-btn'); // button

  // Focus Handler
  $(searchField).on('focus', function() {
    $(this).animate({
      width: '100%'
    }, 500);
    $(icon).animate({
      right: '10px'
    }, 500);
  });
  // When field is clicked/tabbed to, animate
  // width of field and position of button

  // Blur Event
  $(searchField).on('blur', function() {
    if(searchField.val() == ''){
      $(searchField).animate({
        width: '45%'
      }, 400, function() {});
      $(icon).animate({
        right: '350px'
      }, 400, function() {});
    }
  });
  // Upon exiting field, shrink length by 45%
  // and return button to 'right: 350px;'

  $('#search-form').submit(function(e) {
    e.preventDefault();
    
  });
});

function search(){
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	var q = $('#query').val();
	
	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyAHP9sAAJW66yOvU21pvFPcQtrq4lcnF60'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});
			}
	);
}