const express = require("express")
const multer = require("multer")

const publicPath = "./public/"
const port = 3000

const app = express()
app.use(express.static(publicPath))
const upload = multer({ dest: publicPath })

const uploadedFiles = []

app.listen(port)

app.post('/upload', upload.single('pikature'), function (request, response, next) {
    // request.file is the `myFile` file
    // request.body will hold the text fields, if there were any
    console.log("Uploaded: " + request.file.filename)
    uploadedFiles.push(request.file.filename)
    response.end("Uploaded file!")

    if ( next ) {
        next( response )
    }
})


