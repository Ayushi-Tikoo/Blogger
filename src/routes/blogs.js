const express = require('express');
const router = express.Router();
const addBlog = require('../controller/blog-management/addBlog');
const deleteBlog = require('../controller/blog-management/deleteBlog');
const getAllBlogs = require('../controller/blog-management/getAllBlogs');
const getBlogByUserId = require('../controller/blog-management/getBlogByUserId');
const updateBlog = require('../controller/blog-management/updateBlog');
const getByBlogId = require('../controller/blog-management/getByBlogId');
const auth = require('../Middleware/auth');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
});

const s3 = new aws.S3();
const upload = multer({
  limits: {
    fileSize: 1000000
  },

  storage: multerS3({
    acl: 'public-read',
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: 'blogmanagementimage',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  }),

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error('Please upload a image'));
    }
    cb(undefined, true);
  }
});

router.get('/', (req, res) => {
  getAllBlogs(req, res);
});

router.get('/getByUserId/', auth(), (req, res) => {
  getBlogByUserId(req, res);
});

router.get('/getByBlogId/:id', auth(), (req, res) => {
  getByBlogId(req, res);
});

router.post('/', auth(), upload.single('blog'), (req, res) => {
  addBlog(req, res);
});

router.delete('/deleteid/:id', auth(), (req, res) => {
  deleteBlog(req, res);
});

router.put('/:id', auth(), upload.single('blog'), (req, res) => {
  updateBlog(req, res);
});

module.exports = router;
