# bunny-tasks
A set of rest endpoints for todos by bunny users


## Table of Content

 * [Usage](#usage)

 * [Link to Base URL](#link-to-base-url)

 * [Built With](#built-with)
 
 * [Project setup](#project-setup)

 * [API Documentation](#api-documentation)
 
 * [Author](#author)
## Usage
#### Exposed endpoints:
| Endpoint                                         | Purpose                                                             |
|--------------------------------------------------|---------------------------------------------------------------------|
| POST `/tasks/:id`                                | Creates a task with a userId                                        |
| GET `/tasks/:id/all`                             | Fetches a list of all tasks by a userId                             |
| PATCH `/tasks/:id`                               | Updates a task by its id                                            |
| PATCH `/tasks/:id/done`                          | Updates a task state to done                                        |

## Link to Base URL
 * [link](https://bunnystudio-task.herokuapp.com/)


## Built With
 * [Express.js](https://expressjs.com/)

 * [Typescript](https://www.typescriptlang.org/)

 * [Node.js](https://nodejs.org/en/)

 * [MongoDB](https://www.mongodb.com/)

 * [Postman](https://www.postman.com/)


## Project Setup
### Installing dependencies
```
yarn install
```
### Compiles and minifies for production
```
yarn build
```

### Start server
To lint the code run:

```
yarn start:dev
```

## API Documentation
*  [documentation](https://www.getpostman.com/collections/01c954f64112385eddfd)

## Author
*  [Chioma Onyekpere](https://www.linkedin.com/in/chioma-onyekpere)