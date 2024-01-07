// import built-in
const genGUID = require('genGUID')

// import library
const request = require('./request')
// const { initServer, getServer, serverError } = require('./server')

// constant
// export
module.exports = createQuery

/** @typedef {Object<string, value>} Json */
/** @typedef {Number} Int */

/**
 * Generates a query object for VOICEVOX
 * @example
 * createQuery('僕はずんだの妖精なのだ', 1)
 * @param {String} content
 * @param {Int} [speaker=1] - voice id
 * @returns {Json}
 */
function createQuery(content, speaker = 1) {
    const res = request('POST', "audio_query", {
        params: {
            text: encodeURI(content),
            speaker,
        },
        headers: {
            accept: 'application/json'
        }
    })

    res.uuid = genGUID().slice(1, -1).toLowerCase()
    res.styleId = speaker
    res.text = content

    return res
}