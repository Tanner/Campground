$(document).ready(function() {
	document.title = chrome.i18n.getMessage('options_title');

	$("form").submit(function(event) {
		event.preventDefault();
		event.stopPropagation();

		var server = $("#inputServer").val();

		// Strip 'http' or 'https'
		if (server.indexOf('http://') != -1) {
			server = server.substring(7);

			$("#inputServer").val(server);
		} else if (server.indexOf('https://' != -1)) {
			server = server.substring(8);

			$("#inputServer").val(server);
		}

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