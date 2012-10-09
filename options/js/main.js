$(document).ready(function() {
	document.title = chrome.i18n.getMessage('options_title');

	chrome.storage.sync.get(['server'], function(data) {
		if (data.server) {
			$("#inputServer").val(data.server);
		}
	});

	$("form").submit(function(event) {
		event.preventDefault();
		event.stopPropagation();

		var server = $("#inputServer").val();

		// Strip 'http' or 'https'
		if (server.indexOf('http://') != -1) {
			server = server.substring(7);
		} else if (server.indexOf('https://') != -1) {
			server = server.substring(8);
		}

		// Strip a path
		var path = server.indexOf('/');

		if (path != -1) {
			server = server.substring(0, path);
		}

		$("#inputServer").val(server);

		// Save to chrome.storage
		$("#save").text(chrome.i18n.getMessage('options_saving_suffix'));
		$("#save").addClass('disabled');

		chrome.storage.sync.set({'server': server}, function() {
			$("#save").text('');
			$("#save").removeClass('disabled');
		});

		return false;
	});
});