// imports libraries
const { initServer, getServer, serverError } = require('./server')
const request = require('./request')

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
    initServer()
    if (!getServer()) throw serverError

    return request('GET', 'user_dict', { headers: { accept: "application/json" } })
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
 * setDict({
 *   surface: '高品質',
 *   pronunciation: 'コウヒンシツ',
 *   accent_type: 1,
 *   word_type: 'ADJECTIVE()
 *   priority: 5
 * })
 * @param {Dict} dict
 */
function setDict(dict) {
    initServer()
    if (!getServer()) throw serverError

    dict.surface = encodeURI(dict.surface)
    dict.pronunciation = encodeURI(dict.pronunciation)
    console.debug('dict: %J', dict)

    return request('POST', 'user_dict_word', {
        params: dict
    })
}

/**
 * Cancel dictionary registration
 * @param {String} uuid
 */
function deleteDict(uuid) {
    initServer()
    if (!getServer()) throw serverError

    return request('DELETE', `user_dict_word/${uuid}`)
}