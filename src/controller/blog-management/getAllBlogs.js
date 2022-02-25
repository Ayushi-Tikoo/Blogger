const runQuery = require('../../db/db');

const getAllBlogs = async (req, res) => {
  try {
    const query = 'Select * from blog ORDER BY date DESC';
    const result = await runQuery(query);
    if (!result) {
      return res.status(400).json({ msg: 'No Blogs Found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getAllBlogs;
