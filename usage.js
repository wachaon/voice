const { speak, speach, getVoices, getVoiceID, getDict, setDict, deleteDict } = require('./index')

speak('こんにちは 世界')
speak('OK GOOGLE 今日の天気は', { Voice: getVoices().Microsoft.Haruka.Desktop })
// speak('僕はずんだもん。アレクサ、今何時？', { Voice: getVoices().VOICEVOX['ずんだもん']['ノーマル'] })

speach(`私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。`,
    { speaker: Math.floor(Math.random() * 74) }
)
speach('九州そら。こんにちは 世界よ', { speaker: 17 })

speach('私の名前は満別花丸。何やら外が騒がしいぞ！', { speaker: getVoiceID('満別花丸', 'ぶりっ子') })

setDict({
    surface: 'VOICEVOX',
    pronunciation: "ボイスボックス",
    accent_type: 5,
    word_type: 'PROPER_NOUN',
    priority: 5
})

speach('こちらにあるVOICEVOXを使用すれば簡単に音声を生成できます。', { speaker: getVoiceID('ずんだもん', 'ささやき') })

const dict = getDict()
Object.keys(dict).forEach(id => {
    if (dict[id].surface === 'ＶＯＩＣＥＶＯＸ') {
        console.log(() => ['ＶＯＩＣＥＶＯＸ', dict[id]])
        console.log(() => deleteDict(id))
    }
    if (dict[id].surface === 'VOICEVOX') {
        console.log(() => ['VOICEVOX', dict[id]])
        console.log(() => deleteDict(id))
    }
})

console.log(() => getDict())