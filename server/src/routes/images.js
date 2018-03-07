import { Router } from 'express';
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';

let multer = require('multer');
let upload = multer({ dest: 'client/img/' })
let router = Router();

let images = new Table('images');
let locations = new Table('locations');

router.post('/', tokenMiddleware, isLoggedIn, upload.single('image'), (req, res, next) => {
    if (!req.body.locationid) {
        // console.log(req.user.id);
        console.log(req.file.path);
        // let picture = {
        //     image: req.file.path,
        //     userid: req.user.id,
        //     locationid: 141
        // }
        // images.insert(picture)
        //     .then(() => {
        //         res.sendStatus(201);
        //     }).catch((err) => {
        //         console.log(err);
        //     });

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
        });
});

export default router;