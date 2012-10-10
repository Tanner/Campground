function tentGetPosts(server) {

}

function tentGetAPIRoots(server) {
	http = new XMLHttpRequest();
	http.open('GET', 'https://' + server, false);
	http.setRequestHeader('Content-Type', 'application/vnd.tent.v0+json');
	http.send(null);

	var headers = http.getAllResponseHeaders();

	console.log(extractHeaders(headers));

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