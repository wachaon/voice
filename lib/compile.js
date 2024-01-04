// imports built-ins
const { SPACE } = require('text')
const { search } = require('match')

// imports libraries
const execute = require('./execute')

// constant
const compiler = getCompiler()

// exports
module.exports = compile

/**
 * Compile C#.
 * @example
 * compile('player.cs', { target: 'exe', out: 'player.exe' })
 * @param {string} path
 * @param {Object<string, string>} options
 */
function compile(path, options = {}) {
    let opts = []
    Object.keys(options).forEach(key => {
        const value = options[key]
        opts.push(`/${key}:${value}`)
    })
    const command = `${compiler} ${opts.join(SPACE)} ${path}`
    console.log(() => command)
    execute(`${command}`, `${path} compiling`)
}

// util
/**
 * Returns the path of the included csc.exe.
 * @returns {string}
 */
function getCompiler() {
    return search('**/csc.exe', 'C:/Windows/Microsoft.NET/Framework').slice(-1)[0]
}