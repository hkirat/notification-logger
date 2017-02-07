(function() {
	var isInitialized = false, _console = {};
	Notification.requestPermission();
	// Get current notification icon
	icon = "notifications.png"

	function modifyIcon(icon_path) {
		logger.icon = icon_path;
	}

	function log(body, title) {
		title = title || "Notification";
		if (!("Notification" in window)) {
		    alert("This browser does not support desktop notification");
	  	} else if (Notification.permission === "granted") {
			new Notification(title ,{body: body, icon: logger.icon});
	    } else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then(function(result) {
				if (result === 'denied') {
					console.log('Permission wasn\'t granted. Allow a retry.');
					return;
				}
				if (result === 'default') {
					console.log('The permission request was dismissed.');
					return;
				}
				if (permission === "granted") {
					new Notification(title ,{body: body});
				}
			});
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

	function destroy() {
		isInitialized = false;
		console.log = _console.log;
	}

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
