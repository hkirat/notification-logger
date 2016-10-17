(function() {
	var isInitialized = false, _console = {};
	var device = navigator.userAgent.match(/android/i)?'android':'desktop';

	// Workaround to get notifications on android
	// sw.js is a zero byte file
	if (device === 'android') {
		navigator.serviceWorker.register('sw.js');
	}

	Notification.requestPermission();
	// Get current notification icon
	icon = "notifications.png";

	function modifyIcon(icon_path) {
		logger.icon = icon_path;
	}

	// Check if notification is supported by the browser
	function isNewNotificationSupported() {
		if (!window.Notification || !Notification.requestPermission)
			return false;
		if (Notification.permission == 'granted')
			throw new Error('You must call isNewNotificationSupported only before calling Notification.requestPermission(), otherwise this feature detect would bug the user with an actual notification!');
		return true;
	}

	/*
	*	Displays the notification.
	*	For android - https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/
	*/
	function spawnNotification(body, title) {
		// If the device is android
		if (device === 'android') {
			navigator.serviceWorker.ready.then(function(registration) {
				registration.showNotification(title ,{body: body, icon: logger.icon});
			});
		} else {
			new Notification(title ,{body: body, icon: logger.icon});
		}
	}

	/*
	*	Checks if proper permissions are provided for the notifications.
	*	If yes, triggers the notification by calling spawnNotification
	*/
	function log(body, title) {
		title = title || "Notification";
		if (window.Notification && Notification.permission == 'granted') {
			// We would only have prompted the user for permission if new
			// Notification was supported (see below), so assume it is supported.
			spawnNotification(body, title);
		} else if (isNewNotificationSupported()) {
			// new Notification is supported, so prompt the user for permission.
			Notification.requestPermission(function (permission) {
				if (permission === "granted") {
					spawnNotification(body, title);
				}
});
		} else if(isInitialized) {
		    alert("This browser does not support desktop/android notification");
		}
	}

	function originalFnCallDecorator(fn, fnName) {
		return function() {
			fn.apply(this, arguments);
			if (typeof _console[fnName] === 'function') {
				_console[fnName].apply(console, arguments);
			}
		};
	}

	// Set console.log to its original value
	function destroy() {
		isInitialized = false;
		console.log = _console.log;
	}

	/* Initialize logger and set console.log to logger.log
	*  Everytime user calls console.log, logger.log will be executed
	*/
	function init() {
		if (isInitialized) { return; }
			isInitialized = true;
		_console.log = console.log;
		console.log = originalFnCallDecorator(log, 'log');
	}

	window.logger = {
		log: log,
		init: init,
		destroy:destroy,
		modifyIcon: modifyIcon,
		icon: icon
	}
})();
