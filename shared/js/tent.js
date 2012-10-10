function tentGetPosts(server) {

}

function tentGetAPIRoots(server) {
	// Get links from server
	http = new XMLHttpRequest();
	http.open('GET', 'https://' + server, false);
	http.setRequestHeader('Content-Type', 'application/vnd.tent.v0+json');
	http.send(null);

	var headers = http.getAllResponseHeaders();

	headers = extractHeaders(headers);

	links = headers['Link'];

	if (links == null || links == '') {
		console.error('Unable to get links from server.');

		return null;
	}

	var link_split = links.split(',\s*');

	for (var i = 0; i < link_split.length; i++) {
		var link = link_split[i];

		var info = link.match(/<([^>]+)>; rel="(https?:\/\/[^\"]+)"\s*$/);

		if (info == null || info.length == 0) {
			continue;
		}

		var href = info[1];
		var rel = info[2];

		if (rel != 'https://tent.io/rels/profile') {
			continue;
		}

		// Request from the link href
		http = new XMLHttpRequest();
		http.open('GET', href, false);
		http.send(null);

		if (http.status == 404) {
			console.error('Unable to request link.');

			continue;
		}

		// If the response is JSON, then we've got the servers list
		var response = JSON.parse(http.response);

		if (response == null) {
			console.error('Unable to request link.');

			continue;
		}

		return response['https://tent.io/types/info/core/v0.1.0']['servers'];
	}

	return null;
}

function extractHeaders(headers) {
	var header = {};

	var entryRegex = /([\w-]+)+: (.*)/g;
	var entry;

	while ((entry = entryRegex.exec(headers)) !== null) {
		header[entry[1]] = entry[2];
	}

	return header;
}