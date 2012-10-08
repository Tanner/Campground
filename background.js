var refreshAlarm = chrome.alarms.create("refresh", {
	periodInMinutes: 5.0
});

chrome.alarms.onAlarm.addListener(function(alarm) {
	console.log(alarm);
});