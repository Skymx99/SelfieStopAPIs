import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let images = new Table('images');
let locations = new Table('locations');

router.post('/', upload.single('image'), (req, res, next) => {
    console.log('Inside Images.js');
    if (!req.body.locationid) {
        let picture = {
            image: req.file.path,
            userid: req.user.id,
            locationid: 141
        }
        images.insert(picture)
            .then(() => {
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });

    } else {
        let picture = {
            image: req.file.path,
            userid: req.user.id,
            locationid: req.body.locationid
        }

        images.insert(picture)
            .then(() => {
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    images.getAllLocationImages(id)
        .then((locationImages) => {
            res.json(locationImages);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;