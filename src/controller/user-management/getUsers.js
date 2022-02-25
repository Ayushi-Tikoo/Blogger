const runQuery = require('../../db/db');

const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await runQuery(query);
    if (!result) {
      res.status(400).json({ msg: 'No Users Found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getUsers;
