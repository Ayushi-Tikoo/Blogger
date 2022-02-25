const runQuery = require('../../db/db');

const getUsersById = async (req, res) => {
  try {
    const query = `SELECT * from users WHERE id='${req.user.id}'`;
    const result = await runQuery(query);
    if (!result.rowCount) {
      return res.status(400).json({ msg: 'No Users Found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getUsersById;
