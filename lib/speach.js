// import built-in
const { resolve } = require('pathname')
const { existsFileSync } = require('filesystem')

// import library
const compile = require('./compile')
const createQuery = require('./createQuery')
const createWav = require('./createWav')
const execute = require('./execute')

// export
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

    let query = transformer(createQuery(content, speaker))
    createWav(query, { speaker, out })

    const exe = resolve(__dirname, '../', 'player.exe')
    if (!existsFileSync(exe)) compile('player.cs', { target: 'exe', out: 'player.exe' })

    execute('player.exe ' + out)
}
