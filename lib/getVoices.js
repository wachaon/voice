// import OLE
const sapi = require("SAPI.SpVoice")

// import built-in
const { Enumerator } = require('JScript')

// import library
const request = require('./request')

// export
module.exports = {
    getVoices,
    getVoiceID
}

/** @typedef {Number} Int */
/**
 * Get the list of voice objects available in "SAPI.SpVoice".
 * @example
 * getVoices("Language=411") // japanese
 * // Gender (select Male / Female)
 * // Age (Adult only)
 * // Name (Haruka etc.)
 * // Language	(411 etc.)
 * // Vendor (Microsoft etc.)
 * @param {String} option
 * @returns
 */
function getVoices(option) {
    const voices = {}
    new Enumerator(sapi.GetVoices(option))
        .forEach(voice => {
            const name = voice.GetAttribute("Name")
            const names = name.split(/\s+/)
            const vender = names[0]
            const status = names[names.length - 1]
            const charactor = name.slice(vender.length, status.length * -1).trim()

            voices[name] = voice
            voices[vender] = voices[vender] || {}
            voices[vender][charactor] = voices[vender][charactor] || {}
            voices[vender][charactor][status] = voice
        })
    return voices
}

/**
 * Returns the VOICEVOX speaker ID from an audio object.
 * @example
 * const { speach, getVoices, getVoiceID } = require('voice')
 * speach('何やら外が騒がしいぞ', { speaker: getVoiceID('九州そら','ささやき') })
 * @param {String} name
 * @param {String} type
 * @returns {Int} speaker
 */
function getVoiceID(name, type) {
    const speakers = request('GET', 'speakers', {
        headers: {
            accept: 'application/json'
        }
    })
    if (!type) {
        if (!name) return speakers
        else return speakers
            .find(speaker => speaker.name === name)
            .styles
    }
    return speakers
        .find(speaker => speaker.name === name)
        .styles
        .find(style => style.name == type)
        .id
}
