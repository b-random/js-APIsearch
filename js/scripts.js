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


// Search Function; GET

function search(){
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
      safeSearch: 'strict',
			type:'video',
			key: 'AIzaSyAHP9sAAJW66yOvU21pvFPcQtrq4lcnF60'},

      // 'data' is a youtube ORDER parameter that holds the .gets 
      // data in reverse chron from date of creation
			function(data){
				var nextPageToken = data.nextPageToken; // data on next
				var prevPageToken = data.prevPageToken; // data on prev
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons)
			}
	);
}



// Page Through Functions
// Next Page function

function nextPage() {
  var token = $('#next-button').data('token'); // Grabs data-token from next-button class in the HTML created by getButtons function
  var q = $('#next-button').data('query'); // Same for data-query

  // Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
      safeSearch: 'strict',
      pageToken: token,
			type:'video',
			key: 'AIzaSyAHP9sAAJW66yOvU21pvFPcQtrq4lcnF60'},

      // 'data' is a youtube ORDER parameter that holds the .gets 
      // data in reverse chron from date of creation
			function(data){
				var nextPageToken = data.nextPageToken; // data on next
				var prevPageToken = data.prevPageToken; // data on prev
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons)
			}
	);
}
   
// Prev Page function
function prevPage() {
  var token = $('#prev-button').data('token'); // Grabs data-token from next-button class in the HTML created by getButtons function
  var q = $('#prev-button').data('query'); // Same for data-query

  // Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
      safeSearch: 'strict',
      pageToken: token,
			type:'video',
			key: 'AIzaSyAHP9sAAJW66yOvU21pvFPcQtrq4lcnF60'},

      // 'data' is a youtube ORDER parameter that holds the .gets 
      // data in reverse chron from date of creation
			function(data){
				var nextPageToken = data.nextPageToken; // data on next
				var prevPageToken = data.prevPageToken; // data on prev
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons)
			}
	);
}   




 
// Build getOutput

function getOutput(holdItem) {
  var videoId = holdItem.id.videoId;
  var title = holdItem.snippet.title;
  var description = holdItem.snippet.description;
  var thumb = holdItem.snippet.thumbnails.high.url; // high quality thumbsnails
  var channelTitle = holdItem.snippet.channelTitle;
  var videoDate = holdItem.snippet.videoDate;

  // Output String

  var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';

  return output;
};

// Build buttons

function getButtons(prevPageToken, nextPageToken) {
  if(!prevPageToken) {
    var btnoutput = '<div class="button-container">' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick=nextPage()>Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">' +
    '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
    'onclick=prevPage()>Prev Page</button>' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick=nextPage()>Next Page</button></div>';
  }

  return btnoutput;
};