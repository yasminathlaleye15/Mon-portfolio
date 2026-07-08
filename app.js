(function () {
  "use strict";

  /* Année du footer  */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Menu mobile  */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("primaryMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open");
    });
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });
  }

  /*Validation du formulaire de contact */
  var form = document.getElementById("contactForm");
  if (form) {
    var feedback = document.getElementById("formFeedback");

    var fields = {
      nom: { input: document.getElementById("nom"), error: document.getElementById("err-nom") },
      email: { input: document.getElementById("email"), error: document.getElementById("err-email") },
      message: { input: document.getElementById("message"), error: document.getElementById("err-message") }
    };

    function setError(field, message) {
      field.input.closest(".form-group").classList.toggle("has-error", !!message);
      field.error.textContent = message || "";
    }

    function validateNom() {
      var value = fields.nom.input.value.trim();
      if (value.length < 2) { setError(fields.nom, "Merci d'indiquer votre nom (2 caractères minimum)."); return false; }
      setError(fields.nom, ""); return true;
    }

    function validateEmail() {
      var value = fields.email.input.value.trim();
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value)) { setError(fields.email, "Merci d'indiquer une adresse email valide."); return false; }
      setError(fields.email, ""); return true;
    }

    function validateMessage() {
      var value = fields.message.input.value.trim();
      if (value.length < 10) { setError(fields.message, "Votre message doit contenir au moins 10 caractères."); return false; }
      setError(fields.message, ""); return true;
    }

    fields.nom.input.addEventListener("blur", validateNom);
    fields.email.input.addEventListener("blur", validateEmail);
    fields.message.input.addEventListener("blur", validateMessage);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var okNom = validateNom();
      var okEmail = validateEmail();
      var okMessage = validateMessage();

      if (okNom && okEmail && okMessage) {
        feedback.textContent = "Merci ! Votre message a bien été pris en compte.";
        feedback.className = "form-feedback success";
        form.reset();
      } else {
        feedback.textContent = "Merci de corriger les champs indiqués ci-dessus.";
        feedback.className = "form-feedback error";
      }
    });
  }

  /* Filtres de la page Projets  */
  var filterBar = document.querySelector(".filters");
  if (filterBar) {
    var filterButtons = filterBar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".projet-card");
    var emptyState = document.querySelector(".projets-empty");

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        var filter = btn.getAttribute("data-filter");
        var visibleCount = 0;

        cards.forEach(function (card) {
          var matches = filter === "tous" || card.classList.contains("projet-card--" + filter);
          card.hidden = !matches;
          if (matches) visibleCount++;
        });

        if (emptyState) emptyState.classList.toggle("is-visible", visibleCount === 0);
      });
    });
  }
})();
