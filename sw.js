const VERSION = 'v1';             // 每次發佈新版都要遞增：v1 → v2 → v3 …
const CACHE_PREFIX = 'ldcity-';
const CACHE_NAME = CACHE_PREFIX + VERSION;
const IMG_CACHE = CACHE_PREFIX + 'img-' + VERSION;   // 執行期圖片快取桶(assets/buildings、assets/portraits、assets/ui、assets/terrain):第一次載入後存起來,離線可用;版本遞增換新桶
const RUNTIME_PATHS = ['/assets/buildings/', '/assets/portraits/', '/assets/ui/', '/assets/terrain/', '/assets/traffic/'];
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './css/search.css',
  './js/features.js',
  './js/data.js',
  './js/units.js',
  './js/wallskin.js',
  './js/theme_skin.js',
  './js/fx_tech_data.js',
  './js/fxpack.js',
  './js/progdata.js',
  './js/cityonly.js',
  './js/cityscore_data.js',
  './js/cityscore.js',
  './js/goodsdata.js',
  './js/fx_goods_data.js',
  './js/goods.js',
  './js/bmcdata.js',
  './js/bmc.js',
  './js/mktbuy.js',
  './js/techtree_data.js',
  './js/nolevel_data.js',
  './js/techtree_simple_data.js',
  './js/citysimple.js',
  './js/citytech.js',
  './js/fishdata.js',
  './js/map.js',
  './js/mapio.js',
  './js/prog.js',
  './js/tech.js',
  './js/templates.js',
  './js/templates112.js',
  './js/path.js',
  './js/perf.js',
  './js/art.js',
  './js/glr.js',
  './js/art_objects.js',
  './js/art_units.js',
  './js/art_deco1.js',
  './js/art_deco2.js',
  './js/art_deco3.js',
  './js/art_deco4.js',
  './js/art_deco5.js',
  './js/art_nl.js',
  './js/art_port.js',
  './js/art_town.js',
  './js/art_set.js',
  './js/combos.js',
  './js/art_traffic.js',
  './js/art_wallskin.js',
  './js/art_theme.js',
  './js/ext_sprites_data.js',
  './js/ext_sprites.js',
  './js/terrain_tex.js',
  './js/render.js',
  './js/fishdraw.js',
  './js/fishing.js',
  './js/lifedata.js',
  './js/citylife.js',
  './js/ethnic_data.js',
  './js/crowdparts.js',
  './js/crowdparts_fantasy.js',
  './js/citytraffic.js',
  './js/gatherdata.js',
  './js/citygather.js',
  './js/traffic_sprites.js',
  './js/talentpatrol.js',
  './js/chainvis.js',
  './js/cityfx_data.js',
  './js/cityfx.js',
  './js/objcat.js',
  './js/uiicons.js',
  './js/cityadvisor_data.js',
  './js/cityadvisor.js',
  './js/nextstep_data.js',
  './js/nextstep.js',
  './js/tutorial_data.js',
  './js/tutorial.js',
  './js/panorama.js',
  './js/audiodata.js',
  './js/audio.js',
  './js/audiocache.js',
  './js/bgm.js',
  './js/ambient.js',
  './js/mymusic.js',
  './js/recorder.js',
  './js/ui.js',
  './js/nl_objects.js',
  './js/nl_style_objects.js',
  './js/art_tavern.js',
  './js/art_gather.js',
  './js/panelmgr.js',
  './js/caravan_goods.js',
  './js/caravan.js',
  './js/caravanui.js',
  './js/caravan_vis.js',
  './js/buildpreview.js',
  './js/techui.js',
  './js/search.js',
  './js/saveslots.js',
  './js/savesui.js',
  './js/worldpacks.js',
  './js/worldwizard.js',
  './js/settingsui.js',
  './js/progui.js',
  './js/terrain_live.js',
  './js/lordhallui.js',
  './js/cityscoreui.js',
  './js/cityadvisorui.js',
  './js/nextstepui.js',
  './js/guide.js',
  './js/mapedit.js',
  './js/fishui.js',
  './js/petdata.js',
  './js/pet.js',
  './js/petdraw.js',
  './js/petui.js',
  './js/interior.js',
  './js/tavern_data.js',
  './js/tavern_scene.js',
  './js/tavern_i1.js',
  './js/interiors_pack1_data.js',
  './js/interiors_pack1.js',
  './js/interiors_pack2_data.js',
  './js/interiors_pack2.js',
  './js/bldtag.js',
  './js/minimap.js',
  './js/fx_text_data.js',
  './js/fx_text.js',
  './js/main.js',
  './js/installtip.js',
  './js/pwa.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME && k !== IMG_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req, { ignoreSearch: true }).then((hit) =>
          hit || fetch(req).catch(() => cache.match('./index.html'))
        )
      )
    );
    return;
  }
  if (RUNTIME_PATHS.some((p) => url.pathname.indexOf(p) >= 0)) {   // 圖片:cache-first,沒有才抓網路並存進執行期桶(只存成功的回應)
    event.respondWith(
      caches.open(IMG_CACHE).then((cache) =>
        cache.match(req).then((hit) => hit || fetch(req).then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        }))
      )
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req))
    )
  );
});
