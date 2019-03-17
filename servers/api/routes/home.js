var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var uuid = require('../helpers/uuid');
var dbEntityController = require('../controllers/dbEntityController');
var entity = 'home';

var create = async (req, res) => {
    var home = req.body;

    if (!home.id) {
        home.id = uuid.create();
    }

    try {
        var result = await dbEntityController.create(entity, home);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

var update = async (req, res) => {
    var home = req.body;
    var criteria = { id: home.id };

    try {
        await dbEntityController.update(entity, home, criteria);
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
        if (by === 'user') {
            by = 'userID';
        }
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
