const db = require("../db");

exports.signUp = async (req, res) => {
  console.log("signUp hit");
  db.query("select * from ecomf_master_user").then(result => {
    console.log(result.rows);
    res.send(result.rows);
  });
};
