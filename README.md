# voice

*voice* は文字列から声を生成する [*wes*][wes] 用のモジュールになります。

## install

インストールには [*wes*][wes] が必要になります。

```batch
wes install @wachaon/voice --bare
```

## usage

一番シンプルな用法になります。

```javascript
const { speak } = require('voice')
speak('こんにちは 世界')
```

`speak()` は *SAPI.SpVoice* を利用して話します。
第2引数に声色を設定できます。

```javascript
const { speak, getVoices } = require('voice')
speak('こんにちは 世界', { Voice: getVoices().Microsoft.Haruka.Desktop })
```

## VOICEVOX 連携
 
[*VOICEVOX*][VOICEVOX] と連携することによってより多くの声色に対応できます。
逆に `speak()` 以外のメソッドは [*VOICEVOX*][VOICEVOX] のインストールが必要になります。

`speak()` で声色を変更するには [*VOICEVOX*][VOICEVOX] と [*SAPIForVOICEVOX*][SAPIForVOICEVOX] の両方をイントールしてください。([*SAPIForVOICEVOX*][SAPIForVOICEVOX] は *64bit* 版をインストールしてください。)

## usage

シンプルな方法での声色変更です。

```javascript
const { speak, getVoices } = require('voice')
speak('こんにちは 世界なのだ', { Voice: getVoices().VOICEVOX['ずんだもん']['ヒソヒソ'] })
```

## VOICEVOX ENGINE

[*VOICEVOX*][VOICEVOX] をインストールすれば *VOICEVOX ENGINE* を利用することで、
細やかな制御を行うことが可能です。

*VOICEVOX ENGINE* を利用する流れ

1. *audio_query* の生成
2. *audio_query* から *audio.wav* ファイルを生成
3. *audio.wav* ファイルを [*wes*][wes] から再生できるように *player.exe* を生成
4. *player.exe* 利用し、 *audio.wav* を再生

`speaker` は声色のIDになります。

```javascript
const { speach, getVoiceID } = require('voice')
speach('こんにちは 世界よ', { speaker: getVoiceID('あいえるたん', 'ノーマル') })
```

*speaker* の一覧はコマンドで呼び出せます

```javascript
const { getVoiceID } = require('/index')
console.log(() => getVoiceID())
```

また、[*VOICEVOX*][VOICEVOX] の声色は以下で確認できます。

```batch
wes voices
```

## 辞書登録

*dict* モジュールで辞書の取得・設定・削除ができます。

```javascript
const { getDict, setDict, deleteDict } = require('voice')
setDict({
    surface: 'VOICEVOX',
    pronunciation: "ボイスボックス",
    accent_type: 5,
    word_type: 'PROPER_NOUN',
    priority: 5
})
let dict = getDict()
Object.keys(dict).forEach(id => {
    if (dict[id].surface === 'ＶＯＩＣＥＶＯＸ') {
        console.log(() => ['ＶＯＩＣＥＶＯＸ', dict[id]])
        deleteDict(id)
    }
})
```

## 追加機能

`speach()` は *query.json* 生成後に `transformer()` を指定でき、*json* を動的に変更することができます。


[wes]: <https://github.com/wachaon/wes/>
[VOICEVOX]: <https://voicevox.hiroshiba.jp/>
[SAPIForVOICEVOX]: <https://github.com/shigobu/SAPIForVOICEVOX/>