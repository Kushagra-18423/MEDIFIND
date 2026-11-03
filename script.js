// ============================================
// 1. DUMMY DATA (sample data, not real)
// ============================================

// List of medicines. "salt" is the main ingredient.
// rx: true means a doctor's prescription is needed.
const medicines = [
  { id: "dolo650",   name: "Dolo 650",      salt: "Paracetamol",            use: "Fever, pain",            rx: false },
  { id: "crocin500", name: "Crocin 500",    salt: "Paracetamol",            use: "Fever, pain",            rx: false },
  { id: "calpol500", name: "Calpol 500",    salt: "Paracetamol",            use: "Fever, pain",            rx: false },
  { id: "okacet",    name: "Okacet 10 mg",  salt: "Cetirizine",             use: "Allergy, cold",          rx: false },
  { id: "cetzine",   name: "Cetzine 10 mg", salt: "Cetirizine",             use: "Allergy, cold",          rx: false },
  { id: "ors",       name: "ORS Sachet",    salt: "Oral rehydration salts", use: "Dehydration",            rx: false },
  { id: "uprise",    name: "Uprise D3",     salt: "Vitamin D3",             use: "Vitamin D deficiency",   rx: false },
  { id: "glycomet",  name: "Glycomet 500",  salt: "Metformin",              use: "Diabetes",               rx: true  },
  { id: "pantop40",  name: "Pantop 40",     salt: "Pantoprazole",           use: "Acidity",                rx: true  },
  { id: "azee500",   name: "Azee 500",      salt: "Azithromycin",           use: "Bacterial infections",   rx: true  }
];

// List of medical stores (all names and numbers are fake).
// stock: for each medicine -> inStock (true/false) and price in rupees.
const stores = [
  {
    id: "s1", name: "Sunrise Medicals", area: "Basavanagudi",
    address: "Bull Temple Road, Basavanagudi", phone: "9000000001",
    open: "08:00", close: "22:00", always: false,
    stock: {
      dolo650:   { inStock: true,  price: 30 },
      crocin500: { inStock: true,  price: 28 },
      okacet:    { inStock: true,  price: 22 },
      ors:       { inStock: false, price: 20 },
      uprise:    { inStock: true,  price: 150 },
      glycomet:  { inStock: true,  price: 35 }
    }
  },
  {
    id: "s2", name: "CityCare Pharmacy", area: "Basavanagudi",
    address: "Gandhi Bazaar Main Road, Basavanagudi", phone: "9000000002",
    open: "00:00", close: "23:59", always: true,
    stock: {
      dolo650:   { inStock: false, price: 31 },
      crocin500: { inStock: true,  price: 29 },
      calpol500: { inStock: true,  price: 27 },
      cetzine:   { inStock: true,  price: 24 },
      ors:       { inStock: true,  price: 21 },
      pantop40:  { inStock: true,  price: 110 },
      azee500:   { inStock: false, price: 120 }
    }
  },
  {
    id: "s3", name: "HealthPlus Pharmacy", area: "Jayanagar",
    address: "4th Block, Jayanagar", phone: "9000000003",
    open: "09:00", close: "21:00", always: false,
    stock: {
      dolo650:   { inStock: true,  price: 32 },
      calpol500: { inStock: false, price: 26 },
      okacet:    { inStock: false, price: 23 },
      cetzine:   { inStock: true,  price: 25 },
      glycomet:  { inStock: false, price: 36 },
      uprise:    { inStock: true,  price: 155 },
      pantop40:  { inStock: true,  price: 112 }
    }
  },
  {
    id: "s4", name: "Jayanagar Medico", area: "Jayanagar",
    address: "9th Block, Jayanagar", phone: "9000000004",
    open: "07:00", close: "23:00", always: false,
    stock: {
      crocin500: { inStock: true,  price: 30 },
      dolo650:   { inStock: true,  price: 30 },
      ors:       { inStock: true,  price: 20 },
      glycomet:  { inStock: true,  price: 34 },
      azee500:   { inStock: true,  price: 118 }
    }
  },
  {
    id: "s5", name: "CareWell Chemist", area: "Banashankari",
    address: "Banashankari 2nd Stage", phone: "9000000005",
    open: "08:00", close: "22:00", always: false,
    stock: {
      dolo650:   { inStock: true,  price: 31 },
      crocin500: { inStock: false, price: 29 },
      okacet:    { inStock: true,  price: 21 },
      cetzine:   { inStock: true,  price: 24 },
      ors:       { inStock: true,  price: 22 },
      uprise:    { inStock: false, price: 150 },
      pantop40:  { inStock: false, price: 110 }
    }
  },
  {
    id: "s6", name: "Lifeline Medicals", area: "Banashankari",
    address: "Kathriguppe Main Road, Banashankari", phone: "9000000006",
    open: "00:00", close: "23:59", always: true,
    stock: {
      dolo650:   { inStock: false, price: 30 },
      calpol500: { inStock: true,  price: 26 },
      glycomet:  { inStock: true,  price: 35 },
      pantop40:  { inStock: true,  price: 109 },
      azee500:   { inStock: true,  price: 119 },
      ors:       { inStock: false, price: 20 }
    }
  }
];

// ============================================
// 2. PAGE ELEMENTS
// ============================================
const form = document.getElementById("searchForm");
const queryInput = document.getElementById("query");
const areaSelect = document.getElementById("area");
const sortSelect = document.getElementById("sort");
const openBox = document.getElementById("openNow");
const summary = document.getElementById("summary");
const results = document.getElementById("results");
const resetBtn = document.getElementById("resetReports");

let hasSearched = false;

// ============================================
// 3. USER REPORTS (saved in the browser)
// ============================================
let reports = loadReports();

function loadReports() {
  try {
    return JSON.parse(localStorage.getItem("medifindReports")) || {};
  } catch (e) {
    return {};
  }
}

function saveReports() {
  try {
    localStorage.setItem("medifindReports", JSON.stringify(reports));
  } catch (e) {
    // If saving fails, the page still works.
  }
}

// ============================================
// 4. HELPER FUNCTIONS
// ============================================

// "08:30" -> 510 minutes
function toMinutes(time) {
  const parts = time.split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

// Is the store open at this moment?
function isOpenNow(store) {
  if (store.always) return true;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= toMinutes(store.open) && minutes < toMinutes(store.close);
}

// Get stock of one medicine in one store (uses a user report if there is one)
function getStock(store, medId) {
  const base = store.stock[medId];
  if (!base) return null;
  const report = reports[store.id + "_" + medId];
  return {
    inStock: report ? report.inStock : base.inStock,
    price: base.price,
    reportedAt: report ? report.time : null
  };
}

// If a medicine is out of stock, find another brand with the same salt
// that is in stock in the SAME store.
function findAlternative(store, med) {
  const others = medicines.filter(function (m) {
    return m.salt === med.salt && m.id !== med.id;
  });
  for (let i = 0; i < others.length; i++) {
    const s = getStock(store, others[i].id);
    if (s && s.inStock) {
      return { med: others[i], price: s.price };
    }
  }
  return null;
}

function timeText(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ============================================
// 5. SEARCH
// ============================================
function search() {
  hasSearched = true;

  const q = queryInput.value.trim().toLowerCase();
  const area = areaSelect.value;
  const onlyOpen = openBox.checked;
  const sortBy = sortSelect.value;

  // Step 1: find medicines that match the name, salt or use
  const matches = medicines.filter(function (m) {
    const text = (m.name + " " + m.salt + " " + m.use).toLowerCase();
    return text.includes(q);
  });

  // Step 2: collect store + medicine pairs
  const rows = [];
  stores.forEach(function (store) {
    if (area !== "all" && store.area !== area) return;
    if (onlyOpen && !isOpenNow(store)) return;

    matches.forEach(function (med) {
      const stock = getStock(store, med.id);
      if (stock) {
        rows.push({ store: store, med: med, stock: stock });
      }
    });
  });

  // Step 3: sort
  rows.sort(function (a, b) {
    if (sortBy === "stock" && a.stock.inStock !== b.stock.inStock) {
      return a.stock.inStock ? -1 : 1;   // in stock first
    }
    return a.stock.price - b.stock.price; // cheaper first
  });

  showResults(rows);
}

// ============================================
// 6. SHOW RESULTS ON THE PAGE
// ============================================
function showResults(rows) {
  if (rows.length === 0) {
    summary.textContent = "No store found. Try another name, salt or area.";
    results.innerHTML = "";
    return;
  }

  summary.textContent = rows.length + " result(s) found.";

  results.innerHTML = rows.map(function (r) {
    const store = r.store;
    const med = r.med;
    const stock = r.stock;

    const mapLink = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(store.name + " " + store.address);

    // Alternative block (only when out of stock)
    let altHtml = "";
    if (!stock.inStock) {
      const alt = findAlternative(store, med);
      if (alt) {
        altHtml = '<p class="alt">Same salt (' + med.salt + ') available here: <strong>' +
          alt.med.name + '</strong> for Rs ' + alt.price + '</p>';
      }
    }

    // Line shown when a user has reported stock
    let reportedHtml = "";
    if (stock.reportedAt) {
      reportedHtml = '<p class="reported">Updated by a user at ' + timeText(stock.reportedAt) + '</p>';
    }

    const key = store.id + "|" + med.id;

    return '<div class="card">' +
      '<div class="top">' +
        '<h3>' + store.name + '</h3>' +
        '<span class="badge ' + (isOpenNow(store) ? "open" : "closed") + '">' +
          (store.always ? "Open 24x7" : (isOpenNow(store) ? "Open now" : "Closed")) +
        '</span>' +
      '</div>' +
      '<p><strong>' + med.name + '</strong> <span class="salt">' + med.salt + '</span> ' +
        (med.rx ? '<span class="badge rx">Prescription required</span>' : '') + '</p>' +
      '<p><span class="badge ' + (stock.inStock ? "yes" : "no") + '">' +
        (stock.inStock ? "In stock" : "Out of stock") + '</span>' +
        '<strong class="price">Rs ' + stock.price + '</strong></p>' +
      altHtml +
      '<p class="addr">' + store.address + '</p>' +
      '<div class="actions">' +
        '<a href="tel:' + store.phone + '">Call</a>' +
        '<a href="' + mapLink + '" target="_blank" rel="noopener">Open map</a>' +
        '<button type="button" data-key="' + key + '" data-val="1">Report: in stock</button>' +
        '<button type="button" data-key="' + key + '" data-val="0">Report: out of stock</button>' +
      '</div>' +
      reportedHtml +
    '</div>';
  }).join("");
}

// ============================================
// 7. EVENTS (what happens when the user clicks)
// ============================================

// Search button / Enter key
form.addEventListener("submit", function (e) {
  e.preventDefault();
  search();
});

// Filters: search again when changed
[areaSelect, sortSelect, openBox].forEach(function (el) {
  el.addEventListener("change", function () {
    if (hasSearched) search();
  });
});

// Quick search chips
document.querySelectorAll(".chip").forEach(function (chip) {
  chip.addEventListener("click", function () {
    queryInput.value = chip.dataset.q;
    search();
  });
});

// "Report" buttons inside the result cards
results.addEventListener("click", function (e) {
  const btn = e.target.closest("button[data-key]");
  if (!btn) return;

  const parts = btn.dataset.key.split("|");
  reports[parts[0] + "_" + parts[1]] = {
    inStock: btn.dataset.val === "1",
    time: Date.now()
  };
  saveReports();
  search();
});

// Reset all user reports
resetBtn.addEventListener("click", function () {
  reports = {};
  saveReports();
  if (hasSearched) search();
});