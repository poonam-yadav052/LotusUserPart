var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({
//     extended: true
// }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(express.static('public'));
var Matiere = require('./Matiere');
//const { parse } = require('querystring');

//get specific admin all members list 
router.get('/getMembers/', function (req, res) {
    Matiere.getusers(req.query,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//get member details by passing userId
router.get('/getMember/', function (req, res) {    
    console.log("getMember req==="+JSON.stringify(req.query));
    Matiere.getMember(req.query,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//get last userName  
router.get('/getUserMax/', function (req, res) {    
    Matiere.getUserMax(function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//get user roles
router.get('/getUserRoles/', function (req, res) {    
    Matiere.getUserRoles(req.query,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//get user permissions
router.get('/getAdminUserPermission/', function (req, res) {    
    Matiere.getAdminUserPermission(req.query,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//add Admin permissions
router.post('/updateAdminPermission/', function (req, res) {    
    Matiere.updateAdminPermission(req.body,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

//get credit limit by passing userId
router.get('/getCeditLimit/', function (req, res) {   
    console.log("query==="+JSON.stringify(req.query)); 
    Matiere.getUpdateUserCreditLimit(req.query,function(err,rows){
        if(err) {
            res.status(400).json({messege:"Fail",result:err});
        }
        else
        {
            res.json({messege:"Success",result:rows});
        }
    });
});

// add new mwmber
router.post('/saveMember/', function (req, res) {
    console.log("req==="+JSON.stringify(req.body));    
    if(req.body.added_by_roleId=="1"){
        Matiere.createMember(req.body,function(err,count){
            console.log("INN=1==");
            if(err)
            {
                res.status(400).json({messege:"Fail",result:err});
            }
            else{
                res.json({messege:"Success",result:count});
            }
        });
    }else{
        if(req.body.added_by_roleId=="5"){
            res.status(400).json({messege:"Success",result:"User not allow to add credit limit"});
        }else{
            Matiere.checkCreditLimit(req.body,function(err1,result){
                //console.log("result==="+JSON.stringify(result[0].creditLimit));
                //console.log("req.body.creditLimit=="+(result[0].creditLimit)+"===="+parseInt(req.body.creditLimit));
                if(result){
                if(parseInt(result[0].creditLimit)>=parseInt(req.body.creditLimit)){
                    //console.log("INN===");
                    req.body.addedBy_Creditlimit = parseInt(result[0].creditLimit);
                    Matiere.createMember(req.body,function(err,count){
                        //console.log("INN=1==");
                        if(err)
                        {
                            res.status(400).json({messege:"Fail",result:err});
                        }
                        else{
                            res.json({messege:"Success",result:count});
                        }
                    });
                }else{
                    res.json({messege:"Success",result:"credit_limit_not_available"});
                }
            }
            else{
                res.json({messege:"Success",result:"credit_limit_not_available"});
            }
            }); 
        } 
    }     
});

//update member 
router.post('/updateMember/', function (req, res) {
    //console.log("req update==="+JSON.stringify(req.body));
    if(req.body.added_by_roleId=="1"){
        Matiere.getUpdateUserCreditLimit(req.body,function(err,result1){
            req.body.old_Creditlimit = parseInt(result1[0].creditLimit);
            Matiere.updateMember(req.body,function(err,count){
                if(err)
                {
                    res.status(400).json({messege:"Fail",result:err});
                }
                else{
                    res.json({messege:"Success",result:count});
                }
            });
        });
    }else{
        if(req.body.added_by_roleId=="5"){
            res.json({messege:"Success",result:"User not allow to add credit limit"});
        }else{
            Matiere.checkCreditLimit(req.body,function(err,result){
                if(err)
                {
                    res.status(400).json({messege:"Fail",result:err});
                }
                else{
                    //res.json(count);
                    console.log("result==="+JSON.stringify(result[0].creditLimit));
                    console.log("req body creditLimit=="+(result[0].creditLimit)+"===="+parseInt(req.body.creditLimit));
                    if(parseInt(result[0].creditLimit)>=parseInt(req.body.creditLimit)){                       
                        console.log("INN===");
                        req.body.addedBy_Creditlimit = parseInt(result[0].creditLimit);
                        Matiere.getUpdateUserCreditLimit(req.body,function(err,result1){
                            req.body.old_Creditlimit = parseInt(result1[0].creditLimit);
                            Matiere.updateUser(req.body,function(err,count){
                                if(err)
                                {
                                    res.status(400).json({messege:"Fail",result:err});
                                }
                                else{
                                    res.json({messege:"Success",result:count});
                                }
                            });
                        });                
                    }else{
                        res.json({messege:"Success",result:"credit_limit_not_available"});
                    }
                }
            }); 
        }
    }
});

//all logins
router.post('/login/', function (req, res) {    
    console.log("req update==="+JSON.stringify(req.body));    
    if(req.body.userName!="" && req.body.password!=""){
        Matiere.login(req.body,function(err,rows){
            if(err)
            {
                res.status(400).json({messege:"Fail",result:err});
            }
            else{
                //res.json({messege:"Success",result:rows});
                if(rows.length>0){
                    req.body.userId = rows[0].ID;
                    req.body.loginIp = "127.0.0.1";
                    Matiere.updateLastLogin(req.body,function(err1,rows1){
                        if(err1)
                        {
                            res.status(400).json({messege:"Fail",result:err1});
                        }else{
                            res.json({messege:"Success",result:rows});
                        }
                    });
                    
                }else{
                    res.json({messege:"Success",result:"Invalid login details!"});
                }
            }
        });
    }else{
        res.json({messege:"Success",result:"User Name and Password can not be empty!"});
    }
});

router.get('/getPositionTaking/', function (req, res) {    
    Matiere.getPositionTaking(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.post('/updatePositionTaking/', function (req, res) {    
    Matiere.updatePositionTaking(req.body,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.post('/addStakes/', function (req, res) {
    Matiere.addStakes(req.body,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getStakes/', function (req, res) {
    console.log("reqquer====="+JSON.stringify(req.query));
    Matiere.getStakes(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.post('/addBetSlip/', function (req, res) {
    console.log("post body=="+JSON.stringify(req.body));
    Matiere.getuserTake(req.body,function(err1,result){
        if(err1)
        {
            res.status(400).json({messege:"Fail",result:err1});
        } else{ 
            let take = "0";
            let give = "0";
            let creditLimit = "0";
            if(result.length>0){
                take = result[0].take;
                give = result[0].give;
                creditLimit = result[0].creditLimit;
            }
            req.body.give = give;
            req.body.take = take;
            req.body.creditLimit = creditLimit;
            Matiere.addBetSlip(req.body,function(err,rows){
                if(err)
                {
                    res.status(400).json({messege:"Fail",result:err});
                }
                else{               
                    res.json({messege:"Success",result:rows});               
                }
            });               
        }
    });        
});

router.get('/getBetSlip/', function (req, res) {
    Matiere.getBetSlip(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getAdminUsers/', function (req, res) {
    Matiere.getAdminUsers(function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.post('/addAdminUsers/', function (req, res) {   
    Matiere.addAdminUsers(req.body,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{ 
			Matiere.addAdminPermission(rows,function(err1,rows1){
                if(err)
                {
                    res.status(400).json({messege:"Fail",result:err1});
                }else{
                    res.json({messege:"Success",result:rows1});          
                }
                //res.json({messege:"Success",result:rows});        
			});			
        }
    });    
});

router.post('/updateAdminUsers/', function (req, res) { 
    Matiere.updateAdminUsers(req.body,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getBetTicker/', function (req, res) {
    Matiere.getBetTicker(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getBalance/', function (req, res) {
    const rows = [{
        netExposure:"0.00",
        balanceDon:"0.00",
        balanceUp:"0.00",
        creditLimit:"0.00",
        availableCredit:"0.00",
        totalCreditGivenToMember:"0.00"
    }];
    res.json({messege:"Success",result:rows}); 
    // Matiere.getBalance(req.query,function(err,rows){
    //     if(err)
    //     {
    //         res.status(400).json({messege:"Fail",result:err});
    //     }
    //     else{               
    //         res.json({messege:"Success",result:rows});               
    //     }
    // });    
});

router.get('/getMatchList/', function (req, res) {
    Matiere.getMatchList(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getPnLStatement/', function (req, res) {
    Matiere.getPnLStatement(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getCrditStatement/', function (req, res) {
    Matiere.getCrditStatement(req.query,function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

router.get('/getNetExposure/', function (req, res) {
    Matiere.getNetExposure(function(err,rows){
        if(err)
        {
            res.status(400).json({messege:"Fail",result:err});
        }
        else{               
            res.json({messege:"Success",result:rows});               
        }
    });    
});

module.exports = router;