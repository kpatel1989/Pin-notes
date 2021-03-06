var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(global.ROOT_PATH+'/public/index.html');
});

var callback = function (req, res) {
    var controller = req.params.controller;
    var action = req.params.action;

    if (!controller || !action) {
        res.send("Invalid api parameters in request url.");
    }
    else {
        var requirePath = "../controller/"+controller;
        var controller = require(requirePath);
        if (typeof controller[action] == 'function')
            controller[action](req,res);
        else
            res.send("Unknown action");
    }
};

router.all("/:controller/:action/",callback);
router.delete("/:controller/:action/:id",callback);

module.exports = router;