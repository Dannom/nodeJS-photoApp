/**
 * This file will contain the data for our photos application
 **/

// Photo upload dependencies

var Photos = require('../models/Photos');
var path = require('path');
var fs = require('fs');

var mongoose = require('mongoose');
var assert = require('assert');
var path = require('path');
var colors = require('colors/safe');
var join = path.join;


/**
 * This method will render out the images
 *
 * @param req - The request object
 * @param res - The response object
 */
exports.list = function (req, res, next) {
    // Use the mongoose to find all the images in the models
    res.render('photos/upload', {
        title: 'upload form'
    });

};

exports.submit = function (req, res, next) {
    // Use the mongoose to find all the images in the models

    var photoTitle = req.body.photoTitle;
    var img = req.file,
        fileName = req.file.originalname,
        _path = req.file.path;
        

    fs.rename(
        _path,
        __dirname + '/../public/images/' + fileName, 
       function (err) {
        if (err) {
            console.log(err)
        }});
            
    console.log( photoTitle);
    Photos.create({
        name: fileName,
        path: fileName,
        title: photoTitle,
    });
    





    console.log(req.file);
    console.log(req.originalname);

    res.redirect('/');



};