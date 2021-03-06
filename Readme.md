Node.js Express Training Program
==============================================
* Node.JS
* Express 
*  Versions used as on Date: 2017-11-01: 
    $ npm -v 
    5.5.1 
    $ node -v  
    v9.0.0 


### 1.  01Start
   - Imported module 

### 2. 02NodeModules 
    #### Functions is the same file 
    - Initialize it as: `npm init` 
    - Run it as: npm start 
    * Enter various defaults and then see the contents of package.json 
    Package.json is the mainifest file for a project. 
    * Edit section scripts, add this:     `"start": "node index"` 
    - `npm start` _VS_ `node index` 

    
### 3. 03Callbacks_n_ErrorHandling$
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

### 4.   04NodeHttpServer
- A basic http server
- Notice the `huh` in package.json - now `npm huh` will do things similar to `npm start` or `node index`.
- try server.end() with and withou the inline html code.


### 5.   05NodeHttpServer
- Expand server crated in last module to server static resources 
- Create aboutus.html and index.html in a folder named as public
- Now fs and path modules will be used

### 6. 06Express
- A fast, unopinionated, minimalist web framewrok for Node.js
- 3rd party "middleware" to extend functionality
- `npm express --save`
- Morgan for loggin
- "dependencies" - in package.json
- Express dependencies.
- package.log.json file in dependencies.
- `npm express --save`
- Add a .gitignore file with "node_modules" writtne in it.

### 7. 07ExpressMiddleware
- middleware 
- morgan - for logging.
- Static files will be picked up automatically.

### 8. 08ExpressREST
- REST API / En-points
- Express routes
- Body parser
- Input for post:
- Use Postman and send this in body using JSON(applicaitn/json):
    {"name": "Pasta", "description": "Yumm yummy, fat tummmy!"}
    GET/POST/PUT/DELETE - with and w/o a dishId
- Check IndexNew.js - run it as `node indexNew.js` - it contains Express 4.x syntax.
- Run both servers simultaneously on 3000 and 3100 - `npm start` and `node indexNew`.
[ExpressJS - Migrating to 4](https://expressjs.com/en/guide/migrating-4.html#core-changes)

### 9. 09ExpressRESTRoutes 
- Arrange URLs / resources / end-points in different routes.
- "mini" express apps - routes.
- routes/dishRouter.js - contains implementation of dishes and dishes/:id routes.
- morgen vs logger (using winston - see `logger.js`)



### 11. 11ExpressGenerator/
 - `express app_name` - generates the scaffolding.
 - You can choose jade, pug...or even angular for client safing.
 - app.js, package.json, public:staic resources, routes:application-routes, views: application-routes.
  - npm install -g express-generator
  - notice now app.js is the default start up, and default routes of index.js and users.js are provided.
  - Configuration Information like port, server api is in file bin/wwww
  - You might have to install extra loggers (winston) and create a logger.js file
  - If you want to start on port 1211 instead of default (3000, in file www), export the variable: `export PORT=1211` ; `npm start` ==> App-server starting at 1211
  - [Express Generator](http://expressjs.com/en/starter/generator.html)


### 12. 12NodeMongo
#### ODM  / ORM - Mongoose
- `npm install mongoose bluebird --save`
- 
### 13. 13NodeMongoose
    - Use Mongoose instead of Node Mongo Driver
    - Using sub-document

#### 14REST-Express-MongoDB-Mongoose
    - Bring this all together - REST API using Express with MongoDB at backend and Mongoose as ODM.
    - ` npm install mongoose-currency`
    - Use following JSON documen for adding dishes:
    `
    {
    "name":           "Pizza",
    "description":    "Ice-ice baby!",
    "comments":       [{"rating":5, "comment":"Good one!", "author": "Yogesh"},
                       {"rating":3, "comment":"OK types!", "author": "Mahajan"}],
    "image":          "pizza.png",
    "category":       "Junk food",
    "label":          "Safe For Kids",
    "price":          250,
    "featured":       true
    }
    `
#### 15BasicAuthentication
    - Basic authentcation
    - Different git version shows how to use basic-authentication throu use-id and password, and then token,
    - User ID "admin" and password "password" are hard-coded in app.js

###  16HandlingUsers
    - Authentication through "users" table in MongoDB    

    -     - For validation, use Postman - POST, JSON(application/json), with folloowing in raw body:{
        username: "someid",
        password: "whatever"
    }
    - login, logout and signup pages.
    - See kids....it should be "module.exports" in the last line of model, otherwise you will keep on getting User.findOne() is NOT a function and will be, like me, clueless - remember an extra S.
    - ...and the problem is that it won't fail - so, req.body.username OR req.body.user - it will still try to do a .save!!

}

## Resources:
Git cheat sheet - <https://docs.google.com/viewer?url=https%3A%2F%2Fservices.github.com%2Fon-demand%2Fdownloads%2Fgithub-git-cheat-sheet.pdf>

[Node.js v9.0.0 Documentation](https://nodejs.org/api/modules.html)
[Top 10 most common mistakes that Node.js developers make](https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes)

[Asynchronous JavaScript with Callbacks](https://brandonwamboldt.ca/asynchronous-javascript-with-callbacks-1769/)

[Developing a REST API with Node, Mongo and Express - see the diagram about middleware](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)