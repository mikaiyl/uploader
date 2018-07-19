const PORT = 3000

const express = require("express")
const multer = require("multer")
const fs = require('fs')

const uploadPath = "./public/uploads"
const publicPath = "./public"

const app = express()
const upload = multer({ dest: uploadPath })

app.use( express.json() )
app.use( express.static( publicPath ) )

app.set( 'view engine', 'pug' )
app.set( 'views', './views' )

const uploadedFiles = []

app.get( '/kg', ( req, res ) => {

    fs.readdir(uploadPath, (err, items) => {
        console.log(items)
        res.render(
            'kg',
            {
                title: 'KG',
                items: items,
            }
        )
    })

} )

app.post( '/update', ( req, res ) => {
    if ( req.body && req.body.after ) {
        fs.readdir( './public/uploads' , (err, images) => {
            let newImages = []
            let timestamp = 0

            for ( let image of images ) {
                if ( fs.statSync( './public/uploads/' + image ).mtimeMs > req.body.after ) {
                    newImages.push( '/uploads/' + image )
                }

                timestamp = timestamp < fs.statSync( './public/uploads/' + image ).mtimeMs ? fs.statSync( './public/uploads/' + image ).mtimeMs : timestamp
            }

            res.json( {
                images: newImages,
                timestamp: timestamp
            } )
        })
    }
} )

app.post( '/upload', upload.single('pikature'), (request, response, next) => {

    // request.body will hold the text fields, if there were any
    console.log("Uploaded: " + request.file.filename)
    uploadedFiles.push(request.file.filename)
    response.render( 'upload', { img: request.file.filename } )

    // if callback call on res
    if ( next ) {
        next( response )
    }

} )

app.listen( PORT )

