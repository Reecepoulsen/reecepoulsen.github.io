const BASEURL = "https://gateway.marvel.com/v1/public/"
const PUBLICKEY = "9844eaa897898bc5390d831ce3f00701"
const PRIVATEKEY = "82ea3edfa283cce9fe638978caf9e3e08cfb4694"
const FULLURL = "https://gateway.marvel.com/v1/public/characters?limit=100&apikey=9844eaa897898bc5390d831ce3f00701"
const TS = 1;
const HASH = md5(TS+PRIVATEKEY+PUBLICKEY)

function buildUrl(){
    return BASEURL + `characters?limit=5&ts=${TS}&apikey=${PUBLICKEY}&hash=${HASH}`
}

console.log(buildUrl());

function getCharacters() {
    // response = await fetch(buildUrl());
    fetch(BASEURL + `characters?apikey=${PUBLICKEY}`)
    .then(response => {
        const reader = response.body.getReader()
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        })
    })
    .then(stream => new Response(stream))
    .then(response => console.log("???", response.body))
    .catch(err => console.error(err));
};



getCharacters();