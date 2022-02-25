const runQuery = require('../../db/db');
const validator = require('validator');

const validateCredentials = ({ title, category }) => {
  if (!validator.isEmpty(title) && !validator.isEmpty(category)) {
    return true;
  } else {
    return false;
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const image = req.file.key;

    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Title and category is required' });
    }
    const query = `INSERT into blog(title, description, image, category, tags,author) VALUES ('${title}','${description}','${image}','${category}','${tags}','${req.user.id}') RETURNING title, description, image, category, tags,author `;
    const result = await runQuery(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = addBlog;
