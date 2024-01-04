// imports built-ins
const { httprequest } = require('httprequest')

// imports libraries
const { getServer, serverError } = require('./server')

if (!getServer()) throw serverError

// exports
module.exports = {
    getDict,
    setDict,
    deleteDict
}

/**
 * Get list of dictionaries
 * @returns {Dict[]}
 */
function getDict() {
    return JSON.parse(httprequest('GET', 'http://127.0.0.1:50021/user_dict', { accept: "application/json" }).responseText)
}

/** @typedef {Number} Int */

/**
 * @typedef {Object} Dict
 * @property {String} surface
 * @property {String} pronunciation
 * @property {Int} accent_type
 * @property {"PROPER_NOUN"|"COMMON_NOUN"|"VERB"|"ADJECTIVE"|"SUFFIX"} [word_type] PROPER_NOUN(固有名詞) COMMON_NOUN(普通名詞) VERB(動詞) ADJECTIVE(形容詞) SUFFIX(語尾
 * @property {Int?} priority - from 0 to 10
 */

/**
 * Register in dictionary
 * @example
 * setDictionary({
 *   surface: '高品質',
 *   pronunciation: 'コウヒンシツ',
 *   accent_type: 1,
 *   word_type: 'ADJECTIVE()
 *   priority: 5
 * })
 * @param {Dict} dict
 */
function setDict(dict) {
    dict.surface = encodeURI(dict.surface)
    dict.pronunciation = encodeURI(dict.pronunciation)
    let params = Object
        .keys(dict)
        .map(key => `${key}=${dict[key]}`)
        .join('&')
    httprequest('POST', `http://127.0.0.1:50021/user_dict_word?${params}`, { accept: "application/json" }).responseText
}

/**
 * Cancel dictionary registration
 * @param {String} uuid
 */
function deleteDict(uuid) {
    httprequest('DELETE', `http://127.0.0.1:50021/user_dict_word?${uuid}`)
}