# Notification Logger [![npm version](https://badge.fury.io/js/notification-logger.svg)](https://badge.fury.io/js/notification-logger)

Ever wondered why you have to open the console every time you want to want to log a variable?

Notification Logger helps provide desktop notification for your console messages.

During development, You have to check the browser's inspector periodically to see what your console.log()'s are saying.

With [notification-logger](https://hkirat.github.io/notification-logger/), you can develop and debug web apps and see console messages as Desktop Notifications.

And it only adds ~50 lines to your project.


[Demo](https://hkirat.github.io/notification-logger/)

Website inspired from [https://github.com/chinchang](chinchang's) [Hint.css](https://kushagragour.in/lab/hint/) website.

## Screenshot

![notification-logger](./images/image.png)

## Installing
 - Use `npm` or `git clone` to download the module.
   - `npm install notification-logger`
   - `git clone https://github.com/hkirat/notification-logger.git`
 - include `notification-logger.js` or `notification-logger.min.js`
 - Initialise with `logger.init()`

## Methods
-----
* `logger.init` - Initialises the logger
* `logger.log` - Logs the message via a Desktop Notification only
* `console.log` - Logs the message via a Desktop Notification and in the browser console
* `logger.destroy` - Reverts console.log to original functionality

## Browser Support

Works best on latest versions of Google Chrome, Firefox and Safari.

## To Do
 - Add Custom Icon to Notifications
 - Unwrap Objects while Logging them as Desktop Notification
