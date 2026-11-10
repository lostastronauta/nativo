/**
 * components.js — Inyecta header y footer compartidos
 * DEPENDE DE: site.css (variables y estilos de header/footer)
 */

function resolveAssetPath(route) {
  const isInsidePages = window.location.pathname.includes("/pages/");
  const baseDir = isInsidePages ? "../" : "";
  const normalizedRoute = route.startsWith("/") ? route.slice(1) : route;
  return `${baseDir}${normalizedRoute}`;
}

function goToRoute(route) {
  window.location.href = resolveAssetPath(route);
}

window.setLoginState = function (isLoggedIn) {
  const publicNav = document.getElementById("publicNav");
  const userNav = document.getElementById("userNav");
  const mainNavToggle = document.getElementById("mainNavToggle");

  if (publicNav && userNav) {
    publicNav.style.display = isLoggedIn ? "none" : "";
    userNav.style.display = isLoggedIn ? "block" : "none";
  }
  if (mainNavToggle) {
    mainNavToggle.style.display = isLoggedIn ? "none" : "";
  }
};

window.loadUserName = function () {
  const userNameEl = document.getElementById("userName");
  if (userNameEl) {
    userNameEl.textContent = localStorage.getItem("userName") || "Usuario";
  }
};

window.logout = function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRut");
  localStorage.removeItem("userDatos");
  localStorage.removeItem("loginMethod");
  localStorage.removeItem("loginRole");
  localStorage.removeItem("loginIdentifier");
  window.setLoginState(false);
  goToRoute("index.html");
};

// ==========================================
// HEADER HTML MODULAR (Separado por partes)
// Conforme a https://framework.digital.gob.cl/
// ==========================================
const HEADER_HTML = `
<header class="main-header" role="banner">
    <!-- PARTE 1: BANNER E IDENTIDAD INSTITUCIONAL -->
    <div class="top-banner">
        <a href="javascript:void(0)" data-route="index.html" style="display:block; text-decoration:none; cursor:pointer;" title="Volver al inicio">
            <img id="bannerImage"
                 src="${resolveAssetPath("img/banner-sie.webp")}"
                 alt="Supereduc | Superintendencia de Educación"
                 class="banner-img"
                 onerror="this.style.display='none'; document.getElementById('bannerFallback').style.display='flex';">
        </a>
        <div id="bannerFallback" class="banner-fallback" style="display:none;" role="region" aria-label="Identidad Institucional">
            <a href="javascript:void(0)" data-route="index.html" style="display:block; text-decoration:none; color:inherit; cursor:pointer;" title="Volver al inicio">
            <div class="fallback-content">
                <div class="inst-label">Supereduc | Superintendencia de Educación &bull; Gobierno de Chile</div>
                <div class="inst-title">Supereduc | Superintendencia de Educación</div>
                <div class="inst-sub">Ley N.° 20.529 — Aseguramiento de la Calidad de la Educación</div>
            </div>
            </a>
            <div class="fallback-bar" aria-hidden="true"></div>
        </div>
    </div>

    <!-- PARTE 2: BOTÓN HAMBURGUESA RESPONSIVE (MÓVIL) -->
    <button type="button" class="main-nav-toggle" id="mainNavToggle" aria-expanded="false" aria-controls="publicNav" aria-label="Abrir o cerrar menú de navegación">
        <span class="main-nav-toggle-icon" aria-hidden="true">&#9776;</span>
        <span class="main-nav-toggle-label">Menú</span>
    </button>

    <!-- PARTE 3: NAVEGACIÓN PÚBLICA (ENLACES EXTERNOS INSTITUCIONALES) -->
    <nav class="public-nav" id="publicNav" role="navigation" aria-label="Navegación pública">
        <a href="https://www.supereduc.cl/competencias-supereduc/" 
           class="nav-tab active" 
           target="_blank" 
           rel="noopener noreferrer">
          Nuestras Competencias
        </a>

        <a href="https://www.supereduc.cl/normativa/" 
           class="nav-tab" 
           target="_blank" 
           rel="noopener noreferrer">
          Normativa
        </a>

        <a href="https://www.supereduc.cl/contenidos-de-interes/" 
           class="nav-tab" 
           target="_blank" 
           rel="noopener noreferrer">
          Contenidos de Interés
        </a>
       
        <a href="https://www.supereduc.cl/contacto/" 
           class="nav-tab" 
           target="_blank" 
           rel="noopener noreferrer">
          Contacto
        </a>
    </nav>

    <!-- PARTE 4: NAVEGACIÓN PRIVADA / USUARIO AUTENTICADO -->
    <nav class="user-nav" id="userNav" style="display: none;" role="navigation" aria-label="Barra de usuario autenticado">
        <div class="user-nav-container">
            <div class="breadcrumb" aria-label="Miga de pan">
                <a href="javascript:void(0)" data-route="index.html">Inicio</a>
                <span class="separator" aria-hidden="true">&gt;</span>
                <span class="current-page" id="currentPage" aria-current="page">Inicio</span>
            </div>
            <div class="user-actions">
                <div class="user-profile">
                    <div class="user-icon" aria-hidden="true">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <span class="user-name" id="userName">Usuario</span>
                </div>
                <div class="user-buttons" role="group" aria-label="Acciones de sesión">
                  <button type="button" class="btn-user" data-route="pages/dashboard.html" data-nav="home">
                        <i class="bi bi-house-door-fill" aria-hidden="true"></i> Inicio
                    </button>
                    <button type="button" class="btn-user" data-route="pages/notificaciones.html">
                        <i class="bi bi-bell-fill" aria-hidden="true"></i> Notificaciones
                    </button>
                  <button type="button" class="btn-user" data-route="pages/actualizar-datos.html">
                    <i class="bi bi-person-lines-fill" aria-hidden="true"></i> Actualizar datos
                  </button>
                    <button type="button" class="btn-user btn-logout" id="btnLogout">
                        <i class="bi bi-power" aria-hidden="true"></i> Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
`;

// ==========================================
// FOOTER HTML MODULAR (Separado por partes)
// Conforme a https://framework.digital.gob.cl/
// ==========================================
const FOOTER_HTML = `
<footer class="main-footer" role="contentinfo">
  <!-- PARTE 1: BANNERS INSTITUCIONALES Y DE TRANSPARENCIA -->
  <div class="footer-institutional-banners" aria-label="Portales de Transparencia y Trámites">
    <a href="https://transparencia.supereduc.cl/iris_gplus/Transparencia/index_minisitio.jsp?id=11" target="_blank" rel="noopener noreferrer" class="footer-institutional-banner">
      <span></span><strong>Solicitud de información<br>Ley de Transparencia</strong>
    </a>
    <a href="https://transparencia.supereduc.cl/IRIS_FILES/_T.ACTIVA/3025/28-12-2018-12-24-11.078754999999999.html" target="_blank" rel="noopener noreferrer" class="footer-institutional-banner">
      <span></span><strong>Compromisos de<br>Gestión Institucional</strong>
    </a>
    <a href="https://www.supereduc.cl/registro-de-tramites-digitales/" target="_blank" rel="noopener noreferrer" class="footer-institutional-banner">
      <span></span><strong>Gobierno<br>Transparente</strong>
    </a>
  </div>

  <!-- PARTE 2: CONTENIDO PRINCIPAL (GRID INSTITUCIONAL) -->
  <div class="footer-content">
    <!-- 2.1 Identidad y Enlaces Rápidos -->
    <div class="footer-section">
      <img class="footer-logo" src="${resolveAssetPath("img/logo-supereduc-rojo.svg")}" alt="Supereduc | Superintendencia de Educación" loading="lazy">
      <p class="footer-institution"><strong>Supereduc | Superintendencia de Educación</strong><br>Ministerio de Educación<br>Gobierno de Chile</p>
      <h5>Enlaces Rápidos</h5>
      <ul>
        <li><a href="https://www.supereduc.cl/consultas/" target="_blank" rel="noopener noreferrer">Preguntas frecuentes</a></li>
        <li><a href="javascript:void(0)" data-route="pages/mapa-del-sitio.html">Mapa del Sitio</a></li>
        <li><a href="https://www.supereduc.cl/politicas-privacidad/" target="_blank" rel="noopener noreferrer">Políticas de privacidad</a></li>
        <li><a href="https://www.supereduc.cl/trabaja-con-nosotros/" target="_blank" rel="noopener noreferrer">Trabaja con nosotros</a></li>
      </ul>
    </div>

    <!-- 2.2 Canales de Atención y Redes Sociales -->
    <div class="footer-section">
      <h5>Contacto</h5>
      <p><i class="bi bi-telephone" aria-hidden="true"></i> 600 3600 390</p>
      <p><i class="bi bi-clock" aria-hidden="true"></i> Lunes a Viernes 09:00 - 13:00</p>
      <a class="footer-contact-link" href="https://www.supereduc.cl/contacto/" target="_blank" rel="noopener noreferrer"><i class="bi bi-envelope" aria-hidden="true"></i> Formulario de contacto</a>
      <div class="social-links" aria-label="Redes sociales institucionales">
        <a href="https://www.facebook.com/supereducCL/timeline" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="bi bi-facebook" aria-hidden="true"></i></a>
        <a href="https://x.com/supereduc_cl" target="_blank" rel="noopener noreferrer" aria-label="X (antes Twitter)"><i class="bi bi-twitter-x" aria-hidden="true"></i></a>
        <a href="https://www.youtube.com/channel/UCWzV9xpJrHWpB-VT2mx9HKg" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="bi bi-youtube" aria-hidden="true"></i></a>
        <a href="https://www.instagram.com/supereduc_cl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="bi bi-instagram" aria-hidden="true"></i></a>
        <a href="https://www.linkedin.com/company/superintendencia-de-educacion/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="bi bi-linkedin" aria-hidden="true"></i></a>
      </div>
    </div>

    <!-- 2.3 Sitios Relacionados -->
    <div class="footer-section">
      <h5>Sitios Relacionados</h5>
      <ul>
        <li><a href="https://www.ayudamineduc.cl/" target="_blank" rel="noopener noreferrer">Ayuda Mineduc</a></li>
        <li><a href="https://junji.cl/" target="_blank" rel="noopener noreferrer">JUNJI</a></li>
        <li><a href="https://integra.cl/" target="_blank" rel="noopener noreferrer">Integra</a></li>
        <li><a href="https://www.agenciaeducacion.cl/" target="_blank" rel="noopener noreferrer">Agencia de Calidad</a></li>
      </ul>
    </div>
  </div>

  <!-- PARTE 3: CONTACTO ADMINISTRATIVO / SOPORTE TI -->
  <a class="footer-contact-callout" href="mailto:jaime.galleguillos@supereduc.cl">
    Si necesitas contactarte con la administración de este sitio, haz clic aquí
  </a>

  <!-- PARTE 4: COPYRIGHT DEL ESTADO DE CHILE -->
  <div class="footer-bottom">
    <p>&copy; 2026 Supereduc | Superintendencia de Educación &bull; Gobierno de Chile</p>
  </div>

  <!-- PARTE 5: FRANJA TRICOLOR DECORATIVA -->
  <img class="footer-tricolor-star" src="${resolveAssetPath("img/tricolor estrella.webp")}" alt="Franja tricolor del Gobierno de Chile" aria-hidden="true">
</footer>
`;

function bindComponentInteractions() {
  var mainNavToggle = document.getElementById("mainNavToggle");
  var publicNav = document.getElementById("publicNav");

  // Lógica del botón hamburguesa (móvil)
  if (mainNavToggle && publicNav) {
    mainNavToggle.addEventListener("click", function () {
      var isOpen = publicNav.classList.toggle("open");
      mainNavToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mainNavToggle.classList.toggle("open", isOpen);
    });
  }

  // NOTA: Se eliminó la lógica antigua de "active tab" basada en data-route 
  // para el menú público, ya que ahora son enlaces externos directos.
  // El estado "active" se maneja directamente en el HTML del HEADER_HTML.

  // Lógica para botones de usuario (mantener activo visualmente)
  var userButtons = document.querySelectorAll(".btn-user:not(.btn-logout)");
  userButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      userButtons.forEach(function (b) {
        b.classList.remove("active-page-btn");
      });
      btn.classList.add("active-page-btn");
    });
  });

  // Interceptador global de [data-route] para navegación interna
  document.querySelectorAll("[data-route]").forEach(function (el) {
    var route = el.dataset.route;
    if (!route) return;

    el.addEventListener("click", function (event) {
      // Si es logout, usar la función dedicada
      if (el.classList.contains("btn-logout")) {
        event.preventDefault();
        window.logout();
        return;
      }
      
      // Solo prevenir default si NO es un enlace externo (target="_blank")
      // Esto asegura que los enlaces internos sigan funcionando vía JS
      if (!el.hasAttribute("target") || el.getAttribute("target") !== "_blank") {
          event.preventDefault();
          goToRoute(route);
      }
    });
  });
}

function adjustBodyPadding() {
  var mockupBanner = document.querySelector(".mockup-banner");
  if (mockupBanner && mockupBanner.offsetHeight > 0) {
    document.body.style.paddingTop = mockupBanner.offsetHeight + "px";
  } else {
    document.body.style.paddingTop = "0";
  }
}

function ensureSharedStyles() {
  var stylesheetUrl = new URL(
    resolveAssetPath("css/site.css"),
    window.location.href,
  );
  stylesheetUrl.searchParams.set("v", "20260921");
  var stylesheet = Array.prototype.find.call(
    document.querySelectorAll('link[rel="stylesheet"]'),
    function (link) {
      return link.href === stylesheetUrl.href;
    },
  );

  if (!stylesheet) {
    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetUrl.href;
  }

  stylesheet.dataset.sharedSiteStyles = "true";
  document.head.appendChild(stylesheet);
}

function updateCurrentPage() {
  var currentFile = window.location.pathname.split("/").pop() || "index.html";
  var pageNames = {
    "dashboard.html": "Inicio",
    "notificaciones.html": "Notificaciones",
    "seguimiento.html": "Consultar Requerimientos",
    "actualizar-datos.html": "Mis datos",
    "denuncia.html": "Ingreso requerimiento",
    "denuncia-paso2.html": "Ingreso requerimiento",
    "denuncia-paso3.html": "Ingreso requerimiento",
    "denuncia-paso4.html": "Ingreso requerimiento",
    "denuncia-paso5.html": "Ingreso requerimiento",
    "preguntas-previas.html": "Gestión Previa",
    "mediacion.html": "Normativa",
    "consulta.html": "Consulta",
    "gcc.html": "Normativa",
    "sugerencias.html": "Sugerencias y reclamos",
    "contacto-directo.html": "Contacto directo",
    "mapa-del-sitio.html": "Mapa del Sitio"
  };
  var route = "pages/" + currentFile;
  var currentPage = pageNames[currentFile] || document.title.split(" - ")[0];
  var currentPageEl = document.getElementById("currentPage");

  if (currentPageEl) currentPageEl.textContent = currentPage;
  document.querySelectorAll(".btn-user[data-route]").forEach(function (button) {
    var isDashboard = currentFile === "dashboard.html";
    button.classList.toggle(
      "active-page-btn",
      isDashboard
        ? button.dataset.nav === "home"
        : button.dataset.route === route,
    );
  });
}

function injectComponents() {
  var headerContainer = document.getElementById("header-container");
  var footerContainer = document.getElementById("footer-container");
  var isInsidePages = window.location.pathname.includes("/pages/");

  ensureSharedStyles();

  if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  var hasSession = localStorage.getItem("isLoggedIn") === "true";

  if (hasSession) {
    if (!isInsidePages) {
      // INDEX con sesión → redirigir a dashboard
      if (window.goToRoute) {
        window.goToRoute("pages/dashboard.html");
      } else {
        window.location.href = "pages/dashboard.html";
      }
    } else {
      // PÁGINA INTERNA con sesión → mostrar user-nav
      window.setLoginState(true);
      window.loadUserName();
    }
  } else {
    if (!isInsidePages) {
      // INDEX sin sesión → mostrar public-nav
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "Jaime Alberto Galleguillos Araya");
      }
      if (!localStorage.getItem("userRut")) {
        localStorage.setItem("userRut", "199777706");
      }
      window.setLoginState(false);
      window.loadUserName();
    } else {
      // PÁGINA INTERNA sin sesión → ocultar todo
      window.setLoginState(false);
    }
  }

  bindComponentInteractions();
  if (hasSession && isInsidePages) updateCurrentPage();

  if (headerContainer) {
    window.addEventListener("load", adjustBodyPadding);
    setTimeout(adjustBodyPadding, 150);
    var bannerImg = document.getElementById("bannerImage");
    if (bannerImg) {
      bannerImg.addEventListener("load", function () {
        setTimeout(adjustBodyPadding, 50);
      });
      bannerImg.addEventListener("error", function () {
        setTimeout(adjustBodyPadding, 50);
      });
    }
  }
}

function injectChatbotNorma() {
  if (document.getElementById("cn-widget")) return;

  var style = document.createElement("style");
  style.textContent =
    "#cn-widget{" +
    "position:fixed;" +
    "bottom:0;" +
    "right:0;" +
    "width:420px;" +
    "max-width:100vw;" +
    "height:720px;" +
    "max-height:100vh;" +
    "border:none;" +
    "background:transparent;" +
    "z-index:9998;" +
    "pointer-events:none;" +
    "}";
  document.head.appendChild(style);

  var iframe = document.createElement("iframe");
  iframe.id = "cn-widget";
  iframe.src = "https://d1dj24jd5hi6da.cloudfront.net/super_educa/index.html";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("title", "Chatbot Norma");
  iframe.setAttribute("allow", "autoplay; camera; microphone");
  iframe.setAttribute("scrolling", "no");
  document.body.appendChild(iframe);

  var HOTZONE_WIDTH = 170;
  var HOTZONE_HEIGHT = 220;

  function isInHotzone(x, y) {
    return (
      x >= window.innerWidth - HOTZONE_WIDTH &&
      y >= window.innerHeight - HOTZONE_HEIGHT
    );
  }

  document.addEventListener("mousemove", function (event) {
    iframe.style.pointerEvents = isInHotzone(event.clientX, event.clientY)
      ? "auto"
      : "none";
  });

  document.addEventListener(
    "touchstart",
    function (event) {
      var touch = event.touches && event.touches[0];
      if (!touch) return;
      iframe.style.pointerEvents = isInHotzone(touch.clientX, touch.clientY)
        ? "auto"
        : "none";
    },
    { passive: true }
  );
}

function initializeComponents() {
  if (
    document.getElementById("header-container") ||
    document.getElementById("footer-container")
  ) {
    injectComponents();
  }
  injectChatbotNorma();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeComponents);
} else {
  initializeComponents();
}