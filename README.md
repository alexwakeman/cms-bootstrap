# Angular2 & Express Content Management System Bootstrap  

The project was started to provide a common base to start any custom Content Management Platform, from previous experience in building these kind of tools. 
It implements best practices in terms of Angular2 project structure and Node server security. Several security features are used including:

[Helmet][1], [Express API Rate Limiter][2] and [Express Session][3]

[1]: https://www.npmjs.com/package/helmet
[2]: https://www.npmjs.com/package/express-rate-limit
[3]: https://www.npmjs.com/package/express-session

MongoDB is used for the database, and Gulp for the build tool. The UI is based around Twitter Bootstrap CSS framework.

Getting Started, grab the dependencies with:

`npm install`

You'll need to ensure the base ES6 typings are available to Angular2 and TypeScript by running:

`typings install dt~es6-shim --global --save`

or just 

`typings install`

-----

To build the app, and place all processed files and their dependencies into the `dist` folder, run:

`gulp`

During development, you can use:

`gulp watch` 

This will automatically re-run relevant parts of the build process whenever changes are made. This includes starting and re-starting the Node server.

##Notes:

- Inside `server/server.js` there is a flag called `ENABLE_AUTH` that's used to switch on session authentication. When you first run the app there are no users so you cannot login.
Once you have successfully run the app, navigate to http://localhost:3000/cms/ and create a user account under Users. Once this is done you can then set `ENABLE_AUTH` to `true`, to log in securely. 