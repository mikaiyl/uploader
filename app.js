const PORT = 3000

const express = require("express")
const multer = require("multer")
const fs = require('fs')

const uploadPath = "./public/uploads"
const publicPath = "./public"

const app = express()
const upload = multer({ dest: uploadPath })

app.use(express.static(publicPath))
app.set('view engine', 'pug')
app.set('views', './views')

const uploadedFiles = []

app.get( '/kg', ( req, res ) => {

    fs.readdir(uploadPath, function(err, items) {
        console.log(items);
        res.render(
            'kg',
            {
                title: 'KG',
                items: items,
            }
        );
    });

} )

app.post( '/upload', upload.single('pikature'), function (request, response, next) {

    // request.body will hold the text fields, if there were any
    console.log("Uploaded: " + request.file.filename)
    uploadedFiles.push(request.file.filename)
    response.render( 'upload' )

    // if callback call on res
    if ( next ) {
        next( response )
    }

} )

app.listen( PORT )

