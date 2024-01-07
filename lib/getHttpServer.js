// import OLE
const IServerXMLHTTPRequest2 = getHttpServer()

// export
module.exports = getHttpServer

/**
 * @typedef {Object<string, value>} IServerXMLHTTPRequest2
 */

/**
 * Returns the path of the included IServerXMLHTTPRequest2.
 * @returns {IServerXMLHTTPRequest2}
 */
function getHttpServer() {
    let result
    let names = [
        'MSXML2.ServerXMLHTTP.6.0',
        'MSXML2.ServerXMLHTTP.3.0',
        'MSXML2.ServerXMLHTTP',
        'MSXML2.XMLHTTP.6.0',
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
    ]
    names.find((name) => {
        try {
            result = require(name)
            return true
        } catch (e) {
            return false
        }
    })
    return result
}
