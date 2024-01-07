// import built-in
const { writeFileSync, existsFileSync, deleteFileSync } = require('filesystem')
const { resolve } = require('pathname')

// import library
const request = require('./request')

// export
module.exports = createWav

/** @typedef {Number} Int */
/** @typedef {String} Path */
/** @typedef {Object<string, value>} Json */
/** @typedef {String} JsonString */

/**
 * @typedef {Object} GenWavOptions
 * @property {Int} speaker
 * @property {Path} out
 */

/**
 * Generate audio files from query objects
 * @example
 * const query = readFileSync('query.json', 'UTF-8')
 * createWav(query, { out: 'res.wav' })
 * @param {Json|JsonString} query
 * @param {GenWavOptions?} options
 */
function createWav(query, options) {
    /** @type {Json} */
    const _query = typeof query === 'string' ? query : JSON.stringify(query)
    let { speaker = 1, out = 'voice.wav' } = options

    const result = request('POST', 'synthesis', {
        params: {
            speaker
        },
        headers: {
            'Content-type': 'application/json',
            accept: 'audeo/wav'
        },
        body: _query
    })

    const dist = resolve(process.cwd(), out)
    if (existsFileSync(dist)) deleteFileSync(dist)
    console.log(writeFileSync(dist, result))
}