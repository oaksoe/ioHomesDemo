var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var uuid = require('../helpers/uuid');
var dbEntityController = require('../controllers/dbEntityController');
var entity = 'ads';

var create = async (req, res) => {
    var post = req.body;

    if (!post.id) {
        post.id = uuid.create();
    }

    try {
        var result = await dbEntityController.create(entity, post);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

var update = async (req, res) => {
    var post = req.body;
    var criteria = { id: post.id };

    try {
        await dbEntityController.update(entity, post, criteria);
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
    
    let query = {};
    let searchString = req.query.search;

    if(searchString) {

        let searchRegex = new RegExp(searchString, "i");
        searchString = {$or: [
            { 'title': searchRegex },
            { 'description': searchRegex }
        ]}
        query = searchString;
    }
    try {
        var result = await dbEntityController.find(entity, query);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/', create);
router.put('/', update);
router.delete('/:id', remove);
router.get('/', find);

module.exports = router;
