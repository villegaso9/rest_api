/** import packages */
const express = require("express");
const config = require("config");
const controller = require("./controllers/customer/customer.controller");
const controllerLogin = require("./controllers/security/login.controller");
const controllerDelivery = require("./controllers/delivery/delivery.controller");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

/** server configuration */
let bodyParserJSON = bodyParser.json();
let bodyParserUrlEncoded = bodyParser.urlencoded({ extended: true });
let app = express();
app.use(bodyParserJSON);
app.use(bodyParserUrlEncoded);
const authorizedRoutes = express.Router();

/*******************************************************
 *  REST api methods for customer 
 */
// welcome message
app.get("/", (req, res) => {
    res.send("Welcome to my express server.");
});

// POST
app.post("/api/customer/create", (req, res, next) => {
    controller.createCustomer(req, res, next);
});

// GET
app.get("/api/customer/getAll", (req, res, next) => {
    controller.getAllCustomers(req, res, next);
});

// GET
app.get("/api/customer/getByDocument/:document", (req, res, next) => {
    controller.getCustomerByDocument(req, res, next);
});

// UPDATE
app.put("/api/customer/update", (req, res, next) => {
    controller.updateCustomer(req, res, next);
});

// DELETE
app.delete("/api/customer/delete", (req, res, next) => {
    controller.removeCustomer(req, res, next);
});

/*******************************************************
 *  REST api methods for login 
 */

/** Sign In */
app.post("/api/customer/signin", (req, res, next) => {
    controllerLogin.signinUser(req,res, next);
});

/** Login */
app.post("/api/customer/login", function (req, res, next) {
    controllerLogin.loginUser(req, res, next)
});

/*******************************************************
 *  REST api methods for delivery 
 */

// POST
app.post("/api/delivery/create", authorizedRoutes, (req, res, next) => {
    controllerDelivery.createDelivery(req, res, next);
});

// GET
app.get("/api/delivery/getAll", authorizedRoutes, (req, res, next) => {
    controllerDelivery.getAll(req, res, next);
});

app.get("/api/delivery/getById/:_id", authorizedRoutes, (req, res, next) => {
    controllerDelivery.getById(req, res, next);
});

// PUT
app.put("/api/delivery/update", authorizedRoutes, (req, res, next) => {
    controllerDelivery.update(req, res, next);
});

// DELETE
app.delete("/api/delivery/delete/:_id", authorizedRoutes, (req, res, next) => {
    controllerDelivery.delete(req, res, next);
});

/** Run server */
const port = config.get("port");
app.listen(port, () => {
    console.log(`Express server is running in port ${port}`);
});

/** Test Authorization Token */
app.get('/api/datos', authorizedRoutes, (req, res) => {
    const datos = [
     { id: 1, nombre: "Asfo" },
     { id: 2, nombre: "Denisse" },
     { id: 3, nombre: "Carlos" }
    ];
    
    res.json(datos);
});

 /** Token verification */
authorizedRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, config.get("keySecret"), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: "Invalid Token" });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: "Token not found" 
      });
    }
 });