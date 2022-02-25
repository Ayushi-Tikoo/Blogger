const express = require('express');
const router = express.Router();
const getUsers = require('../controller/user-management/getUsers');
const loginUsers = require('../controller/user-management/login');
const registerUsers = require('../controller/user-management/register');
const getUsersById = require('../controller/user-management/getUsersById');
const auth = require('../Middleware/auth');

router.get('/getAllUsers', (req, res) => {
  getUsers(req, res);
});

router.get('/getUsersById', auth(), (req, res) => {
  getUsersById(req, res);
});

router.post('/login', (req, res) => {
  loginUsers(req, res);
});

router.post('/register', (req, res) => {
  registerUsers(req, res);
});

module.exports = router;
