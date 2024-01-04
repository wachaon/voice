const { getVoiceID, getVoices } = require('./lib/getVoices')
const speak = require('./lib/speak')

console.log(() => getVoiceID())

getVoiceID().forEach(character => {
    character.styles.forEach(type => {
        console.log(() => `私の名前は${character.name}。今は${type.name}で話している。`)
        speak(
            `私の名前は${character.name}。今は${type.name}で話している。`,
            { Voice: getVoices().VOICEVOX[character.name][type.name] }
        )
    })
})