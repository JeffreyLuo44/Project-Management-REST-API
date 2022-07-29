const Project = require("../models/projects.model");

/*
* Checking for valid data, then calling method to set entry
*/
exports.setProjectEntry = (req,res) => {
    //Debug
    //console.log(req.body);
    //Valid data checking
    //Check if project name has been given or not
    if (req.body.name){
        var name = req.body.name;
    }else{
        res.status(400).send({
            message: "Please specify a project name"
        });
        return;
    }
    //Check if project description has been given or not
    if (req.body.desc){
        var desc = req.body.desc;
    }else{
        res.status(400).send({
            message: "Please specify a project description"
        });
        return;
    }
    //Regex to check "YYYY-MM-DD" format
    var regex = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;
    //Check if start date has been given or not
    if (regex.test(req.body.startdate)){
        var startdate = req.body.startdate;
    }else{
        res.status(400).send({
            message: "Please specify a valid project start date in YYYY-MM-DD format"
        });
        return;
    }
    //Check if end date has been given or not
    if (regex.test(req.body.enddate)){
        var enddate = req.body.enddate;
    }else{
        res.status(400).send({
            message: "Please specify a valid project end date in YYYY-MM-DD format"
        });
        return;
    }
    //Check if start date is later than end date
    if (new Date(startdate).getTime() > new Date(enddate).getTime()){
        res.status(400).send({
            message: "Please specify a start date earlier than or on the end date"
        });
        return;
    }

    //Create a new project with the valid input as parameters
    let project = new Project(name, desc, startdate, enddate);
    
    Project.setEntry(project, (err,data) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Send back sucessful response
        else {
            res.sendStatus(201);
        }	
    });
}

/*
* Calling method to retrieve all project entries
*/
exports.getProjectEntries = (req,res) => {
    Project.getAll( (err,data) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Client error
        else if (data.length == 0){
            res.status(404).send({
            message: "Request is valid but the table is empty"
                });
        }
        //Send back sucessful response
        else {
            //Sending 200 OK response with data
            res.json(data);
        }	
    });
}

/*
* Calling method to retrieve project entries either by project id or name
*/
exports.getProjectEntriesBy = (req,res) => {
    Project.getProjectsBy(req, (err,data) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Client error
        else if (data.length == 0){
            res.status(404).send({
            message: "Request is valid but resource is not present"
                });
        }
        //Send back sucessful response
        else {
            //Sending 200 OK response with data
            res.json(data);
        }	
    });
}

/*
* Calling method to update project entries by project id
*/
exports.updateProjectEntry = (req,res) => {
    //Debug
    //console.log(req.body);
    //Valid data checking
    //Check if project name has been given or not
    if (req.body.name){
        var name = req.body.name;
    }else{
        res.status(400).send({
            message: "Please specify a project name"
        });
        return;
    }
    //Check if project description has been given or not
    if (req.body.desc){
        var desc = req.body.desc;
    }else{
        res.status(400).send({
            message: "Please specify a project description"
        });
        return;
    }
    //Check if start date has been given or not
    var regex = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (regex.test(req.body.startdate)){
        var startdate = req.body.startdate;
    }else{
        res.status(400).send({
            message: "Please specify a valid project start date in YYYY-MM-DD format"
        });
        return;
    }
    //Check if end date has been given or not
    if (regex.test(req.body.enddate)){
        var enddate = req.body.enddate;
    }else{
        res.status(400).send({
            message: "Please specify a valid project end date in YYYY-MM-DD format"
        });
        return;
    }
     //Check if start date is later than end date
    if (new Date(startdate).getTime() > new Date(enddate).getTime()){
        res.status(400).send({
            message: "Please specify a start date earlier than or on the end date"
        });
        return;
    }

    //Create a new project with the valid input as parameters
    let project = new Project(name, desc, startdate, enddate);
    
    Project.updateEntry(req, project, (err,changed) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Client error
        else if (changed == false){
            res.status(404).send({
            message: "Request is valid but resource is not present"
                });
        }
        //Send back sucessful response
        else {
            console.log("Project was successfully updated");
            res.sendStatus(204);
        }	
    });
}

/*
* Calling method to delete project entries by project id
*/
exports.deleteProjectEntriesBy = (req,res) => {
    Project.deleteProjectsBy(req, (err,changed) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Client error
        else if (changed == false){
            res.status(404).send({
            message: "Request is valid but resource is not present"
                });
        }
        //Send back sucessful response
        else {
            console.log("Project was successfully deleted");
            res.sendStatus(204);
        }	
    });
}

/*
* Calling method to delete all project entries
*/
exports.deleteProjectEntries = (req,res) => {
    Project.deleteAll((err,changed) => {
        //Server error
        if (err) {
            res.status(500).send({
            message: err
                });
        }
        //Send back sucessful response
        else {
            console.log("All projects were successfully deleted");
            res.sendStatus(204);
        }	
    });
}