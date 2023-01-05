# Labs 6 - 8

This repository is dedicated to building out a fully functional API server that performs CRUD operations via REST as well as an Auth server capable of adding users, logging them in, and providing middleware that can be used to protect any route.

Each phase of the project is delineated below, broken up into labs.

Author: Andra Steele

Links and Resources:

[CI/CD]()

Setup/.env requirements:

- Initialize using 
```javascript 
npm start
```

Tests:

- To run tests, use 
``` javascript
npm test
```


## Problem domain

**From a business requirements standpoint, we will be building a basic Express server using best practices, including server modularization, use of middleware, and tests.**

### Testing requirements

**Assert the following:**

- 404 on a bad route

- 404 on a bad method

- 500 if no name in the query string

- 200 if the name is in the query string

- given an name in the query string, the output object is correct

[Deployed URL](https://basic-express-server-steele.onrender.com/)

# Lab 6: Authentication

Authentication System 

- Phase 1: Deploy an Express server that implements Basic Authentication, with signup and signin capabilities, using a Postgres database for storage.

**Phase 1 Requirements**

- As a user, I want to create a new account so that I may later login
- Using an HTTP REST client or a web form:
  - Make a POST request to the/signup route with username and password.
  - Your server should support both JSON and FORM data as input.
  - On a successful account creation, return a 201 status with the user object in the body.
  - On any error, trigger your error handler with an appropriate error.
- As a user, I want to login to my account so that I may access protected information
- Using am HTTP REST client, or a web form:
  - Make a POST request to the /signin route.
  - Send a basic authentication header with a properly encoded username and password combination.
  - On a successful account login, return a 200 status with the user object in the body.
  - On any error, trigger your error handler with the message “Invalid Login”.

**Technical Requirements**

#### Basic Server

- Extract the core server logic into 2 files:
  - index.js (entry point)
  - Connect to the database
- Require the ‘server’ and start it
- server.js service wiring
- Exports an express app/server and a start method

#### Authentication Modules

- Extract the authentication logic for /signin as middleware.
- Create a new node module.
- Interact with the headers and the users model.
- Add the user record (if valid) to the request object and call next().
- Call next() with an error in the event of a bad login.
- Extract the Sequelize Model into a separate module.
- Model the user data.
- Add a before-create hook in the model … Before we save a record:
- Hash the plain text password given before you save a user to the database.
- Create a method in the schema to authenticate a user using the hashed password.
- Create a module to house all of routes for the authentication system.
- Create a POST route for /signup
- Accepts either a JSON object or FORM Data with the keys “username” and “password”.
- Creates a new user record in a Postgres database.
- Returns a 201 with the created user record.
- Create a POST route for /signin.
- Use your basic authentication middleware to perform the actual login task.
- router.post('/signin', basicAuth, (req,res) => {});
- When validated, send a JSON object as the response with the following properties:
- user: The users’ database record

#### Testing

- You should manually test your routes using an HTTP REST client, either in the terminal or an HTTP REST client with a GUI. Additionally, you are required to write automated tests as well:

- POST to /signup to create a new user.
- POST to /signin to login as a user (use basic auth).
- Need tests for auth middleware and the routes.
- Does the middleware function (send it a basic header).
- Do the routes assert the requirements (signup/signin).
- This is going to require more “end to end” testing than you’ve done in the past.
- To test signin, your tests actually need to create a user first, then try and login. i.e. - The signin test will rely on the success of the signup test.

# Lab 7: Bearer Authorization

**Phase 2 Requirements**

In this phase, the new requirement is that any user that has successfully logged in using basic authentication (username and password) is able to continuously authenticate … using a “token”

Note: All previous requirements and user stories are still required. This Phase is intended to add functionality to our existing authentication server.

The following core requirements detail the functionality for this phase of the project.

- As a user, I want to obtain a token after I signin, so that I can re-authenticate
Using an HTTP REST client, or a web form:
Following a POST to /signup to create an account (or) Following a POST to /signin with basic authorization
Send a response to the client with the proper status code along with an object with the following properties

```javascript
{
  user: {
    _id: 'ID FROM DB',
    username: 'myusername'
  },
  token: 'JWT Token Here'
}
```

- As a user, I want to use my token to access routes that require a valid user
  - Using an HTTP REST client, send a request to a “protected” route, such as /secretstuff
  - Your request must send an “Authorization” header, with the value of Bearer TOKEN
  - TOKEN is the token that you would have returned to the user after their signin step (above)
  - If the TOKEN is valid (i.e. if it represents an actual user)
  - The route should function as it normally would (sending a response)
  - If not, send the user an error message stating “Invalid Login”
- As the website owner, I want our token system to be as secure as possible so that our users can feel safe when logging in
- Research ways to “secure” our JWT Tokens
- Implement one or more methods to secure our login tokens

# LAB - Class 08

## Project: Access Control

### Technical Requirements

Task 1: Combine these 2 servers into a single server

- Your server should respond to the following routes:

  - POST /signup to create a user.
  - POST /signin to login a user and receive a token.
  - GET /secret should require a valid bearer token.
  - GET /users should require a valid token and “delete” permissions.

**NOTE: You will have some duplicated files and functionality between the 2 servers. Eliminate the waste and end with a single running server with all current routes functional.**

Task 2: Create a new set of “Protected” API routes
Restrict access without a valid token AND a specific capability.

- Create a new set of routes (V2) within the server.
  - V2 API Routes (/api/v2/...) must now be protected with the proper permissions based on user capability, using Bearer Authentication and an ACL.
    - app.get(...) should require authentication only, no specific roles.
    - app.post(...) should require both a bearer token and the create capability.
    - app.put(...) should require both a bearer token and the update capability.
    - app.patch(...) should require both a bearer token and the update capability.
    - app.delete(...) should require both a bearer token and the delete capability.

Task 3: Apply best practices and quality engineering

- Full Test Coverage.
- Well executed UML and WRRC Diagrams.
- Polished and Complete Developer Friendly README.md at the root of your repo.