var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var dbEntityController = require('../controllers/dbEntityController');
var entity = 'user';

var create = async (req, res) => {
    var user = req.body;

    try {
        var result = await dbEntityController.create(entity, user);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

var update = async (req, res) => {
    var user = req.body;
    var criteria = { id: user.id };

    try {
        await dbEntityController.update(entity, user, criteria);
        http.res(res, null);
    } catch(err) {
        http.err(res, err);
    }
}

var remove = async (req, res) => {
    var id = req.params.id;

    try {
        await dbEntityController.remove(entity, { id: id });
        http.res(res, null);
    } catch(err) {
        http.err(res, err);
    }
}

var find = async (req, res) => {
    var by = req.params.by;
    var criteria = {};
    
    if (by && by !== 'none') {
        criteria[by] = req.params.criteria;
    }

    try {
        var result = await dbEntityController.find(entity, criteria);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/create', create);
router.put('/', update);
router.delete('/:id', remove);
router.get('/:by/:criteria', find);

module.exports = router;
