// imports built-ins
const { httprequest } = require('httprequest')

// imports libraries
const compile = require('./lib/compile')
const { getDict, setDict, deleteDict } = require('./lib/dict')
const genQuery = require('./lib/genQuery')
const genWav = require('./lib/genWav')
const getProcess = require('./lib/getProcess')
const { getVoices, getVoiceID } = require('./lib/getVoices')
const request = require('./lib/request')
const { getServer, initServer, serverError } = require('./lib/server')
const speach = require('./lib/speach')
const speak = require('./lib/speak')

// exports
module.exports = {
    compile,
    getDict,
    setDict,
    deleteDict,
    genQuery,
    genWav,
    getProcess,
    getVoices,
    getVoiceID,
    getServer,
    initServer,
    request,
    serverError,
    speach,
    speak,
}
