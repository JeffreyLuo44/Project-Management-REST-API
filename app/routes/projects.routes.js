const express = require("express");

module.exports = app => {
  const ProjectController = require("../controllers/projects.controller");

  // Creating Router() object
  let router = express.Router();
    
  // Provides general logging function
  router.use(function(req,res,next) {
    console.log("/" + req.method);
    next();
  });
  
  // All routes provided here

  /*
  * Returns a message detailing what routes are supported by the RESTful API
  */
  //Testing examples on Postman:
  //Intended HTTP GET Request: "http://localhost:3000/api/"
  //Response code: 200 OK
  router.get("/",function(req,res) {
    res.json({"message" : "Supports:\n POST /projects/\n GET /projects/\n GET /project/id=:id\n GET /project/name=:name\n PUT /project/:id\n DELETE /project/:id\n DELETE /projects/"});
  });

  /*
  * Create Projects by inputting valid data in x-www-form-urlencoded
  */
  //Testing examples on Postman:
  //Intended HTTP POST Request with valid input in x-www-form-urlencoded: http://localhost:3000/api/projects
  //Response code: 201 CREATED
  //Error testing:
  //HTTP POST Request with invalid input in x-www-form-urlencoded: http://localhost:3000/api/projects
  //e.g., project name, desc, start date and end date not specified properly, start date is later than end date
  //Response code: 400 Bad Request
  router.post("/projects/",function(req,res) {
    ProjectController.setProjectEntry(req,res);
  });

  /*
  * Retrieves all project data in JSON format
  */
  //Testing examples on Postman:
  //Intended HTTP GET Request: "http://localhost:3000/api/projects/"
  //Response code: 200 OK
  //Error testing:
  //HTTP GET Request when there is no data in database table: "http://localhost:3000/api/projects/"
  //Response code: 404 Not Found
  router.get("/projects/",function(req,res) {
    ProjectController.getProjectEntries(req,res);
  });

  /*
  * Retrieves project data by id in JSON format
  */
  //Testing examples on Postman:
  //Intended HTTP GET Request: "http://localhost:3000/api/project/id/4"
  //Response code: 200 OK
  //Error testing:
  //HTTP GET Request when parameter is not a number: "http://localhost:3000/api/project/id/string"
  //Response code: 400 Bad Request
  //HTTP GET Request when the resource is not found: "http://localhost:3000/api/project/id/101"
  //Response code: 404 Not Found
  router.get("/project/id/:id",function(req,res) {
    //If id parameter is not a number
    if (isNaN(req.params.id)){
      res.status(400).send({
        message: "Please provide a valid id in the request"
            });
    }else{
      ProjectController.getProjectEntriesBy(req,res);
    }

  });

  /*
  * Retrieves project data by name in JSON format
  */
  //Testing example on Postman: 
  //Intended HTTP GET Request: "http://localhost:3000/api/project/name/CRM System"
  //Response code: 200 OK
  //Error testing:
  //HTTP GET Request when the resource is not found: "http://localhost:3000/api/project/name/Testing"
  //Response code: 404 Not Found
  router.get("/project/name/:name",function(req,res) {
    ProjectController.getProjectEntriesBy(req,res);
  });

  /*
  * Update project data by id
  */
  //Testing example on Postman: 
  //Intended HTTP PUT Request with valid input in x-www-form-urlencoded: http://localhost:3000/api/project/4
  //Response code: 204 No Content
  //Error testing:
  //HTTP PUT Request when parameter is not a number: "http://localhost:3000/api/project/string"
  //Response code: 400 Bad Request
  //HTTP PUT Request with invalid input in x-www-form-urlencoded: http://localhost:3000/api/project/4
  //e.g., project name, desc, start date and end date not specified properly, start date is later than end date
  //Response code: 400 Bad Request
  //HTTP PUT Request when the resource is not found: "http://localhost:3000/api/project/101"
  //Response code: 404 Not Found
  router.put("/project/:id",function(req,res) {
    //If id parameter is not a number
    if (isNaN(req.params.id)){
      res.status(400).send({
        message: "Please provide a valid id in the request"
            });
    }else{
      ProjectController.updateProjectEntry(req,res);
    }
  });

  /*
  * Delete project data by id
  */
  //Testing examples on Postman:
  //Intended HTTP DELETE Request: "http://localhost:3000/api/project/4"
  //Response code: 204 No Content
  //Error testing:
  //HTTP DELETE Request when parameter is not a number: "http://localhost:3000/api/project/id/string"
  //Response code: 400 Bad Request
  //HTTP DELETE Request when the resource is not found: "http://localhost:3000/api/project/101"
  //Response code: 404 Not Found
  router.delete("/project/:id",function(req,res) {
    //If id parameter is not a number
    if (isNaN(req.params.id)){
      res.status(400).send({
        message: "Please provide a valid id in the request"
            });
    }else{
      ProjectController.deleteProjectEntriesBy(req,res);
    }
  });

  /*
  * Delete all project data
  */
  //Testing example on Postman:
  //Intended HTTP DELETE Request: "http://localhost:3000/api/projects/"
  //Response code: 204 No Content
  router.delete("/projects/",function(req,res) {
    ProjectController.deleteProjectEntries(req,res);
  });

  // Now tell express to use this router, prefixed with /api
  app.use("/api",router);

  //Any other poorly formed route will give a response code of 404 Not Found
}