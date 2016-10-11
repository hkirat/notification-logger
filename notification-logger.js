(function() {
	Notification.requestPermission();
	function log(body, title) {
		title = title || "alert";
		if (!("Notification" in window)) {
		    alert("This browser does not support desktop notification");
	  	} else if (Notification.permission === "granted") {
			new Notification(title ,{body: body});
	    } else if (Notification.permission !== 'denied') {
	    	Notification.requestPermission(function (permission) {
				if (permission === "granted") {
					new Notification('alert' ,{body: body});
				}
	    });
	  }
	}
	window.logger = {
		log: log
	}
})();