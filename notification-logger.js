(function() {
	var isInitialized = false, _console = {};
	Notification.requestPermission();
	// Get current notification icon
	happyIcon = "happy.png"
	sadIcon = "unhappy.png"

	function log(body, title, icon) {
		icon = icon || logger.happyIcon;
		title = title || "Notification";
		if (!("Notification" in window)) {
		    alert("This browser does not support desktop notification");
	  	} else if (Notification.permission === "granted") {
			new Notification(title ,{body: body, icon: icon});
	    } else if (Notification.permission !== 'denied') {
	    	Notification.requestPermission(function (permission) {
				if (permission === "granted") {
					new Notification(title ,{body: body, icon: icon});
				}
	    });
	  }
	}

	function err(body, title) {
		log(body, title, logger.sadIcon);
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
		err: err,
		init: init,
		destroy:destroy,
		happyIcon: happyIcon,
		sadIcon: sadIcon
	}
})();
