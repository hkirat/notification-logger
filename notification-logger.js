(function() {
	var isInitialized = false, _console = {};
	Notification.requestPermission();
	function log(body, title) {
		title = title || "Notification";
		if (!("Notification" in window)) {
		    alert("This browser does not support desktop notification");
	  	} else if (Notification.permission === "granted") {
			new Notification(title ,{body: body});
	    } else if (Notification.permission !== 'denied') {
	    	Notification.requestPermission(function (permission) {
				if (permission === "granted") {
					new Notification(title ,{body: body});
				}
	    });
	  }
	}

	function genericLogger() {
		return function (body, title) {
			title = title || "Notification";
			if (!("Notification" in window)) {
			    alert("This browser does not support desktop notification");
			} else if (Notification.permission === "granted") {
				new Notification(title ,{body: body});
		    } else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function (permission) {
					if (permission === "granted") {
						new Notification(title ,{body: body});
					}
				});
			}
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
		destroy:destroy
	}
})();