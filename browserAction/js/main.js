$(document).ready(function() {
	chrome.storage.sync.get(['server'], function(data) {
		if (data.server) {
			// Get the API roots for the server
			console.log(tentGetAPIRoots(data.server));

			// Get the latest posts for the server
			// console.log(tentGetPosts(data.server));
		}
	});
});