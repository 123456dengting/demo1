const router = require('express').Router();
// const Utils = require('../utils/utils');
// const config = require('../config/config');
const path = require('path');
router.get('/get/code', async(req, res, next) => {
    const { codePath } =  req.query;
    console.log(path.resolve(codePath), codePath);
    // const ret = await Utils.readFilePromise(path.resolve(path.resolve(__dirname, config['DATA_PATH'] + '/' + codePath)) );
    // res.send({ msg: 'success', code: 0, data: ret });
})

module.exports = router;
