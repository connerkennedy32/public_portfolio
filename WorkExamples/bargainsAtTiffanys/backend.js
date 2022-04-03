var express = require("express");
var router = express.Router();
var db = require("../database");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const convertSQLdate = require("../helperFunctions/helperFunctions");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.post("/post", upload.any(), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        res.contentType("image/jpeg");
        res.send(req.file.buffer);
        console.log(req.file.filename);
        var imgsrc = "http://127.0.0.1:3000/images/" + req.file.filename;
        var insertData = "INSERT INTO users_file(file_src)VALUES(?)";
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err;
            console.log("file uploaded");
        });
    }
});

router.get("/getphoto", (req, res) => {
    var sql = "SELECT * FROM users_file";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.contentType("image/jpeg");
        res.render("image", {
            path: data[0].file_src,
        });
    });
});

router.get("/form", function (req, res, next) {
    res.render("users");
});
router.get("/delete/:id", function (req, res) {
    var UserId = req.params.id;
    var sql = `DELETE FROM bargainsattiffanys WHERE id=${UserId}`;

    db.query(sql, function (err, result, field) {
        if (err) throw err;

        res.redirect("http://localhost:3000/dashboard");
    });
});
router.delete("/delete/:id", function (req, res) {
    var UserId = req.params.id;
    var sql = `DELETE FROM bargainsattiffanys WHERE id=${UserId}`;

    db.query(sql, (err, result, field) => {
        if (err) {
            res.send({
                code: 400,
                faild: "error ocurred Eliminar",
            });
        } else {
            console.log("deleted " + result.affectedRows + " rows");
            res.redirect("http://localhost:3000/dashboard"); // redirect to user form page after inserting the data
        }
    });
});
router.post("/addItem", upload.single("image"), function (req, res, next) {
    // store all the user input data
    // THIS ONLY WORKS BECAUSE I ADDED THE BODY PARSER
    var imgsrc = "http://127.0.0.1:8080/images/" + req.file.filename;
    const userDetails = req.body;
    userDetails.image = imgsrc;
    console.log("userDetails", userDetails);
    // console.log("File body", req.body[0]);

    if (userDetails.isSold === "No") {
        userDetails.sellingPrice = null;
        userDetails.whoPurchased = null;
        userDetails.dateSold = null;
    }

    // insert user data into users table
    var sql = "INSERT INTO bargainsattiffanys SET ?";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect("http://localhost:3000/dashboard"); // redirect to user form page after inserting the data
});

router.get("/user-list", function (req, res, next) {
    var sql = `SELECT * FROM bargainsattiffanys`;
    let name = req.query.name || null;
    let startDate = req.query.startDate || null;
    let endDate = req.query.endDate || null;

    let nameText = `whoPurchased LIKE '${name}%'`;
    let startDateText = `dateSold > '${startDate}'`;
    let endDateText = `dateSold < '${endDate}'`;

    let isQuery = false;
    let word = "WHERE";

    if (name) {
        if (!isQuery) {
            sql += ` ${word} ${nameText}`;
            isQuery = true;
            word = "AND";
        }
    }
    if (startDate) {
        if (!isQuery) {
            sql += ` ${word} ${startDateText}`;
            isQuery = true;
            word = "AND";
        } else {
            sql += ` ${word} ${startDateText}`;
        }
    }
    if (endDate) {
        if (!isQuery) {
            sql += ` ${word} ${endDateText}`;
            isQuery = true;
            word = "AND";
        } else {
            sql += ` ${word} ${endDateText}`;
        }
    }
    console.log(sql);

    db.query(sql, function (err, data, fields) {
        if (!data) {
            res.send("NO DATA");
        }
        for (let i = 0; i < data.length; i++) {
            let date = data[i].datePurchased;
            date =
                (date.getMonth() > 8
                    ? date.getMonth() + 1
                    : "0" + (date.getMonth() + 1)) +
                "/" +
                (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                "/" +
                date.getFullYear();
            data[i].datePurchased = date;
        }
        for (let i = 0; i < data.length; i++) {
            let date = data[i].dateSold ? data[i].dateSold : null;
            if (date) {
                date =
                    (date.getMonth() > 8
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1)) +
                    "/" +
                    (date.getDate() > 9
                        ? date.getDate()
                        : "0" + date.getDate()) +
                    "/" +
                    date.getFullYear();
                data[i].dateSold = date;
            }
        }
        if (err) throw err;

        res.send(data);
        // res.render("user-list", { title: "User List", userData: data });
    });
});

router.post("/edit/:id", upload.single("image"), function (req, res, next) {
    // store all the user input data
    // THIS ONLY WORKS BECAUSE I ADDED THE BODY PARSER
    var id = req.params.id;
    let newUpload = false;
    let imgsrc = "";
    if (req.file && req.file.filename) {
        imgsrc = "http://127.0.0.1:8080/images/" + req.file.filename;
        newUpload = true;
    }

    // var imgsrc = "http://127.0.0.1:8080/images/" + req.file.filename;
    const userDetails = req.body;
    console.log("userDetails B4", userDetails);
    if (!newUpload) {
        userDetails.image = userDetails.oldImage;
    } else {
        userDetails.image = imgsrc;
    }
    delete userDetails.oldImage;
    console.log("userDetails After", userDetails);

    // console.log("File body", req.body[0]);

    if (userDetails.isSold === "No") {
        userDetails.sellingPrice = null;
        userDetails.whoPurchased = null;
        userDetails.dateSold = null;
    }

    // insert user data into users table
    var sql = `UPDATE bargainsattiffanys SET ? WHERE id= ?`;
    db.query(sql, [userDetails, id], function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect("http://localhost:3000/dashboard"); // redirect to user form page after inserting the data
});

router.get("/edit/:id", function (req, res, next) {
    var UserId = req.params.id;
    var sql = `SELECT * FROM bargainsattiffanys WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        data[0].datePurchased = convertSQLdate(data[0].datePurchased);
        data[0].dateSold = data[0].dateSold
            ? convertSQLdate(data[0].dateSold)
            : null;
        res.send(data[0]);
        // res.render("users-form", { title: "User List", editData: data[0] });
    });
});

module.exports = router;
