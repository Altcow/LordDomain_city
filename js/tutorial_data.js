// js/tutorial_data.js — 新手教學 T0~T11 的文案與前往動作(純資料,無 DOM)。引擎 tutorial.js,卡片介面 nextstepui.js。
// 每步:icon、text(主句 ≤30 字)、why(≤40 字)、go(前往動作,同 nextstep 的 go;另加 {kind:'tut', id:'start'|'grad'} 給 T0 開始 / T11 好)。
// 完成條件與修復提示在 tutorial.js(tutDone / tutRepair),以免資料與條件分散兩處。
// A 包(城市經營):無卡牌與戰鬥,教學只有 T0(到任)與 T1~T11(蓋房 / 研科技 / 解鎖新建築),共 11 步。
// 進度顯示 n/11:T0 = 0/11(到任),T1~T10 = 1~10/11,T11 = 11/11(畢業卡)。
// 全域名稱:TUT_IDS TUT_TEXT TUT_TEXT_SIMPLE TUT_TOTAL
var TUT_IDS = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11'];
var TUT_TOTAL = 11;
// 簡化城市模式(js/citysimple.js CITY_SIMPLE)的教學:只教「蓋建築 → 研科技 → 解鎖新建築」。{t1}{b1}{t2}{b2} 由 tutorial.js 依 TECH_SIMPLE.tut 代入科技 / 建築名。
var TUT_TEXT_SIMPLE = {
  T0: { icon: '🏡', text: '大人到任啦!這是您的小村。', why: '先走一遍蓋房子、研科技、解鎖新建築。約 5 分鐘。', go: { kind: 'tut', id: 'start' } },
  T1: { icon: '🏠', text: '先蓋一間民房,讓百姓住下來。', why: '民房會產金幣,人口越多,官階升得越快。', go: { kind: 'build', type: 'house' } },
  T2: { icon: '📜', text: '蓋一座研究院,才能研發科技。', why: '新建築都要先研發對應的科技才能蓋。', go: { kind: 'build', type: 'research' } },
  T3: { icon: '📜', text: '打開科技,研發〈{t1}〉。', why: '研成就能蓋{b1}。這一項教學期間免費、30 秒研完。', go: { kind: 'tech', id: '{t1}' } },
  T4: { icon: '⏳', text: '〈{t1}〉研發中…點科技看看「研成可蓋」寫了什麼。', why: '每項科技都寫著:要先蓋什麼、研成能蓋什麼。', go: { kind: 'tech', id: '{t1}' } },
  T5: { icon: '🏪', text: '〈{t1}〉研成了!蓋一座{b1}吧。', why: '研成的科技會解鎖新建築,建造選單裡就找得到。', go: { kind: 'build', type: '{b1}' } },
  T6: { icon: '📜', text: '再研發〈{t2}〉。它的前置建築是{b1},您已經蓋好了。', why: '有些科技要先蓋好某座建築才能研,科技卡上會寫「先蓋 XX」。', go: { kind: 'tech', id: '{t2}' } },
  T7: { icon: '⏳', text: '〈{t2}〉研發中,研成後可以蓋{b2}。', why: '研發中可以先去做別的事。', go: { kind: 'tech', id: '{t2}' } },
  T8: { icon: '📜', text: '〈{t2}〉研成了!蓋一座{b2}。', why: '蓋建築 → 解鎖科技 → 再蓋新建築,城就這樣長大。', go: { kind: 'build', type: '{b2}' } },
  T9: { icon: '🏠', text: '把民房擴到 4 棟(400 戶)。', why: '人口和建築越多,繁榮度越高,官階就升得上去。', go: { kind: 'build', type: 'house' } },
  T10: { icon: '🔍', text: '打開科技,挑下一項來研。', why: '灰色寫「先蓋 XX」的,點「前往」就帶您去蓋。', go: { kind: 'panel', id: 'tech' } },
  T11: { icon: '🎓', text: '教學完成!之後右上的建議會提示:有哪些科技可研、哪些建築已解鎖還沒蓋。', why: '', go: { kind: 'tut', id: 'grad' } }
};
var TUT_TEXT = TUT_TEXT_SIMPLE;   // A 包只用簡化版文案(蓋建築 ↔ 研科技)
