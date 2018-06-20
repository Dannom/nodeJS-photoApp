/**
 * This file will contain the data for our photos application
 **/

// Photo upload dependencies
var Photos = require('../models/Photos');
var path = require('path');
var fs = require('fs');
var join = path.join;

/**
 * This method will render out the images
 *
 * @param req - The request object
 * @param res - The response object
 */
exports.list = function (req, res, next) {
    // Use the mongoose to find all the images in the models
    Photos.find({}, // Find all images
        function (err, photos) {

            // Check for error
            if (err) {
                return next(err);
            }

            // Render the images gallery
            res.render('photos/index', {
                title: 'Photos',
                photos: photos
            });

        });
};

exports.download = function (req, res, next) {
    //get image id
    var id = req.params.id;

    //find the image in mongo db

    Photos.findById(id,
        function (err, photo) {
            if (err) {
                return next(err);
            }


            //get the image path
            var path = join(__dirname + '/../public/images/' + photo.path);
            res.download(path, photo.name + '.jpg');
        }
    );
}


exports.deletePhoto = function (req, res, next) {


    var id = req.params.id;

    Photos.findById(id,
        function (err, photo) {
            
            if (err) {
                throw err
            };
            Photos.remove(photo, function (err, ) {
                if (err) {
                    throw err
                };
                res.redirect('/');
            });
            fs.unlink(__dirname + '/../public/images/' + photo.path, (err) => {
                if (err) throw err;
                
            });
        })


};