// import OLE
const WShell = require('WScript.Shell')

// export
module.exports = execute

/**
 * Run the program in command prompt.
 * @example
 * execute('dir', 'Get file list')
 * @param {String} cmd
 * @param {String?} message
 */
function execute(cmd, message = 'execte command') {
    const exec = WShell.Exec(`cmd /c ${cmd}`)

    let counter = 0
    const indicator = ['|', '/', '-', '\\',]
    const rotation = indicator.length

    while (exec.Status == 0) {
        console.weaklog(`${indicator[counter++ % rotation]} ${message}`)
        WScript.Sleep(50)
    }

    const error = exec.StdErr.ReadAll()
    if (error) console.error(error)
    else console.log(exec.StdOut.ReadAll())
}