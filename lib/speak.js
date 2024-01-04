// imports OLE
const sapi = require("SAPI.SpVoice")

// exports
module.exports = speak

/** @typedef {Number} Int */

/**
 * @typedef {Object} SpVoice
 * @property {SpeechVoiceEvents} AlertBoundary - AlertBoundary () {get} {set}
 * @property {Boolean} AllowAudioOutputFormatChangesOnNextSet - AllowAudioOutputFormatChangesOnNextSet () {get} {set}
 * @property {ISpeechObjectToken} AudioOutput - AudioOutput () {get} {set by ref}
 * @property {ISpeechBaseStream} AudioOutputStream - AudioOutputStream () {get} {set by ref}
 * @property {SpeechVoiceEvents} EventInterests - EventInterests () {get} {set}
 * @property {SpeechVoicePriority} Priority - Priority () {get} {set}
 * @property {Int} Rate - Rate () {get} {set}
 * @property {ISpeechVoiceStatus} Status - Status () {get}
 * @property {Int} SynchronousSpeakTimeout - SynchronousSpeakTimeout () {get} {set}
 * @property {ISpeechObjectToken} Voice - Voice () {get} {set by ref}
 * @property {Int} Volume - Volume () {get} {set}
 */

/**
 * @typedef {Object} SpeakOptions
 * @property {ISpeechObjectToken} Voice
 */

/**
 * Output audio using "SAPI.SpVoice". You can also select the audio type.
 * @example
 * const voices = require('./getVoices')()
 * speak('ずんだもんなのだ', { Voice: getVoices().VOICEVOX['ずんだもん']['ノーマル'] })
 * @param {string} content
 * @param {SpeakOptions?} options
 */
function speak(content, options = {}) {
    Object.keys(options).forEach(attr => sapi[attr] = options[attr])
    sapi.Speak(content)
}