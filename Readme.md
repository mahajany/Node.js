Welcome to Node.js Express Training Program
==============================================
* Node.JS
* Express
2017-11-01: Versions: 
    $ npm -v 
    5.5.1 
    $ node -v 
    v9.0.0 


1. ### 01Start
   #### Imported module 

2. ### 02NodeModules 
    #### Functions is the same file 
    - Initialize it as: `npm init` 
    - Run it as: npm start 
    * Enter various defaults and then see the contents of package.json 
    Package.json is the mainifest file for a project. 
    * Edit section scripts, add this:     `"start": "node index"` 
    - `npm start` _VS_ `node index` 

    
3. ### 03Callbacks_n_ErrorHandling$
#### Callbacks
#### Error handling
*Closures:* 
- Functionl lanugages.
- A function defined inside another function has access to all the variables declared in the outer function (outer scope). 
- The inner function will continue to have access to the variables from the outer scope even after the outer function has returned. 

*Synchronous* VS *Asynchronous Programming*
- First class functions 
- NOde, Async I/O and Callback - Node is spawned in a single thread event-loop.
- Event loop
- Closure assures that the variables are available to the last one of internal function even when not supplied explicitely, but then these should NOT be specified in the exported callback'ed functions as well.

4. ###   04NodeHttpServer
- A basic http server
- Notice the `huh` in package.json - now `npm huh` will do things similar to `npm start` or `node index`.
- try server.end() with and withou the inline html code.


5. ###   05NodeHttpServer
- Expand server crated in last module to server static resources 
- Create aboutus.html and index.html in a folder named as public
- Now fs and path modules will be used

6. ### 06Express
- A fast, unopinionated, minimalist web framewrok for Node.js
- 3rd party "middleware" to extend functionality
- `npm express --save`
- Morgan for loggin
- "dependencies" - in package.json
- Express dependencies.
- package.log.json file in dependencies.
- `npm express --save`
- middleware





## Resources:
Git cheat sheet - <https://docs.google.com/viewer?url=https%3A%2F%2Fservices.github.com%2Fon-demand%2Fdownloads%2Fgithub-git-cheat-sheet.pdf>

[Top 10 most common mistakes that Node.js developers make] (https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes)

[Asynchronous JavaScript with Callbacks](https://brandonwamboldt.ca/asynchronous-javascript-with-callbacks-1769/)