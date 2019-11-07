let express = require("express");
let router = express.Router();
var db = require("../models");
const bcrypt = require('bcrypt');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_APIKEY,
    formatter: null
};
var geocoder = NodeGeocoder(options);

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


router.get('/api/logout', function (req, res) {
    //delete session user, logging you out
    req.session.destroy(function () {
        res.send('successfully logged out')
    })
})

//developer route to see all the session variables.
router.get('/api/readsessions', function (req, res) {
    res.json(req.session);
})

router.post("/api/login", function (req, res) {
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

router.post("/api/createMenu", function (req, res) {
    console.log("-------Request--------")     ;
    console.log(req.body);    
    db.Menu.create({
        dish: req.body.dish,
        quantity: req.body.quantity,
        servingUnit: req.body.servingUnit,
        price: req.body.price,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        ChefId: req.body.ChefId,
        description:req.body.description,
        imageURL:req.body.imageURL
    }).then(function (menuResult) {
        db.History.create({
            dish: req.body.dish,
            ingredients: req.body.ingredients,
            cuisine: req.body.cuisine,
            ChefId: req.body.ChefId
        }).then(function (result) {

        }).catch();
        res.json(menuResult);
    }).catch(function (error) { res.json(error) });

});

router.post("/api/order", function (req, res) {
    console.log("-------Request--------")     ;
    console.log(req.body);    
    db.Order.create({
        orderedQuantity:parseInt(req.body.orderedQuantity),
        MenuId:req.body.MenuId,
        ChefId:req.body.ChefId,
        CustomerId:req.body.CustomerId
    }).then(function(response){
        res.json(response)
    }).catch()
});

router.get("/api/menuList/:chefId", function (req, res) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    db.Menu.findAll({
        where: {
            ChefId: req.params.chefId
        }
    }).then(function (menuResult) {
        let menuList = [];

        menuResult.forEach(element => {
            menuList.push(element.dataValues);
        });
        res.json(menuList);
    }).catch(function (error) {
        res.json(error);
    });
});

router.get("/api/onlineChefs", function (req, res) {
    db.OnlineChef.findAll({
        include: [db.Chef]
    }).then(function (results) {
        res.json(results);
    }).catch();
});

router.get("/api/onlineChef/:id", function (req, res) {
    db.OnlineChef.findAll({
        where:{
            ChefId:req.params.id
        }
    }).then(function (results) {
        res.json(results);
    }).catch();
});


/* New Addition  */
router.get("/api/customer/:userId", function (req, res) {
    db.Customer.findAll({
        where:{
            UserId:req.params.userId
        } 
        }).then (function(results){
            res.json(results);
        }).catch();
    })


router.get("/api/Chefs", function (req, res) {
    db.Chef.findAll().then(function (results) {
        res.json(results);
    }).catch();
});

router.post("/api/makeAvailable/:chefId", function (req, res) {
    db.OnlineChef.create({
        ChefId: req.params.chefId
    }).then(function (result) {
        res.json(result);
    }).catch(function (error) { res.json(error) });
});

router.delete("/api/makeUnavailable/:chefId", function (req, res) {
    db.OnlineChef.destroy({
        where: {
            ChefId: req.params.chefId
        }
    }).then(function (result) {
        res.json(result);
    }).catch(function (error) { res.json(error) });
});

router.delete("/api/removeDish/:dishId", function (req, res) {
    db.Menu.destroy({
        where: {
            id: req.params.dishId
        }
    }).then(function (result) {
        res.json(result);
    }).catch(function (error) {
        res.json(error);
    });
});

function createChef(req, response, userResults) {
    let lat;let lon;
    geocoder.geocode(req.body.address)
    .then(function(res) {
      lat=res[0].latitude;
      lon=res[0].longitude;

      db.Chef.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        specialities: req.body.specialities,
        contact: req.body.contact,
        kitchenName: req.body.kitchenName,
        license: req.body.license,
        address: req.body.address,
        lat:lat,
        lng:lon,
        UserId: userResults.dataValues.id
    }).then(function (chefResult) {
        req.session.user = { id: userResults.dataValues.id };
        req.session.error = null;
        response.status(200).json(req.session);
    }).catch(function (error) { console.log(error) });
    })
    .catch(function(err) {
      console.log(err);
    });
    
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
