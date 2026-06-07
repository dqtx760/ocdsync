---
title: Obsidian 涓娇鐢?Claude
time: 2026-06-07
tags:
  - obsidian
  - claudian
  - troubleshooting
---

## 浣跨敤鏂规硶

1. 璁╁鎴锋埅鍥惧彂鏉ユ姤閿欎俊鎭?2. 鏍规嵁鎶ラ敊绫诲瀷閫夋嫨瀵瑰簲鐨勮瘽鏈ā鏉?3. 璁╁鎴峰湪缁堢鍚姩 Claude Code锛岀矘璐磋瘽鏈彂閫佸嵆鍙?
---

## 涓€銆佸惎鍔?Claude Code

win+R 杈撳叆 cmd

绮樿创涓嬮潰鍛戒护鍚姩 Claude Code

```
claude --dangerously-skip-permissions
```

> 娉ㄦ剰锛氬鎴锋槸 npm 瀹夎鐨?Claude Code锛岀敤 clijs 璺緞锛堜笉鏄?claude.cmd锛?
---

## 浜屻€丆laude Provider 閰嶇疆

Claudian 璁剧疆 鈫?**Claude** 鏍囩椤?鈫?**Claude CLI path** 鈫?濉叆 claude.exe 瀹屾暣璺緞

**鏌ユ壘璺緞鐨勬柟娉?*锛堣瀹㈡埛鍦ㄧ粓绔墽琛岋級锛?
```bash
for %I in ("%APPDATA%\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe") do @echo %~fI
```

浼氳緭鍑哄畬鏁磋矾寰勶紝鐩存帴澶嶅埗绮樿创鍒?Claudian 璁剧疆涓嵆鍙€?
甯歌璺緞锛?- npm 鍏ㄥ眬瀹夎锛堟渶甯歌锛夛細`C:\Users\<鐢ㄦ埛鍚?\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe`

> 鈿狅笍 `where claude` 鏌ュ埌鐨勬槸鍚姩鑴氭湰锛?cmd锛夛紝涓嶆槸瀹為檯鐨?exe銆傞厤缃枃浠堕渶瑕佸～ exe 鐨勫畬鏁磋矾寰勩€?
---

## 涓夈€丆laude Provider 鎶ラ敊璇濇湳

閫傜敤浜庯細妯″瀷閫夋嫨鍣ㄥ彧鏈?Claude 閫夐」锛屽璇濇椂鎶ラ敊銆?
```
Claude Code 缁堢浣跨敤姝ｅ父锛屼絾鍦?Obsidian 鐨?Claudian 鎻掍欢涓璇濇姤閿欙紝甯垜妫€鏌ュ苟淇 claudian-settings.json 閰嶇疆鏂囦欢銆?
鎴戞槸 npm 瀹夎鐨?Claude Code锛宑li 璺緞鏄細C:\Users\<鐢ㄦ埛鍚?\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe

鎶ラ敊淇℃伅濡備笅锛?```

锛堣瀹㈡埛绮樿创瀹為檯鎶ラ敊鎴浘鎴栨枃瀛楋紝骞舵浛鎹㈣矾寰勪负鑷繁鐨勫疄闄呰矾寰勶級

---

## 鍥涖€丆odex Provider 鎶ラ敊璇濇湳

閫傜敤浜庯細浣跨敤 Codex 妯″瀷锛堝灏忕背 MiMo锛夋椂鎶ラ敊銆?
```
Codex 妗岄潰绔娇鐢ㄦ甯革紝浣嗗湪 Obsidian 鐨?Claudian 鎻掍欢涓璇濇姤閿欙紝甯垜妫€鏌ュ苟淇 claudian-settings.json 閰嶇疆鏂囦欢銆?
鎴戠殑 Codex CLI 璺緞鏄細C:\Users\<鐢ㄦ埛鍚?\AppData\Local\UniGetUI\Chocolatey\bin\codex.exe
鎴戜娇鐢ㄧ殑妯″瀷鏄細mimo-v2.5

鎶ラ敊淇℃伅濡備笅锛?```

锛堣瀹㈡埛绮樿创瀹為檯鎶ラ敊鎴浘鎴栨枃瀛楋紝骞舵浛鎹㈣矾寰勫拰妯″瀷鍚嶄负鑷繁鐨勫疄闄呭€硷級

### 甯歌 Codex 鎶ラ敊

**妯″瀷涓嶆敮鎸?*锛?```
鉂?Error: {"error":{"message":"Param Incorrect","type":"upstream_error","code":"400","param":"Not supported model gpt-5.5"}}
```

鍘熷洜锛歚savedProviderModel.codex` 琚鎴愪簡涓嶆敮鎸佺殑妯″瀷鍚嶃€備慨澶嶏細鏀逛负 API 瀹為檯鏀寔鐨勬ā鍨嬪悕锛堝 `mimo-v2.5`锛夈€?
**Codex 寮€鍏虫湭寮€鍚?*锛?妯″瀷閫夋嫨鍣ㄤ腑鐪嬩笉鍒?Codex 鍒嗙粍銆?
鍘熷洜锛歚providerConfigs.codex.enabled` 涓?`false`銆備慨澶嶏細鍦?Claudian 璁剧疆 鈫?Codex 鏍囩椤垫墦寮€寮€鍏炽€?
---

## 浜斻€佽烦杩囩粓绔俊浠绘彁绀?
瀹㈡埛姣忔鍚姩 Claude Code 閮戒細鐪嬪埌瀹夊叏纭鎻愮ず锛屽府蹇欓厤缃烦杩囷細

```
姣忔鍚姩 Claude Code 閮借鎵嬪姩纭淇′换鏂囦欢澶癸紝寰堥夯鐑︼紝甯垜閰嶇疆璺宠繃杩欎釜鎻愮ず銆?
缁堢鏄剧ず鐨勫唴瀹规槸锛?
Accessing workspace:
C:\Users\Running\Desktop

Quick safety check: Is this a project you created or one you trust?
```

---

## 鍏€侀厤缃枃浠跺叧閿瓧娈甸€熸煡

缁?Claude Code 鍙傝€冿紝蹇€熷畾浣嶉棶棰樺瓧娈碉細

| 瀛楁 | 浣滅敤 | 甯歌闂 |
|------|------|---------|
| `providerConfigs.claude.cliPath` | Claude CLI 璺緞 | npm 瀹夎娉ㄦ剰鐢?clijs 璺緞锛屼笉鏄?claude.cmd |
| `providerConfigs.claude.customModels` | Claude 鑷畾涔夋ā鍨?| 涓€鑸笉闇€瑕佹敼 |
| `providerConfigs.codex.enabled` | Codex 寮€鍏?| 涓?`false` 鏃剁湅涓嶅埌 Codex 妯″瀷 |
| `providerConfigs.codex.customModels` | Codex 鑷畾涔夋ā鍨嬪垪琛?| 杩藉姞鑰岄潪鏇挎崲锛屽唴缃?GPT 妯″瀷鍒犱笉鎺?|
| `providerConfigs.codex.cliPathsByHost` | Codex CLI 璺緞 | 璺緞閿欒浼氬鑷存棤娉曞惎鍔?|
| `savedProviderModel` | 鍚?provider 榛樿妯″瀷 | 濉簡涓嶆敮鎸佺殑妯″瀷鍚嶄細鎶?400 |
| `settingsProvider` | 鏂板璇濋粯璁?provider | `"claude"` 鎴?`"codex"` |
---

> 📎 [[笔记/index|📒 返回笔记索引]]

