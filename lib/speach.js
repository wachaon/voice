// imports built-ins
const { resolve } = require('pathname')
const { existsFileSync } = require('filesystem')

// imports libraries
const compile = require('./compile')
const genQuery = require('./genQuery')
const genWav = require('./genWav')
const execute = require('./execute')
const { initServer } = require('./server')


// exports
module.exports = speach

/** @typedef {Object<string, value>} SpeachOptions */

/**
 *
 * @example
 * speach('僕はずんだの妖精「ずんだもん！」なのだ')
 * @param {String} content
 * @param {SpeachOptions?} options
 */
function speach(content, options = {}) {
    const { speaker = 1, out = 'audio.wav', transformer = (json) => json } = options
    initServer()

    let query = transformer(genQuery(content, speaker))
    genWav(query, { speaker, out })

    const exe = resolve(__dirname, '../', 'player.exe')
    if (!existsFileSync(exe)) compile('player.cs', { target: 'exe', out: 'player.exe' })

    execute('player.exe ' + out)
}
