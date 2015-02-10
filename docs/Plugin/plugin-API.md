# Plugin API documentation

When creating a plugin you have access to the `lurch` object variable which contains methods and information from Lurch.

## Methods
**lurch.execute()**

Method for running terminal commands.

Example:
```javascript
lurch.execute('cd ' + lurch.current.path + ' && ls', function(error, stdout, stderr) {
    // Handle response here.
});
```
## Values
**lurch.current**

Contains current project information.

Get the name of the current project.
`lurch.current.name`

Get the path to the current project.
`lurch.current.path`

Example:
```javascript
var name = lurch.current.name;
var path = lurch.current.path;
console.log('Current project is: ' + name + ' with this path: ' + path);
```

## Callback to lurch
The callback to lurch should contain an object with the following items:

`success` A boolean wether the plugin run successfully or not.

`message` A string containing notification message.

Example:
```javascript
var status = { success: true, message: 'Success!' };
callback(status);
```

## Plugin menu
Create a menu for your plugin. (A submenu in the tray menu). Example beneath.
```Javascript
module.exports.menu = function(callback) {
  var menuItems = [];

  // Add menu items
  menuItems.push({
    label: 'Label 1',
    click: function() {
      menuHandler(this);
    }
  });

  menuItems.push({
    label: 'Label 2',
    click: function() {
      menuHandler(this);
    }
  });

  callback(menuItems);
};
```
Important, the function needs to be named `menu`.
An entry in package.json is also needed.
`{ "menu": true }`
