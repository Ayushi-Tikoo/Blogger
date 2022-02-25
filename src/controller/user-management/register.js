var runQuery = require('../../db/db');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateCredentials = ({ firstname, lastname, email, password }) => {
  if (
    !validator.isEmpty(firstname) &&
    !validator.isEmpty(lastname) &&
    !validator.isEmpty(email) &&
    !validator.isEmpty(password)
  ) {
    if (validator.isEmail(email)) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

const checkIfEmailExist = async (email) => {
  const query = `SELECT email FROM users WHERE email='${email}'`;
  const result = await runQuery(query);
  if (result.rowCount) {
    return true;
  }
  return false;
};

const registerUsers = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Invalid Inputs' });
    }
    const emailExist = await checkIfEmailExist(email);
    if (emailExist) {
      return res.status(400).json({ msg: 'Email Already exist' });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const query = `INSERT INTO users(firstname, lastname, email, password) VALUES('${firstname}','${lastname}','${email}','${hashPassword}')`;
    const result = await runQuery(query);
    return res.status(200).json({ msg: 'User is successfully registerd' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = registerUsers;
