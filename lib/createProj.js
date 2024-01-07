// import library
const request = require('./request')

// export
module.exports = createProj

/** @typedef {Number} Int */
/** @typedef {Number} Double */
/** @typedef {String} Uuid */

/**
 * @typedef {Object} Query
 * @property {AccentPhrases} accent_phrases
 * @property {Int} speedScale
 * @property {Int} pitchScale
 * @property {Int} intonationScale
 * @property {Int} volumeScal
 * @property {Double} prePhonemeLengt
 * @property {Double} postPhonemeLength
 * @property {Double} outputSamplingRate
 * @property {Boolean} outputStereo
 * @property {String} kana
 * @property {Uuid} uuid - unique
 * @property {Int} styleId - unique
 */

/**
 * @typedef {Object} AccentPhrases
 * @property {Mora[]} moras
 * @property {Int} accent
 * @property {unkown?} pause_mora
 * @property {Boolean} is_interrogative
 */

/**
 * @typedef {Object} Mora
 * @property {String} text
 * @property {String} consonant
 * @property {Double} consonant_length
 * @property {String} vowel
 * @property {Double} vowel_length
 * @property {Double} pitch
 */

/**
 * @typedef {Object} Proj
 * @property {String} appVersion
 * @property {Uuid[]} audioKeys
 * @property {Query[]} audioItems
*/

/**
 * Create a project for use with VOICEVOX
 * @param  {Query[]} queries
 * @return {Proj}
 */
function createProj(queries) {
    const proj = {
        "appVersion": request('GET',
            'version',
            { headers: { accept: 'application/json' } }),
        audioKeys: queries.map(query => {
            return query.uuid
        }),
        audioItems: {}
    }

    queries.forEach(query => {
        proj.audioItems[query.uuid] = {}

        proj.audioItems[query.uuid].text = query.text
        proj.audioItems[query.uuid].engineId = "074fc39e-678b-4c13-8916-ffca8d505d1d"
        proj.audioItems[query.uuid].styleId = query.styleId
        proj.audioItems[query.uuid].query = {}
        proj.audioItems[query.uuid].query.accentPhrases = query.accent_phrases.map(phrases => {
            const res = {}
            res.moras = phrases.moras.map(mora => {
                const result = {}
                Object.keys(mora).forEach(key => {
                    const _key = key.replace(/(_[a-z])/g, ($) => $.toUpperCase().slice(-1))
                    if (mora[key] != null) result[_key] = mora[key]
                })
                return result
            })
            if (phrases.accent != null) res.accent = phrases.accent
            if (phrases.pause_mora != null) {
                res.pauseMora = {}
                Object.keys(phrases.pause_mora).forEach(mora_key => {
                    const _key = mora_key.replace(/(_[a-z])/g, ($) => $.toUpperCase().slice(-1))
                    if (phrases.pause_mora[mora_key] != null) res.pauseMora[_key] = phrases.pause_mora[mora_key]
                })
            }
            if (phrases.is_interrogative != null) res.isInterrogative = phrases.is_interrogative

            return res
        })

        if (query.speedScale != null) proj.audioItems[query.uuid].query.speedScale = query.speedScale
        if (query.pitchScale != null) proj.audioItems[query.uuid].query.pitchScale = query.pitchScale
        if (query.intonationScale != null) proj.audioItems[query.uuid].query.intonationScale = query.intonationScale
        if (query.volumeScale != null) proj.audioItems[query.uuid].query.volumeScale = query.volumeScale
        if (query.prePhonemeLength != null) proj.audioItems[query.uuid].query.prePhonemeLength = query.prePhonemeLength
        if (query.postPhonemeLength != null) proj.audioItems[query.uuid].query.postPhonemeLength = query.postPhonemeLength
        if (query.outputSamplingRate != null) proj.audioItems[query.uuid].query.outputSamplingRate = query.outputSamplingRate
        if (query.outputStereo != null) proj.audioItems[query.uuid].query.outputStereo = query.outputStereo
        if (query.kana != null) proj.audioItems[query.uuid].query.kana = query.kana
    })

    return proj
}