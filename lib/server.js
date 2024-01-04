// imports OLE
const WShell = require('WScript.Shell')

// imports libraries
const getProcess = require('./getProcess')
const httpServer = require('./getHttpServer')()

// constant
const USERNAME = WShell.ExpandEnvironmentStrings("%USERNAME%")
const run_exe = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\VOICEVOX\\run.exe`
const voicevox_exe = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\VOICEVOX\\VOICEVOX.exe`
const serverError = new Error('This module requires voicevox')

// exports
module.exports = {
    getServer,
    initServer,
    serverError
}

/** @typedef {Object<string, value>} SWbemObjectEx */

/**
 * Make sure Voicevox is running
 * @returns {SWbemObjectEx?}
 */
function getServer() {
    return getProcess(run_exe, voicevox_exe)
}

/**
 * Run Voicevox
 * @returns {SWbemObjectEx}
 */
function initServer() {
    if (!getServer()) {
        WShell.Run(run_exe)

        let counter = 0
        const indicator = ['|', '/', '-', '\\',]
        const rotation = indicator.length

        httpServer.open('GET', 'http://127.0.0.1:50021/user_dict', true)
        httpServer.send()

        while (httpServer.readyState != 4) {
            console.weaklog(`${indicator[counter++ % rotation]} initialize Server`)
            WScript.Sleep(50)
        }
    }
    return getServer()
}