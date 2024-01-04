// imports OLE
const getHttpServer = require('./getHttpServer')
const IServerXMLHTTPRequest2 = getHttpServer()

// import librarise
const { initServer, getServer, serverError } = require('./server')

module.exports = request

/**
 * @typedef {Object} RequestOptions
 * @property {Object<string, value>} [param]
 * @property {Object<string, value>} [headers]
 * @property {Object<string, value>} [body]
 */

/** @typedef {Int[]} Buffer */
/** @typedef {Object<string, value>} Json */

/**
 * Request to VOICEVOX ENGINE.
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {String} endpoint
 * @param {RequestOptions?} options
 * @returns {Buffer|Json}
 */
function request(method, endpoint, options = {}) {
    initServer()
    if (!getServer()) throw serverError

    let params = 'params' in options ? '?' + Object
        .keys(options.params)
        .map(key => `${key}=${options.params[key]}`)
        .join('&')
        : ''
    const req = `http://127.0.0.1:50021/${endpoint}${params}`
    console.debug('request: %S', req)

    IServerXMLHTTPRequest2.open(method, req, false)
    if ('headers' in options) Object
        .keys(options.headers)
        .forEach(header => IServerXMLHTTPRequest2.setRequestHeader(header, options.headers[header]))
    IServerXMLHTTPRequest2.send('body' in options ? options.body : undefined)

    let counter = 0
    const indicator = ['|', '/', '-', '\\',]
    const rotation = indicator.length
    const state = ['UNSENT', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE']

    while (IServerXMLHTTPRequest2.readyState != 4) {
        console.weaklog(`${req.length > 50 ? req.slice(0, 30) + ' ... ' + req.slice(-10) : req} ${indicator[counter++ % rotation]} ${state[IServerXMLHTTPRequest2.readyState]}`)
        WScript.Sleep(50)
    }

    if ('headers' in options && 'accept' in options.headers) {
        if (options.headers.accept === 'application/json') return JSON.parse(IServerXMLHTTPRequest2.responseText)
        return Buffer.from(IServerXMLHTTPRequest2.responseBody)
    }
    return IServerXMLHTTPRequest2.responseText
}

/*
const json = request('POST', 'audio_query', {
    params: {
        text: encodeURI('ずんだもんなのだ'),
        speaker: 1
    },
    headers: {
        accept: 'application/json'
    }
})

const response = request('POST', 'synthesis', {
    params: {
        text: encodeURI('ずんだもんなのだ'),
        speaker: 1
    },
    headers: {
        accept: 'audio/wav',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(json)
})
console.log(() => require('filesystem').writeFileSync('test.wav', response))
*/