// js/features.js — 功能開關表(休眠機制,見 tools/dormant_features.md)。
// 載入順序:index.html 第一個 script(data.js 之前);sw.js PRECACHE 同步。純資料 + 純函式,不碰 DOM / 存檔。
// 規則:預設值 true 時行為與未加守衛前完全相同;改 false 即休眠該功能(程式與存檔保留,不刪)。
// 守衛寫法:if (!featureOn('名稱')) return;   // @DORMANT 名稱
// 測試可在載入後覆寫,例:FEATURES.caravan_buy = true。
var FEATURES = {
  cityedit: true,      // 城內建造 / 放置 / 拆除 / 草稿 / 版面存檔 / 清空
  citysim: true,       // 城內產出、衛生 / 居民 / 交通 / 採集 tick
  interiors: true,     // 建築室內
  pet: false,          // 仙獸苑入口(A 包休眠:v1 不開放,程式保留)
  multiworld: false,   // 多世界:頂列「世 NN」、我的世界、新遊戲精靈(A 包休眠:改用單一世界 × 3 經營陣地,見 mapedit.js estTagSync / map.js layoutOpenEstate)
  caravan_buy: false,  // 走鏢買車 / 車棚添購(開局每種馬車 1 輛)
  worldmap: false      // 大地圖 / 外勤清單(R1a:wm_core.js 入口已守衛;UI 與主流程尚未接入,預設關,測試時開)
};
var FEATURES_WARNED = {};
// 未知名稱回 false 並只警告一次(避免拼錯名稱時靜默失效)
function featureOn(name) {
  if (Object.prototype.hasOwnProperty.call(FEATURES, name)) return !!FEATURES[name];
  if (!FEATURES_WARNED[name]) {
    FEATURES_WARNED[name] = true;
    if (typeof console !== 'undefined' && console.warn) console.warn('featureOn: 未知功能名稱 ' + name);
  }
  return false;
}
