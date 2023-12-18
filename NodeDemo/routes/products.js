var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelProduct = require("../models/product");
var validate = require("../validates/product");
const { validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
    console.log(req.query);
    var productsAll = await modelProduct.getall(req.query);
    responseData.responseReturn(res, 200, true, productsAll);
});

router.get("/:id", async function (req, res, next) {
    // get by ID
    try {
        var user = await modelProduct.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, user);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay product");
    }
});

router.post("/add", validate.validator(), async function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseData.responseReturn(
            res,
            400,
            false,
            errors.array().map((error) => error.msg)
        );
        return;
    }
    var product = await modelProduct.getByName(req.body.name);
    if (product) {
        responseData.responseReturn(res, 404, false, "product da ton tai");
    } else {
        const newProduct = await modelProduct.createProduct({
            name: req.body.name,
            descritption: req.body.descritption,
            image: req.body.image,
            price: req.body.price,
        });
        responseData.responseReturn(res, 200, true, newProduct);
    }
});
router.put("/edit/:id", async function (req, res, next) {
    try {
        var product = await modelProduct.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
            }
        );
        responseData.responseReturn(res, 200, true, product);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay product");
    }
});
router.delete("/delete/:id", function (req, res, next) {
    //delete by Id
    try {
        var product = modelProduct.findByIdAndDelete(req.params.id);
        responseData.responseReturn(res, 200, true, "xoa thanh cong");
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay product");
    }
});

module.exports = router;
