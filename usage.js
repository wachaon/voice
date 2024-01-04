const { speak, speach, getVoices, getVoiceID } = require('./index')

speak('こんにちは 世界')
speak('OK GOOGLE 今日の天気は', { Voice: getVoices().Microsoft.Haruka.Desktop })
speak('僕はずんだもん。アレクサ、今何時？', { Voice: getVoices().VOICEVOX['ずんだもん']['ノーマル'] })

speach(`私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。`,
    { speaker: Math.floor(Math.random() * 74) }
)
speach('九州そら。こんにちは 世界よ', { speaker: 17 })

speach('私の名前は満別花丸。何やら外が騒がしいぞ！', { speaker: getVoiceID('満別花丸', 'ぶりっ子') })