/* =========================================================
   NOGAL — café de barrio (plan Inicial)
   Para cambiar la carta, los combos o los horarios, editá
   las listas CARTA, COMBOS y HORARIOS de acá abajo.
   ========================================================= */
(function () {
  var WA = "59897226657";
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var U = function (id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 900) + "&q=80"; };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function wa(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function ph(src, label, eager) { return '<figure class="ph"><span>' + esc(label) + '</span><img src="' + src + '" alt="' + esc(label) + '"' + (eager ? "" : ' loading="lazy"') + ' onerror="this.remove()"></figure>'; }
  function pesos(n) { return "$ " + n.toLocaleString("es-UY"); }

  /* ---------- horarios: 0 = domingo … 6 = sábado. Vacío = cerrado ---------- */
  var HORARIOS = ["09:00-19:00", "", "08:00-20:00", "08:00-20:00", "08:00-20:00", "08:00-20:00", "09:00-20:00"];
  var DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function toMin(s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; }
  function estado() {
    var d = new Date(), hoy = HORARIOS[d.getDay()], m = d.getHours() * 60 + d.getMinutes();
    if (hoy) {
      var r = hoy.split("-");
      if (m >= toMin(r[0]) && m < toMin(r[1])) return { open: true, label: "Abierto · hasta las " + r[1] };
      if (m < toMin(r[0])) return { open: false, label: "Abre hoy a las " + r[0] };
    }
    for (var i = 1; i <= 7; i++) {
      var n = (d.getDay() + i) % 7;
      if (HORARIOS[n]) return { open: false, label: "Cerrado · abre " + (i === 1 ? "mañana" : "el " + DIAS[n].toLowerCase()) + " a las " + HORARIOS[n].split("-")[0] };
    }
    return { open: false, label: "Cerrado" };
  }
  function paintStatus() {
    var st = estado(), el = $("#status"), hoy = HORARIOS[new Date().getDay()];
    el.classList.toggle("on", st.open); el.querySelector("span").textContent = st.label; el.title = st.label;
    $("#noteTitle").textContent = st.open ? "Abierto ahora" : "Hoy";
    $("#noteHours").textContent = hoy ? hoy.replace("-", " a ") + " h" : "Cerrado · volvemos mañana";
  }
  var today = new Date().getDay();
  $("#hours").innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
    return '<tr class="' + (d === today ? "today" : "") + '"><td>' + DIAS[d] + (d === today ? " · hoy" : "") + "</td><td>" + (HORARIOS[d] ? HORARIOS[d].replace("-", " a ") + " h" : "Cerrado") + "</td></tr>";
  }).join("");
  paintStatus(); setInterval(paintStatus, 60000);

  /* ---------- carta: [nombre, descripción, precio, favorito] ---------- */
  var CARTA = [
    { id: "cafe", name: "Café", img: "1509042239860-f550ce710b93", items: [
      ["Espresso", "Blend de la casa, notas a chocolate y caramelo.", 110],
      ["Cortado", "Espresso con un toque de leche texturizada.", 130],
      ["Flat white", "Doble ristretto y leche sedosa.", 170, true],
      ["Cappuccino", "Espresso, leche y espuma. Con cacao si querés.", 170],
      ["Latte", "Suave y cremoso, en vaso grande.", 180],
      ["Latte de avellana", "Con almíbar casero de avellanas tostadas.", 210],
      ["Mocha", "Espresso, chocolate amargo y leche.", 210],
      ["Filtrado V60", "Café de origen, preparado al momento.", 190],
      ["Chocolate caliente", "Chocolate 70% fundido con leche.", 190],
      ["Té en hebras", "Negro, verde, frutos rojos o manzanilla.", 150]
    ] },
    { id: "frios", name: "Fríos", img: "1442512595331-e89e73853f31", items: [
      ["Cold brew", "Infusionado 18 horas en frío.", 190, true],
      ["Iced latte", "Espresso doble, leche fría y hielo.", 200],
      ["Espresso tonic", "Espresso sobre tónica y rodaja de naranja.", 220],
      ["Limonada de menta y jengibre", "Exprimida al momento.", 180],
      ["Jugo de naranja", "Naranjas exprimidas, sin agregados.", 170],
      ["Licuado de frutilla", "Con leche o con agua.", 210]
    ] },
    { id: "pasteleria", name: "Pastelería", img: "1555507036-ab1f4038808a", items: [
      ["Medialuna de manteca", "Horneada cada mañana.", 70],
      ["Croissant de jamón y queso", "Tibio, recién gratinado.", 190],
      ["Scon de queso", "Con parmesano y manteca.", 110],
      ["Alfajor de maicena", "Con dulce de leche y coco.", 90],
      ["Cookie de chocolate y nuez", "Estilo casero, bien grande.", 130],
      ["Budín de limón y amapola", "Porción, con glaseado de limón.", 150],
      ["Carrot cake", "Con nueces y frosting de queso crema.", 220, true],
      ["Cheesecake de frutos rojos", "Base de galleta y salsa casera.", 240],
      ["Brownie con nuez", "Húmedo, con chocolate amargo.", 160]
    ] },
    { id: "brunch", name: "Brunch", img: "1525351484163-7529414344d8", items: [
      ["Tostado de jamón y queso", "En pan de masa madre.", 290],
      ["Tostón de palta y huevo poché", "Con semillas y aceite de oliva.", 340, true],
      ["Huevos revueltos", "Con tostadas y manteca.", 280],
      ["Yogur con granola", "Granola casera, frutas y miel.", 260],
      ["Wafle con frutas", "Con miel o dulce de leche.", 310],
      ["Sándwich de pollo", "Pollo, rúcula, parmesano y alioli.", 360],
      ["Ensalada de estación", "Hojas, queso, frutos secos y vinagreta.", 330]
    ] }
  ];
  var cur = CARTA[0].id;
  function renderTabs() {
    $("#tabs").innerHTML = CARTA.map(function (c) { return '<button class="tab" role="tab" data-id="' + c.id + '" aria-selected="' + (c.id === cur) + '">' + c.name + "</button>"; }).join("");
  }
  function renderMenu() {
    var c = CARTA.filter(function (x) { return x.id === cur; })[0];
    $("#menuList").innerHTML = c.items.map(function (it, n) {
      return '<div class="item" style="animation-delay:' + n * 30 + 'ms"><div class="item-top"><h3>' + esc(it[0]) + "</h3>" + (it[3] ? '<span class="fav">Favorito</span>' : "") + '<span class="dots"></span><span class="price">' + pesos(it[2]) + "</span></div><p>" + esc(it[1]) + "</p></div>";
    }).join("");
    $("#menuImg").innerHTML = "<span>" + esc(c.name) + '</span><img src="' + U(c.img, 900) + '" alt="' + esc(c.name) + '" loading="lazy" onerror="this.remove()">';
  }
  $("#tabs").addEventListener("click", function (e) { var b = e.target.closest(".tab"); if (!b) return; cur = b.dataset.id; renderTabs(); renderMenu(); });
  renderTabs(); renderMenu();

  /* ---------- meriendas y desayunos ---------- */
  var COMBOS = [
    { name: "Merienda para dos", price: 890, when: "Todos los días, de 15 a 19 h", img: "1495474472287-4d71bcdd2085",
      items: ["2 cafés o tés a elección", "2 medialunas de manteca", "Tostadas con queso crema y mermelada", "1 porción de torta para compartir", "Jugo de naranja exprimido"] },
    { name: "Desayuno Nogal", price: 390, when: "De martes a sábado, hasta las 12 h", img: "1541167760496-1628856ab772",
      items: ["Café o té a elección", "Jugo de naranja exprimido", "Tostón de palta o 2 medialunas", "Yogur con granola casera"] },
    { name: "Brunch de finde", price: 590, when: "Sábados y domingos, de 10 a 14 h", img: "1488477181946-6428a0291777",
      items: ["Café o té a elección y limonada", "Huevos revueltos con tostadas", "Wafle con frutas y miel", "Porción de budín o cookie"] }
  ];
  $("#combos").innerHTML = COMBOS.map(function (c) {
    return '<article class="combo reveal">' + ph(U(c.img, 800), c.name) + '<div class="combo-body"><div class="combo-top"><h3>' + esc(c.name) + '</h3><span class="price">' + pesos(c.price) + "</span></div><small>" + esc(c.when) + "</small><ul>" +
      c.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + '</ul><a class="btn btn-dark" target="_blank" rel="noopener" href="' + wa("¡Hola Nogal! Quería reservar una mesa para: " + c.name + ".") + '">Reservar por WhatsApp</a></div></article>';
  }).join("");

  /* ---------- galería ---------- */
  var FOTOS = [
    ["1453614512568-c4024d13c247", "El salón"],
    ["1509042239860-f550ce710b93", "Café recién hecho"],
    ["1555507036-ab1f4038808a", "Pastelería del día"],
    ["1521017432531-fbd92d768814", "La barra"],
    ["1501339847302-ac426a4a7cbb", "Mesas para trabajar"],
    ["1559925393-8be0ec4767c8", "El patio"]
  ];
  $("#gallery").innerHTML = FOTOS.map(function (f, i) { return '<button data-i="' + i + '" aria-label="Ver foto: ' + esc(f[1]) + '">' + ph(U(f[0], 800), f[1]) + "</button>"; }).join("");
  var lb = $("#lightbox"), idx = 0;
  function show() { $("#lbFig").innerHTML = ph(U(FOTOS[idx][0], 1600), FOTOS[idx][1], true); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; }
  function step(d) { idx = (idx + d + FOTOS.length) % FOTOS.length; show(); }
  $("#gallery").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; idx = +b.dataset.i; show(); lb.hidden = false; document.body.style.overflow = "hidden"; });
  $("#lbClose").onclick = close;
  $("#lbPrev").onclick = function () { step(-1); };
  $("#lbNext").onclick = function () { step(1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });

  /* ---------- general ---------- */
  $$(".js-wa").forEach(function (a) { a.href = wa(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; });
  $("#year").textContent = new Date().getFullYear();
  var burger = $("#burger"), menu = $("#menu"), nav = $("#nav");
  burger.onclick = function () { var o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  $$(".head, .menu-card, .place-copy, .gallery, .rev-top, .reviews blockquote, .visit-card, .map, .facts").forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .1 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });
})();
