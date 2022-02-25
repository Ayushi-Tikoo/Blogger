/**
 * Dependency Imports
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

/**
 * Instantiating app
 */
const app = express();

/**
 * File Imports
 */
const userRouter = require('./src/routes/users');
const blogRouter = require('./src/routes/blogs');

const PORT = process.env.PORT || 5000;

/**
 * Configuring app
 */
app.use(express.json());
dotenv.config();
app.use(cors());

/**
 * Setting Routes
 */
app.use('/user/', userRouter);
app.use('/blog/', blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
