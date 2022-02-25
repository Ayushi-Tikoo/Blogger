const runQuery = require('../../db/db');

const getBlogByUserId = async (req, res) => {
  try {
    const id = req.user.id;
    const query = `Select * from blog where author='${id}' ORDER BY date DESC`;
    const result = await runQuery(query);

    if (!result.rowCount) {
      return res.status(400).json({ msg: 'No Blogs Found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getBlogByUserId;
