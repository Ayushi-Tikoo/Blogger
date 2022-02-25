const runQuery = require('../../db/db');

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    // delete id

    const deleteQuery = `DELETE from blog WHERE id='${blogId}' RETURNING id`;
    const deleteQueryresult = await runQuery(deleteQuery);

    res.status(200).json(deleteQueryresult.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = deleteBlog;
