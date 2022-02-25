const runQuery = require('../../db/db');
const validator = require('validator');

const validateCredentials = ({ title, category }) => {
  if (!validator.isEmpty(title) && !validator.isEmpty(category)) {
    return true;
  } else {
    return false;
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const { title, description, category, tags } = req.body;

    if (req.file) {
      var image = req.file.key;
    }

    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Title and category is required' });
    }
    if (req.file) {
      var query = `UPDATE  blog SET title ='${title}', description = '${description}', image ='${image}', category ='${category}', tags='${tags}' WHERE id='${req.params.id}' RETURNING title, description, category, tags  `;
    } else {
      query = `UPDATE  blog SET title ='${title}', description = '${description}', category ='${category}', tags='${tags}' WHERE id='${req.params.id}' RETURNING title, description, category, tags  `;
    }

    const result = await runQuery(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = updateBlog;
