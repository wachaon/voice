// imports OLE
var SWbemLocator = require("WbemScripting.SWbemLocator")

// imports built-ins
const { Enumerator } = require('JScript')

// exports
module.exports = getProcess

/** @typedef {String} Path */
/** @typedef {Object<string, value>} SWbemObjectEx */

/**
 * Checks if the program on the path is running and returns the process if it is.
 * @example
 * const server = getProcess(voicevox_exe, run_exe)
 * if (server) {
 *    console.log(() => server.ExecutablePath)
 * }
 * @param  {...Path} processPaths
 * @returns {SWbemObjectEx?}
 */
function getProcess(...processPaths) {
    const SWbemServicesEx = SWbemLocator.ConnectServer()
    const SWbemObjectSet = SWbemServicesEx.ExecQuery("Select * From Win32_Process")
    const SWbemObjectExs = new Enumerator(SWbemObjectSet)

    const proc = SWbemObjectExs.find(SWbemObjectEx => {
        return processPaths.some(path => SWbemObjectEx.ExecutablePath === path)
    })

    return proc
}
