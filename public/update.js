const images = document.getElementById('postFlex')
let loadTime = Date.now()
let errCount = 0
let alerted = false
function newImageDiv( imgURI ) {
    let div = document.createElement( 'div' )
    let img = document.createElement( 'img' )

    img.src = imgURI
    img.classList.add('posts')

    div.appendChild( img )
    console.log( div )
    return div
}

function handleErrors(response) {
    if (!response.ok) {
            throw Error(response.statusText);
        }
    return response;
}

function getUpdate( timestamp, url = '/update' ) {
        let head = new Headers()
        head.append( 'Content-Type', 'application/json' )

        let req = new Request( url, {
            method: 'POST',
            headers: head,
            body: JSON.stringify({
                'after': loadTime,
            })
        })

        fetch(req)
            .then( handleErrors )
            .then( (res) => {
                return res.json()
            } ).then( ( json ) => {
                console.log( json )

                for ( let imgURI of json.images ) {
                    let iDiv = newImageDiv( imgURI )
                    images.appendChild( iDiv )
                }

                loadTime = json.timestamp
            } ).catch( ( err ) => {
                console.log( err )
                errCount += 1
            } )
}

setInterval( () => {
    if ( errCount <= 2 ) {
        getUpdate( loadTime )
    } else {
        if ( !alerted ) {
            alert( 'Unable to connect' )
            alerted = true
        }
    }
}, 5000)
