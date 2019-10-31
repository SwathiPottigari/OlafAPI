let express = require("express");
let router = express.Router();
var db = require("../models");
const bcrypt = require('bcrypt');


router.post("/api/signup", function (req, res) {
    // console.log("-----Request----------");
    // console.log(req.body);
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (dbResult) {
        if (dbResult === null) {
            db.User.create({
                password: req.body.password,
                email: req.body.email
            }).then(function (userResults) {
                if (req.body.user === "chef") {
                    createChef(req, res, userResults);
                }
                else {
                    createCustomer(req, res, userResults);
                }
            }).catch();
        }
    }).catch(function (error) { console.log(error); });
});

router.get("/api/login", function (req, res) {
    console.log("-------Request-------");
    console.log(req.body);
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (dbUser) {
        //compares password send in req.body to one in database, will return true if matched.
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            //create new session property "user", set equal to logged in user
            req.session.user = { id: dbUser.dataValues.id };
            req.session.error = null;
        }
        else {
            req.session.user = false;
            req.session.error = 'auth failed bro'
        }
        res.json(req.session);
    }).catch();
});

function createChef(req, res, userResults) {
    db.Chef.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        specialities: req.body.specialities,
        contact: req.body.contact,
        kitchenName: req.body.kitchenName,
        license: req.body.license,
        address: req.body.address,
        UserId: userResults.dataValues.id
    }).then(function (chefResult) {
        req.session.user = { id: userResults.dataValues.id };
        req.session.error = null;
        res.status(200).json(req.session);
    }).catch(function (error) { console.log(error) });
};


function createCustomer(req, res, userResults) {
    db.Customer.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        UserId: userResults.dataValues.id
    }).then(function (custResult) {
        req.session.user = { id: userResults.dataValues.id };
        req.session.error = null;
        res.status(200).json(req.session);
    }).catch(function (error) { console.log(error) });
};

module.exports = router;
