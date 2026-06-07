---
title: Obsidian 涓娇鐢?Codex
time: 2026-06-07
tags:
  - obsidian
  - codex
  - claudian
---

## 姒傝堪

Claudian 鎻掍欢鏀寔涓や釜 provider锛?
| Provider | 璇存槑 | 妯″瀷绀轰緥 |
|----------|------|---------|
| Claude | 璋冪敤鏈湴 Claude Code CLI | Opus銆丼onnet銆丠aiku |
| Codex | 璋冪敤鏈湴 Codex CLI锛屾敮鎸?OpenAI 鍏煎 API | mimo-v2.5銆乷4-mini 绛?|

閰嶇疆鏂囦欢璺緞锛歚<vault>/.claudian/claudian-settings.json`

## 閰嶇疆姝ラ

### 绗竴姝ワ細寮€鍚?Codex 寮€鍏?
Claudian 璁剧疆 鈫?**Codex** 鏍囩椤?鈫?**Enable Codex provider** 鈫?鎵撳紑

涓嶅紑杩欎釜寮€鍏筹紝妯″瀷閫夋嫨鍣ㄩ噷涓嶄細鍑虹幇 Codex 妯″瀷銆?
### 绗簩姝ワ細濉啓 Codex CLI 璺緞

Claudian 璁剧疆 鈫?**Codex** 鏍囩椤?鈫?**Codex CLI path** 鈫?濉叆 codex.exe 瀹屾暣璺緞

**鏌ユ壘璺緞鐨勫懡浠?*锛?
```bash
# Git Bash / CMD
where codex

# PowerShell
Get-Command codex | Select-Object -ExpandProperty Source
```

甯歌璺緞锛?- Chocolatey 瀹夎锛歚C:\Users\<鐢ㄦ埛鍚?\AppData\Local\UniGetUI\Chocolatey\bin\codex.exe`
- npm 鍏ㄥ眬瀹夎锛氭鏌?`C:\Users\<鐢ㄦ埛鍚?\AppData\Roaming\npm\`

鐣欑┖鍙嚜鍔ㄤ粠 PATH 妫€娴嬶紝浣嗘墜鍔ㄦ寚瀹氭洿鍙潬銆?
### 绗笁姝ワ細閰嶇疆鑷畾涔夋ā鍨?
**鏂瑰紡涓€锛歎I 閰嶇疆锛堟帹鑽愶級**

Claudian 璁剧疆 鈫?Codex 鏍囩椤?鈫?Custom models 鈫?姣忚濉竴涓ā鍨嬪悕

**鏂瑰紡浜岋細鐩存帴鏀归厤缃枃浠?*

缂栬緫 `<vault>/.claudian/claudian-settings.json`锛?
```json
"providerConfigs": {
  "codex": {
    "customModels": "mimo-v2.5\nmimo-v2-pro"
  }
}
```

姣忚涓€涓ā鍨嬪悕锛屼細**杩藉姞**鍒伴€夋嫨鍒楄〃锛屼笉浼氭浛鎹㈠唴缃粯璁ゆā鍨嬨€?
### 绗洓姝ワ細楠岃瘉

鎵撳紑 Claudian 瀵硅瘽妗?鈫?妯″瀷閫夋嫨鍣?鈫?纭鍑虹幇 Codex 鍒嗙粍鍜屼綘娣诲姞鐨勬ā鍨嬶細

```
CLAUDE
  Opus
  Sonnet
  Haiku
CODEX
  mimo-v2-pro
  mimo-v2.5
  GPT-5.5          鈫?鍐呯疆榛樿锛屼笉鏀寔鍙拷鐣?  GPT-5.4 Mini     鈫?鍐呯疆榛樿锛屼笉鏀寔鍙拷鐣?```

閫夋嫨浣犵殑妯″瀷锛堝 `mimo-v2.5`锛夊嵆鍙紑濮嬪璇濄€?
**娉ㄦ剰**锛欳laudian 榛樿浣跨敤 Claude provider銆傜偣鍑?**+** 鏂板缓瀵硅瘽鏃舵墠浼氬脊鍑烘ā鍨嬮€夋嫨鍣紝璁╀綘鍒囨崲鍒?Codex銆傚凡鏈夊璇濅笉鑳戒腑閫斿垏鎹?provider銆?
## 甯哥敤閰嶇疆椤?
### 榛樿妯″瀷

`savedProviderModel` 璁颁綇涓婃閫夋嫨鐨勬ā鍨嬶細

```json
"savedProviderModel": {
  "claude": "sonnet",
  "codex": "mimo-v2.5"
}
```

### 鎬濊€冮绠椾笌鍔姏绾у埆

```json
"savedProviderThinkingBudget": {
  "claude": "low",
  "codex": "low"
},
"savedProviderEffort": {
  "claude": "high",
  "codex": "medium"
}
```

### 鏂板璇濋粯璁?Provider

```json
"settingsProvider": "claude"
```

璁句负 `"claude"` 鍒欐柊瀵硅瘽榛樿鐢?Claude锛岃涓?`"codex"` 鍒欓粯璁ょ敤 Codex銆?
## 宸茬煡闄愬埗

1. **鍐呯疆榛樿妯″瀷鏃犳硶鍒犻櫎**锛欳laudian 瀵?Codex 鍐呯疆浜?`GPT-5.5` 鍜?`GPT-5.4 Mini`锛宍customModels` 鍙兘杩藉姞涓嶈兘鏇挎崲銆侫PI 涓嶆敮鎸佽繖浜涙ā鍨嬫椂閫変腑浼氭姤閿欙紝蹇界暐鍗冲彲銆?
2. **UI 淇敼浼氳鐩栨墜鍔ㄧ紪杈?*锛氬湪 Claudian 璁剧疆鐣岄潰鏀规ā鍨嬪悗锛屼細瑕嗙洊 `savedProviderModel` 鐨勫€笺€傚鏋滆瑕嗙洊鎴愪笉鏀寔鐨勬ā鍨嬶紝闇€瑕佸湪 UI 閲嶆柊閫夋嫨姝ｇ‘鐨勬ā鍨嬨€?
3. **`enabled` 瀛楁鍙兘琚噸缃?*锛氬垏鎹?provider 璁剧疆鍚庯紝`codex.enabled` 鍙兘鍙樺洖 `false`锛岄渶瑕侀噸鏂板紑鍚€?
## 鎺ュ叆灏忕背 MiMo 瀹屾暣娴佺▼

1. Codex 妗岄潰绔厛閰嶇疆濂藉皬绫?API 鐨?base URL 鍜?API key
2. Claudian 璁剧疆 鈫?Codex 鏍囩椤?鈫?寮€鍚紑鍏?3. 濉啓 Codex CLI path锛坄where codex` 鏌ヨ矾寰勶級
4. Custom models 濉叆锛?   ```
   mimo-v2.5
   mimo-v2-pro
   ```
5. 妯″瀷閫夋嫨鍣ㄤ腑閫?`mimo-v2.5` 寮€濮嬪璇?
---

> 📎 [[笔记/index|📒 返回笔记索引]]

