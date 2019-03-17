var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var dbEntityController = require('../controllers/dbEntityController');
var userEntity = 'user';
var homeEntity = 'home';

var find = async (req, res) => {
    var homeID = req.params.homeID;

    try {
        var neighbors = [];
        var homes = await dbEntityController.find(homeEntity, {id: homeID});
        if (homes.length > 0) {
            var home = homes[0];
            var neighborHomes = await dbEntityController.find(homeEntity, {'location.township': home.location.township});
            for (var i = 0; i < neighborHomes.length; i++) {
                var neighborID = neighborHomes[i].userID;
                var users = await dbEntityController.find(userEntity, {id: neighborID});
                
                if (users.length > 0){
                    var user = users[0];
                    var neighbor = {
                        id: user.id,
                        name: user.name
                    };
                    
                    neighbors.push(neighbor);
                }
            }
        }
        http.res(res, neighbors);
    } catch(err) {
        http.err(res, err);
    }
}

router.get('/:homeID', find);

module.exports = router;
