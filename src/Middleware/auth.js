const jwt = require('jsonwebtoken');
const runQuery = require('../db/db');

const auth = () => {
  //get token form the header
  return async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res
        .status(401)
        .json({ msg: 'No token found Authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;

      // check authorization
      if (req.params.id) {
        const blogId = req.params.id;
        const userId = req.user.id;

        const findIdQuery = `SELECT id from blog where id='${blogId}'`;
        const resultfindIdQuery = await runQuery(findIdQuery);

        if (!resultfindIdQuery.rowCount) {
          return res.status(401).json({ msg: 'Id does not exsist' });
        }

        const findAuthorquery = `SELECT author from blog WHERE id='${blogId}'`;
        const resultfindAuthorquery = await runQuery(findAuthorquery);
        const id = resultfindAuthorquery.rows[0].author;

        if (id != userId) {
          return res.status(401).json({ msg: 'Not Authorized' });
        }
        return next();
      }
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};
module.exports = auth;
