var express = require('express');

var User = require("../models/user");
var Flower = require("../models/flower");
var Branch = require("../models/branch");

var router = express.Router();

var oldbranchesList = [{ activeFlag: true , name: 'Our Flower',
    address :{ country: 'Israel', city: 'Jerusalem' , street: 'Malchi Israel' , number: 11 } },
    { activeFlag: false , name: 'Flowers.com',
    address :{ country: 'Israel', city: 'Ramat Gan' , street: 'Haroeh' , number: 64 } }];

var oldusersList = [{ role:'manager', activeFlag: true , firstName: 'Moseh' , lastName: 'Meir' , userName: 'Moses' , password: "MoMeir",
       address :{ country: 'Israel', city: 'Bnei Braq' , street: 'Moaliver' , number: 32 }},
       {role:'manager', activeFlag: true ,firstName: 'Yair' , lastName: 'Zoar' , userName: 'Yair' , password: "Zoar",
       address :{ country: 'Israel', city: 'Ramat Gan' , street: 'Hagana' , number: 22 }},
       {role:'customer', activeFlag: true , customerType:'Store', storeName:'Flower4U', firstName: 'Israel' , lastName: 'Levi' , userName: 'Israel' , password: "12345",
       address :{ country: 'Israel', city: 'Bnei Braq' , street: 'Rabi Akiva' , number: 131 } },
       {role:'customer', activeFlag: true , customerType:'Private', firstName: 'Yakov' , lastName: 'Choen' , userName: 'Yanki123' , password: "YakovAvino",
       address :{ country: 'Israel', city: 'Ramat Gan' , street: 'Hyarden' , number: 41 }},
       {role:'employee', activeFlag: true , firstName: 'Chaim' , lastName: 'Yossefi' , userName: 'ChYos' , password: "abc123" ,
       address :{ country: 'Israel', city: 'Bnei Braq' , street: 'Menachem' , number: 23 }},
       {role:'employee', activeFlag: true ,firstName: 'Ariel' , lastName: 'Ezra' , userName: 'Ar12' , password: "Ariel" ,
       address :{ country: 'Israel', city: 'Bnei Braq' , street: 'Perel' , number: 7 }}];


var oldflowersList = [{inInventory: true , flowerName: 'Amaryllis' , 
      description: 'The Anemone genus is part of the Ranunculaceae (buttercup) family. There are a little over 120 species of anemones in a wide range of colors. Anemones are popular in gardens as individual species flower in the spring, summer, or fall, providing continual color.',
      cost: '20$',
      imgUrl: 'http://www.namesofflowers.net/images/anemones-flower-1.jpg'
      },
      {inInventory: true , flowerName: 'Aster' , 
      description: 'The aster is a flower with a bit of a wild appearance, but it fits nicely in many garden settings. The aster flower is the birth flower for the month of September, and is often used to mark twenty years of marriage. In gardens, asters continue to attract bees and butterflies long after most other flowers have disappeared. People have enjoyed the simple beauty of aster flowers for many generations, and it is likely that these flowers will continue to be celebrated for years to come.',
      cost: '26$',
      imgUrl: 'http://www.namesofflowers.net/images/aster.jpg'
      },
      {inInventory: true , flowerName: 'Carnation' , 
      description: 'Carnation flowers are one of the more beautiful flowers used by florists when creating arrangements like boutonnieres, corsages and bouquets. Carnation flowers can be red, pink, white, purple, green and more. The popularity of the carnation is largely due to their beauty, but also because they are long lasting. Carnations also have the ability to rehydrate; this water absorption helps vitalize them after long transportation. Carnation flowers can stay fresh and beautiful longer than other flowers. This is a reason why carnations are so popular on special occasions like Valentine’s Day and mother’s day.',
      cost: '11$',
      imgUrl: 'http://www.namesofflowers.net/images/carnations-flower-1.jpg'
      },
      {inInventory: true , flowerName: 'Dahlia' , 
      description: 'The dahlia hybrids are most often seen as garden plants. Anders Dahl was an 18th-century Swedish botanist for whom the Dahlia flower is now named after.There’s so much more to this remarkable perennial than just where its name comes from. Here is some important information you should know about the Dahlia.',
      cost: '16$',
      imgUrl: 'http://www.namesofflowers.net/images/dahlia.jpg'
      },
      {inInventory: false , flowerName: 'Hyacinth' , 
      description: 'Hyacinth bulbs are especially well known. Hyacinth flowers blossom in the spring, from March to April, and come in a variety of colors, shades of violet, red, blue, white, orange, pink, and yellow. March 7th is actually the official World Hyacinth Day.',
      cost: '30$',
      imgUrl: 'http://www.namesofflowers.net/images/hyacinths-flower-1.jpg'
      }];
      



router.get('/', function (req, res) {

    /*oldbranchesList.forEach(branch => {
        Branch.create({
            activeFlag: branch.activeFlag , name : branch.name,
            address :{ country: branch.address.country, city:  branch.address.city , street:  branch.address.street , number:  branch.address.number },
        });
        console.log(branch);
    });

    oldusersList.forEach(user => {
        User.create({
            role: user.role, activeFlag: user.activeFlag , firstName:  user.firstName , lastName:  user.lastName , userName:  user.userName , password:  user.password,
            customerType:user.customerType, storeName:user.storeName,
            address :{ country:  user.address.country, city: user.address.city , street: user.address.street , number: user.address.number },
        });
    });

    oldflowersList.forEach(flower => {
        Flower.create({
            inInventory: flower.inInventory , flowerName: flower.flowerName , 
            description: flower.description,
            cost: flower.cost,
            imgUrl: flower.imgUrl
        });
    });*/

    res.render("index.ejs");

});

router.post('/login', function (req, res) {

    thisUserName = req.body.userName;
    thisPassword = req.body.password;

    User.findOne({userName: thisUserName, password:thisPassword, activeFlag:true }, function(err, user) {
        if (err) throw err;
        //console.log(user);
        if(user===null){
            res.status(500).send("user name or password are incorrect.");
            return;
        }
        else if(user.role=='employee'){
        var navbarItems = [
            {name:'Home', ref:'/home?userName='+user.userName},
            {name:'Branches List',  ref:'/branchesList?userName='+user.userName},
            {name:'Customers Managment',  ref:'/customersList?userName='+user.userName},
            {name:'Catalog',  ref:'/catalog?userName='+user.userName}];
            res.render( "partials/nav.ejs", {navbarItems:navbarItems}); 
        }

        else if(user.role=='manager'){
            var navbarItems = [
                {name:'Home', ref:'/home?userName='+user.userName},
                {name:'Branches List',  ref:'/branchesList?userName='+user.userName},
                {name:'Customers Managment',  ref:'/customersList?userName='+user.userName},
                {name:'Employees Managment',  ref:'/employeesList?userName='+user.userName},
                {name:'Catalog',  ref:'/catalog?userName='+user.userName}];
                res.render("partials/nav.ejs", {navbarItems:navbarItems}); 
        }

        else if(user.role=='customer'){
            var navbarItems = [
                {name:'Home', ref:'/home?userName='+user.userName},
                {name:'Branches List',  ref:'/branchesList?userName='+user.userName},
                {name:'Catalog',  ref:'/catalog?userName='+user.userName}];
                res.render("partials/nav.ejs", {navbarItems:navbarItems}); 
            }
    });
});

router.get('/logout', function (req, res) {
        res.render("partials/nav.ejs");   
});


router.get('/branchesList', function (req, res) {
    var thisUserName = req.query.userName  
    User.findOne({userName: thisUserName, activeFlag:true }, function(err, user) {
        if(err==null){
        Branch.find({ activeFlag:true}, function(err, branchesList) { 
            console.log(branchesList);
             res.render("partials/branchesTable.ejs", { branchesList: branchesList});   
        });
    }
    });
});

router.get('/customersList', function (req, res) {
    var thisUserName = req.query.userName;

    User.findOne({userName: thisUserName, activeFlag:true }, function(err, user) {
        if(err== null && (user.role=='manager' || user.role=='employee')){
            User.find({role:'customer', activeFlag:true}, function(err, customersList) { 
                res.render("partials/customersTable.ejs", { customersList: customersList }); 
           });
        }
        else res.render("error.ejs" , {message: 'You are not a manger ot an employee therefore you cannot accses this list.'})
    });
    
});

router.get('/employeesList', function (req, res) {
    var thisUserName = req.query.userName;

    User.findOne({userName: thisUserName, activeFlag:true }, function(err, user) {
        if(err == null && (user.role=='manager' )){
            User.find( {$or: [{role:'employee', activeFlag:true},{role:'manager', activeFlag:true}]}, function(err, employeesList) { 
                console.log(employeesList);
                res.render("partials/employeesTable.ejs", { employeesList: employeesList });
           });
        }
        else res.render("error.ejs" , {message: 'You are not a manger therefor you cannot accses this list.'})
    });
});



router.get('/catalog', function (req, res) {
    var thisUserName = req.query.userName;

    User.findOne({userName: thisUserName, activeFlag:true }, function(err, user) {
        if(err == null ){
            Flower.find({}, function(err, flowersList) { 
                res.render("partials/catalog.ejs", { flowersList: flowersList });
           });
        }
        else res.status(500).send('You have no premmition to watch this content.');
    });
    
});

router.get('/home', function (req, res) {
    res.render("partials/home.ejs");
});

router.post('/addEmployee', function (req, res) {

    User.create({
        role: 'employee' ,
        activeFlag: true,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        userName:  req.body.userName,
        password: req.body.password,
        address :{ country: req.body.country , city: req.body.city , street: req.body.street, number: req.body.number }
      }, function(err, user) {
        if (err){
            res.status(500).send('please fill all of the properties. if you did than it means the user name is taken.');
        }
        else {
            res.sendStatus(200);
        } 
      });

});
router.post('/deleteEmployee', function (req, res) {
    User.findOneAndUpdate({userName: req.body.userName, activeFlag:true },{$set:{activeFlag:false}}, {new: true}, function(err, user) {
        if(user===null){
            res.status(500).send("user dosen't exisits");
        }
        else if(err){
            res.status(500).send("couldn't delete user.");
        }
        else {
            res.sendStatus(200);
        } 
    });

});

router.post('/updateEmployee', function (req, res) {
    User.findOneAndUpdate({userName: req.body.userName, activeFlag:true },{role:'manager'}, {new: true}, function(err, user) {
        if(user===null){
            res.status(500).send("user dosen't exisits");
        }
        else if(err){
            res.status(500).send(err);
        }
        else {
            res.sendStatus(200);
        } 
    });

});

router.post('/addCustomer', function (req, res) {
    User.create({
        role: 'customer' ,
        activeFlag: true,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        userName:  req.body.userName,
        password: req.body.password,
        customerType: req.body.customerType,
        storeName: req.body.storeName,
        address :{ country: req.body.country , city: req.body.city , street: req.body.street, number: req.body.number }
      }, function(err, user) {
        if (err){
            res.status(500).send('please fill all of the properties. if you did than it means the user name is taken.');
        }
        else {
            res.sendStatus(200);
        } 
      });
});
module.exports = router;
