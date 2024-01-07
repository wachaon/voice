// import library
const compile = require('./lib/compile')
const { getDict, setDict, deleteDict } = require('./lib/dict')
const createProj = require('./lib/createProj')
const createQuery = require('./lib/createQuery')
const createWav = require('./lib/createWav')
const getProcess = require('./lib/getProcess')
const { getVoices, getVoiceID } = require('./lib/getVoices')
const request = require('./lib/request')
const { getServer, initServer, serverError } = require('./lib/server')
const speach = require('./lib/speach')
const speak = require('./lib/speak')

// export
module.exports = {
    compile,
    getDict,
    setDict,
    deleteDict,
    createProj,
    createQuery,
    createWav,
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
