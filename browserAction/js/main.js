$(document).ready(function() {
	chrome.storage.sync.get(['server'], function(data) {
		if (data.server) {
			// Get the latest posts for the server
			console.log(tentGetLatestPosts(data.server, 10));
		}
	});
});