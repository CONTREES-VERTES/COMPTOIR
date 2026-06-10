// ═══════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════

let APP = {
  connected: false,
  account: '', email: '', apikey: '',
  demoMode: false,
  products: [],
  categories: {},
  suppliers: {},
  filtered: [],
  page: 1,
  pageSize: 30,
};

// ── DEMO DATA (extrait réel boutique + données simulées) ──
function buildDemoData() {
  const cats = {
    1:'CAVE VIN', 2:'COSMETIQUES & MAISON', 3:'ALCOOL', 4:'POINCT DE TULLE',
    5:'BIERES', 6:'RANDO & CARTES IGN', 7:'CARTES AFFICHES STICKERS',
    8:'SOUVENIRS', 9:'EPICERIE SALEE', 10:'LIVRES', 11:'EPICERIE SUCREE',
    12:'TISANE & INFUSIONS', 13:'ENFANTS', 14:'BD', 15:'CONSERVE'
  };
  const suppls = {
    10:'Caves de Branceilles', 11:'Fabrique du Bois Vignaud', 12:'Distillerie Bellet',
    13:'Diffusion et Renouveau', 14:'Brasserie des Anges', 15:'Les Brasseurs De Vents',
    16:'CARTOTHEQUE', 17:'OTI TULLE EN CORREZE', 18:'France Regard',
    19:'LOU PE DE GRIL', 20:'Cidrerie Janty', 21:'Le Jardin du Centaure',
    22:'Exidia / Le Comptoir des Saveurs', 23:'GESTE EDITIONS', 24:'La Vache Noire (GAEC)',
  };
  APP.categories = cats; APP.suppliers = suppls;

  const raw = [
    {id:216, name:'Vin rouge Triadoux | 1001 Pierres', cat_id:1, sup_id:10, pa:5.63, pv:9.50, tax:20, stock:25, stock_min:6, dv:true, dep:30, com:30},
    {id:217, name:'Vin paillé | 1001 Pierres', cat_id:1, sup_id:10, pa:13.61, pv:22.00, tax:20, stock:19, stock_min:5, dv:true, dep:24, com:30},
    {id:218, name:'Vin rosé Quinçonne | 1001 Pierres', cat_id:1, sup_id:10, pa:4.02, pv:7.00, tax:20, stock:0, stock_min:4, dv:true, dep:12, com:30},
    {id:219, name:'Masque à l\'argile | Fabrique du Bois Vignaud', cat_id:2, sup_id:11, pa:4.90, pv:6.50, tax:0, stock:8, stock_min:3, dv:true, dep:15, com:30},
    {id:220, name:'Gentiane | Distillerie Bellet', cat_id:3, sup_id:12, pa:12.51, pv:23.00, tax:20, stock:0, stock_min:3, dv:true, dep:6, com:30},
    {id:221, name:'Guignolet | Distillerie Bellet', cat_id:3, sup_id:12, pa:14.10, pv:23.00, tax:20, stock:2, stock_min:3, dv:true, dep:8, com:30},
    {id:222, name:'La Tulloise 50cl | Distillerie Bellet', cat_id:3, sup_id:12, pa:19.38, pv:31.00, tax:20, stock:0, stock_min:2, dv:true, dep:5, com:30},
    {id:223, name:'La Tulloise 70cl | Distillerie Bellet', cat_id:3, sup_id:12, pa:22.95, pv:38.00, tax:20, stock:3, stock_min:2, dv:true, dep:6, com:30},
    {id:224, name:'Liqueur de châtaigne royale | Distillerie Bellet', cat_id:3, sup_id:12, pa:16.92, pv:28.00, tax:20, stock:1, stock_min:2, dv:true, dep:4, com:30},
    {id:225, name:'Liqueur de verveine verte | Distillerie Bellet', cat_id:3, sup_id:12, pa:22.76, pv:36.00, tax:20, stock:4, stock_min:3, dv:true, dep:7, com:30},
    {id:226, name:'Boucles d\'oreilles en poinct de Tulle', cat_id:4, sup_id:13, pa:18.00, pv:23.00, tax:0, stock:4, stock_min:2, dv:true, dep:10, com:30},
    {id:229, name:'Boutons de pissenlit acidulés | Lou Pé Dé Gril', cat_id:9, sup_id:19, pa:5.21, pv:7.50, tax:5.5, stock:0, stock_min:4, dv:true, dep:8, com:30},
    {id:230, name:'Bière Blancha au Blat Negre | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:23, stock_min:10, dv:false},
    {id:231, name:'Bière Brava Porter | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:22, stock_min:10, dv:false},
    {id:232, name:'Bière Cristofòra d\'Aubasina | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:10, stock_min:10, dv:false},
    {id:233, name:'Bière Framboisa Leugiera | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:6, stock_min:10, dv:false},
    {id:234, name:'Bière IPA Doça | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:12, stock_min:10, dv:false},
    {id:235, name:'Bière Occitana Dobla | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:0, stock_min:10, dv:false},
    {id:236, name:'Bière Pils de la Monedièra | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:14, stock_min:10, dv:false},
    {id:237, name:'Bière Una Sason en Corresa | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:15, stock_min:10, dv:false},
    {id:238, name:'Bière Schwarzbier dau Plateu | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:24, stock_min:10, dv:false},
    {id:239, name:'Bière Strong Fem\'Ale | Brasserie des Anges', cat_id:5, sup_id:14, pa:3.05, pv:5.50, tax:0, stock:13, stock_min:10, dv:false},
    {id:240, name:'Tripack Bières | Brasserie des Anges', cat_id:5, sup_id:14, pa:9.45, pv:16.50, tax:0, stock:29, stock_min:5, dv:false},
    {id:241, name:'Alizé 75cl | Les Brasseurs de Vents', cat_id:5, sup_id:15, pa:3.70, pv:7.00, tax:20, stock:13, stock_min:6, dv:false},
    {id:244, name:'Cadre 3 chats en poinct de Tulle', cat_id:4, sup_id:13, pa:50.00, pv:63.00, tax:0, stock:2, stock_min:1, dv:true, dep:4, com:30},
    {id:245, name:'Cadre chouette en poinct de Tulle', cat_id:4, sup_id:13, pa:65.00, pv:82.00, tax:0, stock:1, stock_min:1, dv:true, dep:3, com:30},
    {id:246, name:'Cadre dame au chapeau en poinct de Tulle', cat_id:4, sup_id:13, pa:120.00, pv:150.00, tax:0, stock:1, stock_min:1, dv:true, dep:2, com:30},
    {id:248, name:'Carte IGN Egletons Meymac Corrèze', cat_id:6, sup_id:16, pa:9.62, pv:14.10, tax:5.5, stock:1, stock_min:2, dv:false},
    {id:249, name:'Carte IGN Tulle Donzenac Gorges de la Vézère', cat_id:6, sup_id:16, pa:9.62, pv:14.10, tax:5.5, stock:2, stock_min:2, dv:false},
    {id:256, name:'Cartes postales', cat_id:7, sup_id:17, pa:0.19, pv:0.50, tax:20, stock:7445, stock_min:200, dv:false},
    {id:257, name:'Casse-noix cèpe', cat_id:8, sup_id:18, pa:5.20, pv:11.00, tax:20, stock:81, stock_min:10, dv:false},
    {id:258, name:'Sel aromatisé | Le Jardin du Centaure', cat_id:9, sup_id:21, pa:1.60, pv:3.50, tax:5.5, stock:0, stock_min:5, dv:false},
    {id:259, name:'Cèpes secs | Exidia', cat_id:9, sup_id:22, pa:11.00, pv:15.00, tax:5.5, stock:41, stock_min:8, dv:false},
    {id:261, name:'Cidre | Cidrerie Janty', cat_id:3, sup_id:20, pa:2.93, pv:5.00, tax:20, stock:9, stock_min:6, dv:false},
    {id:263, name:'Coffet nomade | Fabrique du Bois Vignaud', cat_id:2, sup_id:11, pa:16.80, pv:25.00, tax:0, stock:5, stock_min:2, dv:true, dep:8, com:30},
    {id:264, name:'Coffet jardinier | Fabrique du Bois Vignaud', cat_id:2, sup_id:11, pa:7.00, pv:12.00, tax:0, stock:3, stock_min:2, dv:true, dep:6, com:30},
    {id:493, name:'Dé en porcelaine | France Regard', cat_id:8, sup_id:18, pa:1.35, pv:5.00, tax:20, stock:53, stock_min:15, dv:false},
    {id:494, name:'Crayon de papier | France Regard', cat_id:8, sup_id:18, pa:0.45, pv:2.00, tax:20, stock:108, stock_min:20, dv:false},
    {id:495, name:'Cahier de coloriage Corrèze | France Regard', cat_id:13, sup_id:18, pa:3.85, pv:5.50, tax:5.5, stock:15, stock_min:5, dv:false},
    {id:497, name:'Mug Corrèze-Tulle | France Regard', cat_id:8, sup_id:18, pa:3.60, pv:7.50, tax:20, stock:23, stock_min:8, dv:false},
    {id:498, name:'Parapluie | France Regard', cat_id:8, sup_id:18, pa:4.00, pv:10.00, tax:20, stock:9, stock_min:5, dv:false},
    {id:499, name:'Pâté de campagne aux châtaignes | La Vache Noire', cat_id:9, sup_id:24, pa:5.67, pv:8.00, tax:5.5, stock:56, stock_min:10, dv:false},
    {id:506, name:'Le loup en Corrèze | Geste Editions', cat_id:10, sup_id:23, pa:7.04, pv:9.90, tax:5.5, stock:5, stock_min:3, dv:true, dep:8, com:30},
    {id:507, name:'Petite histoire du Limousin | Geste Editions', cat_id:10, sup_id:23, pa:7.04, pv:9.90, tax:5.5, stock:10, stock_min:3, dv:true, dep:14, com:30},
    {id:508, name:'Carte IGN Dordogne - Corrèze', cat_id:6, sup_id:16, pa:5.14, pv:6.95, tax:5.5, stock:0, stock_min:2, dv:false},
    {id:509, name:'Rando CORREZE - 16 balades | Geste Editions', cat_id:6, sup_id:23, pa:0, pv:8.90, tax:5.5, stock:20, stock_min:5, dv:true, dep:25, com:30},
    {id:510, name:'Corrèze 28 balades pour petits et grands | Glénat', cat_id:6, sup_id:16, pa:10.28, pv:13.90, tax:5.5, stock:10, stock_min:3, dv:true, dep:15, com:30},
    {id:511, name:'Cartes postales Gimel ancienne | OT TULLE', cat_id:7, sup_id:17, pa:0, pv:1.50, tax:20, stock:100, stock_min:20, dv:false},
  ];
  return raw.map(p => ({
    products_id: p.id,
    products_name: p.name,
    categories_id: p.cat_id,
    categories_name: cats[p.cat_id] || '',
    suppliers_id: p.sup_id,
    suppliers_name: suppls[p.sup_id] || '',
    products_price: p.pa,
    products_price_ttc: p.pv,
    stock_available: p.stock,
    stock_min: p.stock_min,
    is_dv: p.dv,
    statut: p.stock === 0 ? 'RUPTURE' : (p.stock <= p.stock_min ? 'ALERTE' : 'OK'),
    marge: p.pv > 0 ? Math.round((p.pv - p.pa) / p.pv * 100) : 0,
    valeur_stock: p.pa * p.stock,
    stock_depose: p.dv ? (p.dep || p.stock) : 0,
    commission_pct: p.dv ? (p.com || 30) : 0,
  }));
}

// ── HIBOUTIK API ──
async function fetchHiboutik(endpoint) {
  const base = `https://${APP.account}.hiboutik.com/api`;
  const headers = {
    'Authorization': 'Basic ' + btoa(`${APP.email}:${APP.apikey}`),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  const res = await fetch(base + endpoint, { method: 'GET', headers, mode: 'cors' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function loadHiboutikData() {
  setSyncStatus('loading', 'Chargement...');
  try {
    const [products, cats, sups] = await Promise.all([
      fetchHiboutik('/products/'),
      fetchHiboutik('/categories/'),
      fetchHiboutik('/suppliers/'),
    ]);


    APP.categories = {};
    cats.forEach(ct => { APP.categories[ct.category_id] = ct.category_name || ''; });
    APP.suppliers  = {};
    sups.forEach(s  => { APP.suppliers[s.supplier_id]   = s.supplier_name  || ''; });

    // Standard French VAT rates by Hiboutik vat_id
    const vatMap = { 0: 0, 1: 20, 2: 10, 3: 5.5, 4: 2.1, 5: 8.5 };
    // Try to fetch actual VAT config (may 404 on some accounts)
    try {
      const vatData = await fetchHiboutik('/vat/');
      if (Array.isArray(vatData)) vatData.forEach(v => { vatMap[v.vat_id||v.id] = parseFloat(v.vat_rate||v.rate||0); });
    } catch(e) { console.log('Using default French VAT rates'); }

    // Try multiple stock endpoints (Hiboutik uses warehouse-scoped stock)
    const stockMap = {}, alertMap = {};
    let stockRaw = [], stockEndpointUsed = '';

    // Try endpoints in order of likelihood
    const stockEndpoints = [
      '/stock_available/warehouse_id/1',
      '/stock_available/warehouse_id/0',
      '/stock_available/',
      '/stock/',
    ];
    for (const ep of stockEndpoints) {
      try {
        stockRaw = await fetchHiboutik(ep);
        if (Array.isArray(stockRaw) && stockRaw.length > 0) {
          stockEndpointUsed = ep;
                break;
        }
      } catch(e) { console.warn(`Stock endpoint ${ep} failed:`, e.message); }
    }

    stockRaw.forEach(s => {
      const id = s.product_id;
      const qty = parseInt(s.stock_available ?? 0);
      if (!isNaN(qty)) stockMap[id] = (stockMap[id] || 0) + qty;
      // inventory_alert is also in this endpoint
      if (s.inventory_alert !== undefined) alertMap[id] = parseInt(s.inventory_alert) || 0;
    });

    // inventory_alert already loaded from /stock_available/warehouse_id/1 above

    // Log for debugging
    if (products.length > 0) {
      APP._rawSample = products[0];
      APP._debug = { stockEndpointUsed, stockMapSize: Object.keys(stockMap).length, alertMapSize: Object.keys(alertMap).length, stockSample: Object.entries(stockMap).slice(0,5), vatSample: Object.entries(vatMap).slice(0,3) };
      }

    APP.products = products.map(p => {
      const id    = p.product_id;
      const name  = p.product_model || '';
      const catId = p.product_category;
      const supId = p.product_supplier;
      const vatId = p.product_vat || 0;
      const vatRate = vatMap[vatId] ?? 0;
      const pa    = parseFloat(p.product_supply_price) || 0;
      const pvHT  = parseFloat(p.product_price) || 0;
      const pv    = pvHT > 0 ? parseFloat((pvHT * (1 + vatRate / 100)).toFixed(2)) : 0;
      const stock = stockMap[id] ?? 0;
      const smin  = alertMap[id] ?? 0;
      const isDV  = p.product_brand === 4 || false; // ajustable selon config boutique
      return {
        products_id: id,
        products_name: name,
        categories_id: catId,
        categories_name: APP.categories[catId] || '',
        suppliers_id: supId,
        suppliers_name: APP.suppliers[supId] || '',
        products_price: pa,
        products_price_ttc: pv || pvHT,
        stock_available: stock,
        stock_min: smin,
        is_dv: isDV,
        statut: stock === 0 ? 'RUPTURE' : (stock <= smin ? 'ALERTE' : 'OK'),
        marge: pv > 0 && pa > 0 ? Math.round((pv - pa) / pv * 100) : 0,
        valeur_stock: pa * stock,
        _raw: p,
      };
    });

    setSyncStatus('ok', 'Hiboutik connecté');
  } catch(e) {
    setSyncStatus('error', 'Erreur API');
    throw e;
  }
}

// ═══════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════

function setSyncStatus(state, label) {
  const dot = document.getElementById('sync-dot');
  const lbl = document.getElementById('sync-label');
  dot.className = 'sync-dot ' + state;
  lbl.textContent = label;
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.screen === name);
  });
  if (name === 'catalogue') renderCatalogue();
  if (name === 'alertes')   renderAlertes();
  if (name === 'commandes') renderCommandes();
  if (name === 'stats')     renderStats();
  if (name === 'inventaire') renderInventaire();
  if (name === 'cmdprod') initCmdScreen();
  if (name === 'arretstocks') initArretDV();
}

function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function fmtEur(v) { return isNaN(v) ? '-' : v.toLocaleString('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' €'; }
function fmtPct(v) { return v + ' %'; }

function stockBadge(s) {
  if (s === 'RUPTURE') return `<span class="badge badge-red">Rupture</span>`;
  if (s === 'ALERTE')  return `<span class="badge badge-orange">Alerte</span>`;
  return `<span class="badge badge-green">OK</span>`;
}
function stockBar(stock, mini, maxi) {
  const max = Math.max(maxi || mini * 5, stock, 1);
  const pct = Math.min(100, Math.round(stock / max * 100));
  const color = stock === 0 ? 'var(--red)' : (stock <= mini ? 'var(--ora)' : 'var(--grn)');
  return `<div class="stock-bar-wrap">
    <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    <span class="stock-num" style="color:${color}">${stock}</span>
  </div>`;
}

// ═══════════════════════════════════════════════════════════
// CONNEXION
// ═══════════════════════════════════════════════════════════

async function connectHiboutik() {
  const btn = document.getElementById('btn-connect');
  const err = document.getElementById('connect-error');
  err.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Connexion...';

  APP.account = document.getElementById('inp-account').value.trim();
  APP.email   = document.getElementById('inp-email').value.trim();
  APP.apikey  = document.getElementById('inp-apikey').value.trim();

  // Mode démo si champs vides
  if (!APP.account && !APP.email && !APP.apikey) {
    APP.demoMode = true;
    APP.products = buildDemoData();
    APP.connected = true;
    afterConnect();
    btn.disabled = false; btn.textContent = 'Connexion';
    return;
  }

  try {
    await loadHiboutikData();
    APP.connected = true;
    afterConnect();
  } catch(e) {
    btn.disabled = false; btn.textContent = 'Connexion';
    // Detect CORS vs other errors
    const isCors = e.message && (e.message.includes('fetch') || e.message.includes('Failed') || e.message.includes('NetworkError') || e.message.includes('CORS'));
    if (isCors || e instanceof TypeError) {
      err.style.display = 'block';
      err.innerHTML = `
        <strong>Erreur CORS - connexion bloquée par le navigateur</strong><br><br>
        GitHub Pages ne peut pas appeler l'API Hiboutik directement pour des raisons de sécurité.<br><br>
        <strong>Solutions :</strong><br>
        1. <strong>Extension Chrome "CORS Unblock"</strong> : installez-la, activez-la, rechargez la page.<br>
        2. <strong>Mode démonstration</strong> : effacez les champs et cliquez Connexion pour tester l'app avec les données exemples.<br><br>
        <a href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino" target="_blank" style="color:var(--red);font-weight:bold">→ Installer CORS Unblock pour Chrome</a>
      `;
    } else {
      err.style.display = 'block';
      err.textContent = 'Impossible de se connecter à Hiboutik. Vérifiez votre compte, email et clé API. (' + (e.message||'erreur inconnue') + ')';
    }
    return;
  }
  btn.disabled = false; btn.textContent = 'Connexion';
}

function afterConnect() {
  document.getElementById('screen-connexion').classList.remove('active');
  document.getElementById('sidebar').style.display = 'flex';
  document.getElementById('btn-refresh').style.display = '';
  setSyncStatus('ok', APP.demoMode ? 'Mode démonstration' : `${APP.account}.hiboutik.com`);

  populateFilters();
  renderDashboard();
  showScreen('dashboard');
}

function deconnect() {
  APP = { connected:false, account:'', email:'', apikey:'', demoMode:false, products:[], categories:{}, suppliers:{}, filtered:[], page:1, pageSize:30 };
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('btn-refresh').style.display = 'none';
  setSyncStatus('', 'Non connecté');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-connexion').classList.add('active');
  document.getElementById('inp-account').value = '';
  document.getElementById('inp-email').value = '';
  document.getElementById('inp-apikey').value = '';
}

async function refreshData() {
  if (APP.demoMode) { renderDashboard(); return; }
  try {
    await loadHiboutikData();
    renderDashboard();
    if (document.getElementById('screen-catalogue').classList.contains('active')) renderCatalogue();
  } catch(e) { alert('Erreur lors de l\'actualisation.'); }
}

function populateFilters() {
  const cats = [...new Set(APP.products.map(p => p.categories_name).filter(Boolean))].sort();
  ['cat-filter-cat', 'inv-filter-cat'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '<option value="">Toutes catégories</option>';
    cats.forEach(c => sel.innerHTML += `<option value="${c}">${c}</option>`);
  });
}

// ═══════════════════════════════════════════════════════════
// DEBUG
// ═══════════════════════════════════════════════════════════

function showRawDebug() {
  const panel = document.getElementById('debug-panel');
  if (panel.style.display !== 'none') { panel.style.display = 'none'; return; }
  const withStock = APP.products.filter(p => p.stock_available > 0).length;
  const withAlert = APP.products.filter(p => p.stock_min > 0).length;
  const p0 = APP.products.find(p => p.stock_available > 0) || APP.products[0];
  panel.style.display = 'block';
  panel.textContent =
    `Articles chargés : ${APP.products.length}\n` +
    `Avec stock > 0   : ${withStock}\n` +
    `Avec seuil mini  : ${withAlert}\n` +
    `Endpoint stock   : ${APP._debug?.stockEndpointUsed || 'n/a'}\n\n` +
    '=== EXEMPLE PRODUIT ===\n' +
    JSON.stringify(p0 ? {...p0, _raw: undefined} : 'aucun', null, 2);
}

// ═══════════════════════════════════════════════════════════
// DEBUG
// ═══════════════════════════════════════════════════════════

function showRawDebug() {
  const panel = document.getElementById("debug-panel");
  if (panel.style.display !== "none") { panel.style.display = "none"; return; }
  const sample = APP._rawSample || (APP.products[0] && APP.products[0]._raw) || APP.products[0] || "Aucune donnee";
  panel.style.display = "block";
  panel.textContent = "=== PREMIER PRODUIT BRUT API ===\n" + JSON.stringify(sample, null, 2) + "\n\n=== PRODUIT MAPPE ===\n" + JSON.stringify({...APP.products[0], _raw: undefined}, null, 2);
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════

function renderDashboard() {
  const prods = APP.products;
  const ruptures = prods.filter(p => p.statut === 'RUPTURE');
  const alertes  = prods.filter(p => p.statut === 'ALERTE');
  const dv       = prods.filter(p => p.is_dv);
  const valeur   = prods.reduce((s,p) => s + p.valeur_stock, 0);

  document.getElementById('kpi-total').textContent    = prods.length;
  document.getElementById('kpi-ruptures').textContent = ruptures.length;
  document.getElementById('kpi-alertes').textContent  = alertes.length;
  document.getElementById('kpi-valeur').textContent   = fmtEur(valeur);
  document.getElementById('kpi-dv').textContent       = dv.length;

  const now = new Date();
  document.getElementById('dash-date').textContent = `Données au ${now.toLocaleDateString('fr-FR')} - ${now.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}`;

  // Badge alertes
  const total = ruptures.length + alertes.length;
  const badge = document.getElementById('badge-alertes');
  if (total > 0) { badge.textContent = total; badge.style.display = ''; }
  else { badge.style.display = 'none'; }

  // Banner
  const banner = document.getElementById('dash-alerte-banner');
  if (ruptures.length > 0) {
    banner.style.display = '';
    banner.innerHTML = `<div class="alert-banner red">🔴 <strong>${ruptures.length} article(s) en rupture de stock</strong> — commander immédiatement auprès des fournisseurs concernés.</div>`;
    if (alertes.length > 0) {
      banner.innerHTML += `<div class="alert-banner">🟠 <strong>${alertes.length} article(s) sous le seuil minimum</strong> — réapprovisionner prochainement.</div>`;
    }
  } else if (alertes.length > 0) {
    banner.style.display = '';
    banner.innerHTML = `<div class="alert-banner">🟠 <strong>${alertes.length} article(s) sous le seuil minimum</strong> — réapprovisionner prochainement.</div>`;
  } else {
    banner.style.display = 'none';
  }

  // Top alertes table
  const top = [...ruptures, ...alertes].slice(0, 10);
  const tbody = document.getElementById('dash-alerte-tbody');
  if (top.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty"><div class="empty-icon">✅</div><div class="empty-text">Aucune alerte</div><div class="empty-sub">Tous les stocks sont au-dessus du seuil minimum.</div></div></td></tr>`;
  } else {
    tbody.innerHTML = top.map(p => `<tr>
      <td>${stockBadge(p.statut)}</td>
      <td class="mono">${p.products_id}</td>
      <td class="bold">${p.products_name}</td>
      <td><span class="badge badge-blue">${p.categories_name}</span></td>
      <td>${p.suppliers_name || '-'}</td>
      <td class="text-right">${stockBar(p.stock_available, p.stock_min)}</td>
      <td class="text-right">${p.stock_min}</td>
    </tr>`).join('');
  }
}

// ═══════════════════════════════════════════════════════════
// CATALOGUE
// ═══════════════════════════════════════════════════════════

function filterCatalogue() {
  APP.page = 1;
  const q    = document.getElementById('cat-search').value.toLowerCase();
  const cat  = document.getElementById('cat-filter-cat').value;
  const stat = document.getElementById('cat-filter-statut').value;

  APP.filtered = APP.products.filter(p => {
    const matchQ    = !q || p.products_name.toLowerCase().includes(q) || String(p.products_id).includes(q) || (p.suppliers_name||'').toLowerCase().includes(q);
    const matchCat  = !cat  || p.categories_name === cat;
    const matchStat = !stat || (stat === 'DV' ? p.is_dv : p.statut === stat);
    return matchQ && matchCat && matchStat;
  });
  renderCatalogueTable();
}

function renderCatalogue() {
  APP.filtered = [...APP.products];
  renderCatalogueTable();
}

function renderCatalogueTable() {
  const total = APP.filtered.length;
  const pages = Math.ceil(total / APP.pageSize);
  APP.page = Math.min(APP.page, pages || 1);
  const start = (APP.page - 1) * APP.pageSize;
  const items = APP.filtered.slice(start, start + APP.pageSize);

  document.getElementById('cat-count').textContent = `${total} article(s)`;

  const tbody = document.getElementById('cat-tbody');
  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty"><div class="empty-icon">📦</div><div class="empty-text">Aucun article trouvé</div></div></td></tr>`;
  } else {
    tbody.innerHTML = items.map(p => {
      const dvTag = p.is_dv ? `<span class="tag">DV</span>` : '';
      const margeColor = p.marge < 20 ? 'var(--ora)' : (p.marge > 50 ? 'var(--grn)' : 'var(--txt)');
      return `<tr onclick="showProduit(${p.products_id})" style="cursor:pointer">
        <td class="mono">${p.products_id}</td>
        <td class="bold">${p.products_name}${dvTag}</td>
        <td><span class="badge badge-blue">${p.categories_name||'-'}</span></td>
        <td style="color:var(--txt2);font-size:11px">${p.suppliers_name||'-'}</td>
        <td class="text-right">${p.products_price > 0 ? fmtEur(p.products_price) : '-'}</td>
        <td class="text-right bold">${fmtEur(p.products_price_ttc)}</td>
        <td class="text-right" style="color:${margeColor}">${p.marge > 0 ? fmtPct(p.marge) : '-'}</td>
        <td>${stockBar(p.stock_available, p.stock_min)}</td>
        <td>${stockBadge(p.statut)}</td>
      </tr>`;
    }).join('');
  }

  // Pagination
  const pagDiv = document.getElementById('cat-pagination');
  if (pages <= 1) { pagDiv.innerHTML = `<span>${total} article(s)</span><span></span>`; return; }
  let btns = '';
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - APP.page) <= 2) {
      btns += `<button class="page-btn ${i===APP.page?'active':''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - APP.page) === 3) {
      btns += `<button class="page-btn" disabled>…</button>`;
    }
  }
  pagDiv.innerHTML = `<span>Page ${APP.page}/${pages} — ${total} article(s)</span><div class="page-btns">${btns}</div>`;
}

function goPage(p) { APP.page = p; renderCatalogueTable(); }

function showProduit(id) {
  const p = APP.products.find(x => x.products_id === id);
  if (!p) return;
  document.getElementById('modal-prod-titre').textContent = p.products_name;
  document.getElementById('modal-prod-info').innerHTML = `
    <strong>Référence :</strong> ${p.products_id}<br>
    <strong>Catégorie :</strong> ${p.categories_name}<br>
    <strong>Fournisseur :</strong> ${p.suppliers_name||'Non renseigné'}<br>
    <strong>Prix d'achat HT :</strong> ${p.products_price > 0 ? fmtEur(p.products_price) : 'Non renseigné'}<br>
    <strong>Prix de vente TTC :</strong> ${fmtEur(p.products_price_ttc)}<br>
    <strong>Marge :</strong> ${p.marge > 0 ? fmtPct(p.marge) : '-'}<br>
    <strong>Stock actuel :</strong> ${p.stock_available} unité(s)<br>
    <strong>Seuil minimum :</strong> ${p.stock_min} unité(s)<br>
    <strong>Valeur stock :</strong> ${fmtEur(p.valeur_stock)}<br>
    <strong>Type :</strong> ${p.is_dv ? '🤝 Dépôt-vente' : '🏪 Achat direct'}<br>
    <strong>Statut :</strong> ${stockBadge(p.statut)}
  `;
  document.getElementById('modal-produit').classList.add('show');
}

// ═══════════════════════════════════════════════════════════
// ALERTES
// ═══════════════════════════════════════════════════════════

function renderAlertes() { filterAlertes(); }

function filterAlertes() {
  const type = document.getElementById('alerte-filter').value;
  let items = APP.products.filter(p => p.statut === 'RUPTURE' || p.statut === 'ALERTE');
  if (type) items = items.filter(p => p.statut === type);
  items.sort((a,b) => (a.statut==='RUPTURE'?0:1) - (b.statut==='RUPTURE'?0:1) || a.stock_available - b.stock_available);

  const ruptures = items.filter(p => p.statut === 'RUPTURE').length;
  const alertes  = items.filter(p => p.statut === 'ALERTE').length;
  document.getElementById('alertes-count').textContent = `${items.length} article(s) concerné(s)`;

  const banners = document.getElementById('alertes-banners');
  banners.innerHTML = '';
  if (ruptures) banners.innerHTML += `<div class="alert-banner red">🔴 ${ruptures} rupture(s) — stock nul</div>`;
  if (alertes)  banners.innerHTML += `<div class="alert-banner">🟠 ${alertes} article(s) sous le seuil minimum</div>`;

  const tbody = document.getElementById('alertes-tbody');
  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty"><div class="empty-icon">✅</div><div class="empty-text">Aucune alerte</div></div></td></tr>`;
  } else {
    tbody.innerHTML = items.map(p => {
      const aCommander = Math.max(0, (p.stock_min * 3) - p.stock_available);
      const valEst = p.products_price * aCommander;
      return `<tr>
        <td>${stockBadge(p.statut)}</td>
        <td class="mono">${p.products_id}</td>
        <td class="bold">${p.products_name}</td>
        <td><span class="badge badge-blue">${p.categories_name||'-'}</span></td>
        <td>${p.suppliers_name||'-'}</td>
        <td class="text-right" style="color:${p.stock_available===0?'var(--red)':'var(--ora)'}"><strong>${p.stock_available}</strong></td>
        <td class="text-right">${p.stock_min}</td>
        <td class="text-right text-tc bold">${aCommander}</td>
        <td class="text-right">${p.products_price > 0 ? fmtEur(valEst) : '-'}</td>
      </tr>`;
    }).join('');
  }
}

// ═══════════════════════════════════════════════════════════
// COMMANDES / RÉASSORT
// ═══════════════════════════════════════════════════════════

function renderCommandes() {
  const items = APP.products
    .filter(p => p.statut === 'RUPTURE' || p.statut === 'ALERTE')
    .map(p => ({
      ...p,
      aCommander: Math.max(0, (p.stock_min * 3) - p.stock_available),
    }))
    .filter(p => p.aCommander > 0);

  const totalVal = items.reduce((s,p) => s + (p.products_price * p.aCommander), 0);
  document.getElementById('bc-nb').textContent     = items.length;
  document.getElementById('bc-valeur').textContent = fmtEur(totalVal);

  // Group by supplier
  const bySupplier = {};
  items.forEach(p => {
    const key = p.suppliers_name || 'Fournisseur non renseigné';
    if (!bySupplier[key]) bySupplier[key] = [];
    bySupplier[key].push(p);
  });

  const content = document.getElementById('commandes-content');
  if (items.length === 0) {
    content.innerHTML = `<div class="empty" style="background:var(--wht);border-radius:10px;box-shadow:var(--shadow)"><div class="empty-icon">✅</div><div class="empty-text">Aucun réassort nécessaire</div><div class="empty-sub">Tous les stocks sont au-dessus du seuil minimum.</div></div>`;
    return;
  }

  content.innerHTML = Object.entries(bySupplier).map(([supplier, prods]) => {
    const supVal = prods.reduce((s,p) => s + (p.products_price * p.aCommander), 0);
    const rows = prods.map(p => `
      <tr>
        <td>${stockBadge(p.statut)}</td>
        <td class="mono">${p.products_id}</td>
        <td class="bold">${p.products_name}</td>
        <td><span class="badge badge-blue">${p.categories_name||'-'}</span></td>
        <td class="text-right">${p.stock_available}</td>
        <td class="text-right">${p.stock_min}</td>
        <td class="text-right text-tc bold">${p.aCommander}</td>
        <td class="text-right">${p.products_price > 0 ? fmtEur(p.products_price) : '-'}</td>
        <td class="text-right bold">${p.products_price > 0 ? fmtEur(p.products_price * p.aCommander) : '-'}</td>
      </tr>
    `).join('');
    return `<div class="table-card" style="margin-bottom:16px">
      <div class="table-header" style="background:var(--bg1)">
        <div>
          <div class="table-header-title">🏭 ${supplier}</div>
          <div style="font-size:11px;color:var(--txt2);margin-top:2px">${prods.length} article(s) — total estimé : ${fmtEur(supVal)}</div>
        </div>
        <button class="btn-sm btn-out" onclick="printBC('${supplier.replace(/'/g,"\\'")}')">🖨 Bon de commande</button>
      </div>
      <table>
        <thead><tr>
          <th>Statut</th><th>Réf.</th><th>Article</th><th>Catégorie</th>
          <th class="text-right">Stock</th><th class="text-right">Mini</th>
          <th class="text-right">À commander</th><th class="text-right">PA HT</th><th class="text-right">Total HT</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }).join('');
}

function printBC(supplier) {
  const items = APP.products
    .filter(p => (p.statut==='RUPTURE'||p.statut==='ALERTE') && (p.suppliers_name||'Fournisseur non renseigné')===supplier)
    .map(p => ({ ...p, aCommander: Math.max(0, (p.stock_min*3) - p.stock_available) }))
    .filter(p => p.aCommander > 0);

  const today = new Date().toLocaleDateString('fr-FR');
  const rows = items.map(p => `<tr>
    <td>${p.products_id}</td>
    <td>${p.products_name}</td>
    <td style="text-align:right">${p.aCommander}</td>
    <td style="text-align:right">${p.products_price > 0 ? fmtEur(p.products_price) : '-'}</td>
    <td style="text-align:right">${p.products_price > 0 ? fmtEur(p.products_price * p.aCommander) : '-'}</td>
  </tr>`).join('');
  const total = items.reduce((s,p) => s + p.products_price * p.aCommander, 0);

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bon de commande - ${supplier}</title>
  <style>
    body{font-family:Helvetica,Arial,sans-serif;font-size:12px;margin:40px;color:#2a2a2a}
    h1{font-size:18px;color:#575756;margin-bottom:4px}
    .sub{color:#888;font-size:11px;margin-bottom:24px}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
    .info-box{background:#f8f7f2;padding:12px;border-radius:6px}
    .info-label{font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#888;margin-bottom:4px}
    .info-value{font-size:13px;font-weight:bold}
    table{width:100%;border-collapse:collapse;margin-top:8px}
    th{text-align:left;padding:8px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;background:#575756;color:#fff}
    td{padding:8px 10px;border-bottom:1px solid #eee}
    .total-row td{font-weight:bold;background:#fff8f0;border-top:2px solid #D88050}
    .text-right{text-align:right}
    .footer{margin-top:32px;font-size:10px;color:#aaa;border-top:1px solid #eee;padding-top:12px}
  </style></head><body>
  <h1>Bon de commande</h1>
  <div class="sub">Boutique Contrées Vertes - Office de Tourisme Tulle Agglo</div>
  <div class="info-grid">
    <div class="info-box"><div class="info-label">Fournisseur</div><div class="info-value">${supplier}</div></div>
    <div class="info-box"><div class="info-label">Date de commande</div><div class="info-value">${today}</div></div>
    <div class="info-box"><div class="info-label">Statut</div><div class="info-value">En attente d'envoi</div></div>
    <div class="info-box"><div class="info-label">Articles commandés</div><div class="info-value">${items.length} références</div></div>
  </div>
  <table>
    <thead><tr><th>Réf.</th><th>Désignation</th><th class="text-right">Qté</th><th class="text-right">PA HT</th><th class="text-right">Total HT</th></tr></thead>
    <tbody>${rows}
    <tr class="total-row"><td colspan="4">TOTAL ESTIMÉ HT</td><td class="text-right">${fmtEur(total)}</td></tr>
    </tbody>
  </table>
  <div class="footer">Bon de commande généré le ${today} - Contrées Vertes / Boutique Office de Tourisme Tulle Agglo<br>
  Généré depuis l'application de gestion des stocks connectée à Hiboutik.</div>
  <script>window.onload=()=>{window.print()}<\/script>
  </body></html>`);
  win.document.close();
}

// ═══════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════

function renderStats() {
  const cats = {};
  APP.products.forEach(p => {
    const c = p.categories_name || 'Non classé';
    if (!cats[c]) cats[c] = { nb:0, stock:0, valeurAchat:0, valeurVente:0 };
    cats[c].nb++;
    cats[c].stock += p.stock_available;
    cats[c].valeurAchat  += p.valeur_stock;
    cats[c].valeurVente  += p.products_price_ttc * p.stock_available;
  });

  const sups = {};
  APP.products.forEach(p => {
    const s = p.suppliers_name || 'Non renseigné';
    if (!sups[s]) sups[s] = { nb:0, valeur:0 };
    sups[s].nb++;
    sups[s].valeur += p.valeur_stock;
  });

  const catArr = Object.entries(cats).sort((a,b) => b[1].valeurAchat - a[1].valeurAchat);
  const supArr = Object.entries(sups).sort((a,b) => b[1].valeur - a[1].valeur).slice(0, 10);
  const maxCatVal = Math.max(...catArr.map(([,v]) => v.valeurAchat), 1);
  const maxSupVal = Math.max(...supArr.map(([,v]) => v.valeur), 1);

  const catRows = catArr.map(([name, d]) => `<div class="stat-row">
    <div>
      <div class="stat-row-label">${name}</div>
      <div class="cat-bar-wrap" style="margin-top:4px">
        <div class="cat-bar" style="width:${Math.round(d.valeurAchat/maxCatVal*120)}px"></div>
        <span style="font-size:10px;color:var(--txt2)">${d.nb} art. / ${d.stock} unités</span>
      </div>
    </div>
    <div class="text-right">
      <div class="stat-row-val">${fmtEur(d.valeurAchat)}</div>
      <div style="font-size:10px;color:var(--txt2)">achat HT</div>
    </div>
  </div>`).join('');

  const supRows = supArr.map(([name, d]) => `<div class="stat-row">
    <div>
      <div class="stat-row-label">${name}</div>
      <div class="cat-bar-wrap" style="margin-top:4px">
        <div class="cat-bar" style="width:${Math.round(d.valeur/maxSupVal*120)}px;background:var(--vf)"></div>
        <span style="font-size:10px;color:var(--txt2)">${d.nb} référence(s)</span>
      </div>
    </div>
    <div class="stat-row-val">${fmtEur(d.valeur)}</div>
  </div>`).join('');

  const totalVal  = APP.products.reduce((s,p) => s+p.valeur_stock, 0);
  const totalVente = APP.products.reduce((s,p) => s+p.products_price_ttc*p.stock_available, 0);
  const ruptures  = APP.products.filter(p => p.statut==='RUPTURE').length;
  const alertes   = APP.products.filter(p => p.statut==='ALERTE').length;
  const dormants  = APP.products.filter(p => p.stock_available > 50).length;

  document.getElementById('stats-content').innerHTML = `
    <div class="stat-card" style="grid-column:1/-1">
      <div class="stat-card-title">Synthèse globale du stock</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);padding:16px;gap:16px">
        <div style="text-align:center"><div style="font-size:22px;font-weight:bold;color:var(--vf)">${fmtEur(totalVal)}</div><div style="font-size:11px;color:var(--txt2)">Valeur stock achat HT</div></div>
        <div style="text-align:center"><div style="font-size:22px;font-weight:bold;color:var(--tc)">${fmtEur(totalVente)}</div><div style="font-size:11px;color:var(--txt2)">Valeur stock vente TTC</div></div>
        <div style="text-align:center"><div style="font-size:22px;font-weight:bold;color:var(--red)">${ruptures}</div><div style="font-size:11px;color:var(--txt2)">Ruptures</div></div>
        <div style="text-align:center"><div style="font-size:22px;font-weight:bold;color:var(--ora)">${alertes}</div><div style="font-size:11px;color:var(--txt2)">Alertes</div></div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card-title">Valeur du stock par catégorie</div>
      <div class="stat-list">${catRows}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-title">Top 10 fournisseurs (valeur stock)</div>
      <div class="stat-list">${supRows}</div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// INVENTAIRE
// ═══════════════════════════════════════════════════════════

function filterInventaire() { renderInventaireTable(); }

function renderInventaire() { renderInventaireTable(); }

function renderInventaireTable() {
  const cat = document.getElementById('inv-filter-cat').value;
  let items = cat ? APP.products.filter(p => p.categories_name === cat) : APP.products;
  items = [...items].sort((a,b) => (a.categories_name||'').localeCompare(b.categories_name||'') || (a.products_name||'').localeCompare(b.products_name||''));

  const tbody = document.getElementById('inv-tbody');
  tbody.innerHTML = items.map(p => `<tr>
    <td class="mono">${p.products_id}</td>
    <td class="bold">${p.products_name}</td>
    <td><span class="badge badge-blue">${p.categories_name||'-'}</span></td>
    <td style="font-size:11px;color:var(--txt2)">${p.suppliers_name||'-'}</td>
    <td class="text-right">${p.products_price > 0 ? fmtEur(p.products_price) : '-'}</td>
    <td class="text-right">${fmtEur(p.products_price_ttc)}</td>
    <td class="text-right bold">${p.stock_available}</td>
    <td class="text-right"><input type="number" min="0" value="${p.stock_available}" style="width:64px;padding:3px 6px;border:1.5px solid var(--border);border-radius:5px;font-family:inherit;font-size:12px;text-align:right" data-id="${p.products_id}" onchange="markEcart(this)"></td>
    <td id="ecart-${p.products_id}">-</td>
  </tr>`).join('');
}

function markEcart(input) {
  const id   = parseInt(input.dataset.id);
  const prod = APP.products.find(p => p.products_id === id);
  const reel = parseInt(input.value) || 0;
  const ecart = reel - prod.stock_available;
  const cell = document.getElementById('ecart-' + id);
  if (ecart === 0) { cell.innerHTML = '<span class="badge badge-gray">0</span>'; }
  else if (ecart > 0) { cell.innerHTML = `<span class="badge badge-green">+${ecart}</span>`; }
  else { cell.innerHTML = `<span class="badge badge-red">${ecart}</span>`; }
}

function printInventaire() {
  const cat = document.getElementById('inv-filter-cat').value;
  let items = cat ? APP.products.filter(p => p.categories_name === cat) : APP.products;
  items = [...items].sort((a,b) => (a.categories_name||'').localeCompare(b.categories_name||''));
  const today = new Date().toLocaleDateString('fr-FR');
  const rows = items.map(p => `<tr>
    <td>${p.products_id}</td><td>${p.products_name}</td>
    <td>${p.categories_name||'-'}</td><td>${p.suppliers_name||'-'}</td>
    <td style="text-align:right">${p.stock_available}</td>
    <td style="text-align:right;min-width:60px">&nbsp;</td>
    <td style="text-align:right;min-width:60px">&nbsp;</td>
  </tr>`).join('');
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Inventaire ${today}</title>
  <style>body{font-family:Helvetica,Arial,sans-serif;font-size:11px;margin:30px}h1{font-size:16px}table{width:100%;border-collapse:collapse}th{text-align:left;padding:6px 8px;background:#575756;color:#fff;font-size:10px;text-transform:uppercase}td{padding:6px 8px;border-bottom:1px solid #eee}.text-right{text-align:right}</style>
  </head><body>
  <h1>Feuille d'inventaire - Boutique Contrées Vertes</h1>
  <p style="color:#888;font-size:10px">Date : ${today} | ${cat||'Toutes catégories'} | Réalisé par : ________________</p>
  <table><thead><tr><th>Réf.</th><th>Article</th><th>Catégorie</th><th>Fournisseur</th><th class="text-right">Stock théorique</th><th class="text-right">Stock réel</th><th class="text-right">Écart</th></tr></thead>
  <tbody>${rows}</tbody></table>
  <script>window.onload=()=>window.print()<\/script></body></html>`);
  win.document.close();
}

function exportInventaireCSV() {
  const cat = document.getElementById('inv-filter-cat').value;
  let items = cat ? APP.products.filter(p => p.categories_name === cat) : APP.products;
  const bom = '\uFEFF';
  const header = 'Référence;Désignation;Catégorie;Fournisseur;Prix achat HT;Prix vente TTC;Stock théorique;Stock réel;Écart\n';
  const rows = items.map(p => `${p.products_id};${p.products_name};${p.categories_name||''};${p.suppliers_name||''};${p.products_price.toFixed(2).replace('.',',')};${p.products_price_ttc.toFixed(2).replace('.',',')};${p.stock_available};;`).join('\n');
  const blob = new Blob([bom + header + rows], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `inventaire_contrееs_vertes_${new Date().toLocaleDateString('fr-FR').replace(/\//g,'-')}.csv`;
  a.click();
}