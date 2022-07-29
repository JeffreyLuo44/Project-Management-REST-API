const connection = require("./db");

const table_name="projects";

//Constructor for Project that takes in project data as parameters
const Project = function(name, desc, startdate, enddate) {
  this.name  = name;
  this.desc = desc;
  this.startdate = startdate;
  this.enddate = enddate;
};

/*
* Inserting project entry into the database table
*/
Project.setEntry = (project,resultCallback) => {
  var sql = "INSERT INTO `" + table_name + "` (`projectname`, `projectdesc`, `startdate`, `enddate`)";
  sql += " VALUES ('"+project.name+"','"+project.desc+"','"+project.startdate+"','"+project.enddate+"')";
  //Attempt to execute query on database table
  connection.query(sql, function (err, result) {
  //Server error
  if (err) {
    resultCallback(err,null);
  }
  //Query successfully executed
  else {
    console.log("Added project: " + project.name);
    resultCallback(null,null);
  }
  });
}

/*
* Selecting all project entries from the database table and returning the result
*/
Project.getAll = (resultCallback) => {
  var sql = "SELECT * FROM `" + table_name + "`";
  //Attempt to execute query on database table
  connection.query(sql, function (err, result) {
  let project_entries = []
  //Server error
  if (err) {
    resultCallback(err, null);
  }
  //Query successfully executed
  else {
    //Iterate through the resulting rows
    for (const project_entry_row of result) {
      //Use object literal to get the values of the columns
      const project_entry = {
        id: project_entry_row.id,
        name: project_entry_row.projectname,
        desc: project_entry_row.projectdesc,
        startdate: project_entry_row.startdate,
        endddate: project_entry_row.enddate
      };
      //Add project entry to array of project entries
      project_entries.push(project_entry);
    }
    //Return the project entries
    resultCallback(null,project_entries);
  }
  });
}

/*
* Selecting project entries from the database table depending on either the project name or id and returning the result
*/
Project.getProjectsBy = (req, resultCallback) => {
  //If no id parameter was given, the name must have been given
  if (req.params.id == null){
    var sql = "SELECT * FROM `" + table_name + "` WHERE `projectname` = '" + req.params.name + "'";
  }
  //If no name parameter was given, the id must have been given
  if (req.params.name == null){
    var sql = "SELECT * FROM `" + table_name + "` WHERE `id` = " + req.params.id;
  }
  //Attempt to execute query on database table
  connection.query(sql, function (err, result) {
  let project_entries = []
  //Server error
  if (err) {
    resultCallback(err, null);
  }
  //Query successfully executed
  else {
    //Iterate through the resulting rows
    for (const project_entry_row of result) {
      //Use object literal to get the values of the columns
      const project_entry = {
        id: project_entry_row.id,
        name: project_entry_row.projectname,
        desc: project_entry_row.projectdesc,
        startdate: project_entry_row.startdate,
        endddate: project_entry_row.enddate
      };
      //Add project entry to array of project entries
      project_entries.push(project_entry);
    }
    //Return the project entries
    resultCallback(null,project_entries);
  }
  });
}

/*
* Updating project entries in the database table by the project id
*/
Project.updateEntry = (req, project,resultCallback) => {
  var sql = "UPDATE `" + table_name + "` SET `projectname` = '" + project.name + "', `projectdesc` = '" + project.desc + 
  "', `startdate` = '" + project.startdate + "', `enddate` = '" + project.enddate + "'";
  sql += " WHERE `id` = " + req.params.id;
  //Attempt to execute query on database table
  connection.query(sql, function (err, result) {
  //Server error
  if (err) {
    console.log(err);
    resultCallback(err,null);
  }
  //Query successfully executed but nothing happened because the resource does not exist
  else if (result.affectedRows == 0){
    resultCallback(null, false);
  }
  //Query successfully executed
  else {
    console.log("Updated project with id: " + req.params.id);
    resultCallback(null,null);
  }
  });
}

/*
* Deleting project entries in the database table by the project id
*/
Project.deleteProjectsBy = (req, resultCallback) => {
  sql = "DELETE FROM `" + table_name + "` WHERE `id` = '" + req.params.id + "'";
  //Attempt to execute query on database table
  connection.query(sql, function (err, result) {
  //Server error
  if (err) {
    resultCallback(err, null);
  }
  //Query successfully executed but nothing happened because the resource does not exist
  else if (result.affectedRows == 0){
    resultCallback(null, false);
  }
  //Query successfully executed
  else {
    resultCallback(null, null);
  }
  });
}

/*
* Deleting all project entries in the database table
*/
Project.deleteAll = (resultCallback) => {
  //Deletes all rows and conveniently resets the id auto increment back to 1
  var sql = "truncate `" + table_name + "`";
  //Query successfully executed but nothing happened because the resource does not exist
  connection.query(sql, function (err, result) {
  //Server error
  if (err) {
    resultCallback(err, null);
  }
  //Query successfully executed
  else {
    resultCallback(null, null);
  }
  });
}
module.exports = Project;