// imports libraries
const request = require('./request')
const { initServer, getServer, serverError } = require('./server')

// exports
module.exports = genQuery

/** @typedef {Object<string, value>} Json */
/** @typedef {Number} Int */

/**
 * Generates a query object for VOICEVOX
 * @example
 * genQuery('僕はずんだの妖精なのだ', 1)
 * @param {String} content
 * @param {Int} [speaker=1] - voice id
 * @returns {Json}
 */
function genQuery(content, speaker = 1) {
    initServer()
    if (!getServer()) throw serverError

    return request('POST', "audio_query", {
        params: {
            text: encodeURI(content),
            speaker,
        },
        headers: {
            accept: 'application/json'
        }
    })
}