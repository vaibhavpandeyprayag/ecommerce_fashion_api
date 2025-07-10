const db = require("../db");
const { decrypt, signJwt } = require("../utility");

exports.signUp = async (req, res) => {
  console.log("signUp hit");
  let queryRes = db.query("select * from ecomf_master_user").then(result => {
    console.log(result.rows);
    res.send(result.rows);
  });
};

exports.loginIn = async (req, res) => {
  console.log("loginIn hit");
  console.log(req.body);
  try {
    const { email, password: encrypted_req_password } = req.body;
    const decrypted_req_password = decrypt(encrypted_req_password);
    const queryRes = await db.query(
      `select * from ecomf_master_user where email = '${email}'`
    );
    if (queryRes.rows.length == 0) {
      // user not found
      res.status(404).send({ msg: "User not found", status_code: 404 });
    }
    const decrypted_user_password = decrypt(queryRes.rows[0].password);
    if (decrypted_req_password != decrypted_user_password) {
      // wrong password
      res.status(401).send({ msg: "Wrong password", status_code: 401 });
    }
    const user = queryRes.rows[0];
    delete user["password"];
    const jwt = signJwt({
      id: user.id,
      email: user.email,
      role: user.user_role_id,
    });
    res.status(200).send({
      msg: "Login successful",
      payload: { user: user, token: jwt },
      status_code: 200,
    });
    console.log("queryRes >>", queryRes);
  } catch (err) {
    console.log("err >>", err);
    res.status(500).send({ msg: "Internal server error", status_code: 500 });
  }
};
