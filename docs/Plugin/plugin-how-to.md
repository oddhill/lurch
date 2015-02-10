###How to create an plugin

####Package.json
First we need to create an package.json.
package.json should include a object that have the following properties, `name` and `main`.

The `name` property should contain the name of your plugin. For example ”Revert all features”.
The `main` property should tell lurch the name of the file which contains the plugin’s functionality.

Create `package.json`:

```json
{
  "name": "Revert all features",
  "main": "main.js"
}
```

When you have a `package.json` file done you can proceed to creating the plugin.
In this example our file will be named `main.js`.

####Main.js

When creating your plugin you should create a new function named `run()` with the parameters `lurch` and `callback`.

Example:

```js
module.exports.run = function(lurch, callback) {
  // Put code here.
};
```
You have the lurch object available in your plugin. This object contains methods and values usable for your plugin.

For executing terminal commands you should use the `execute` method.

Example:
```js
lurch.execute('cd ' + lurch.current.path + ' && drush fra -y', function(error, stdout, stderr) {
  // Handle response here.
});
```

####Callback to Lurch
The callback to lurch should contain an object with the following items:

`success` A boolean wether the plugin run successfully or not.

`message` A string containing notification message.

Example:
```javascript
var status = { success: true, message: 'Success!' };
callback(status);
```
