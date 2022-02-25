var runQuery = require('../../db/db');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateCredentials = ({ email, password }) => {
  if (!validator.isEmpty(email) && !validator.isEmpty(password)) {
    if (validator.isEmail(email)) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

const generateAuthToken = async (email) => {
  const query = `SELECT id from users WHERE email ='${email}'`;
  const result = await runQuery(query);
  const id = result.rows[0].id;

  const payload = {
    user: {
      id: id
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 360000
  });
  return token;
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Invalid Inputs' });
    }
    const query = `SELECT email,password FROM users WHERE email='${email}'`;
    const result = await runQuery(query);

    if (!result.rowCount) {
      return res.status(404).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, result.rows[0].password);

    if (!isMatch) {
      return res.status(404).json({ msg: 'Invalid Credentials' });
    }
    const token = await generateAuthToken(email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = loginUsers;
