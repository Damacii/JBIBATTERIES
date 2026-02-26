document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const setupPhoneMenu = (toggle, menu) => {
    if (!toggle || !menu) return;

    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  };

  setupPhoneMenu(document.querySelector(".phone-toggle"), document.querySelector("#phone-menu"));
  setupPhoneMenu(document.querySelector(".mobile-phone-toggle"), document.querySelector("#mobile-phone-menu"));

  const contactForm = document.querySelector("#contact-form");
  const contactMessage = document.querySelector("#contact-form-message");

  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactMessage.textContent = "Message sent (demo). We'll be in touch.";
      contactForm.reset();
    });
  }

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item?.querySelector(".faq-answer");
      const isOpen = item?.classList.toggle("open");

      button.setAttribute("aria-expanded", String(isOpen));

      if (answer) {
        answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0px";
      }
    });
  });

  const mobileCta = document.querySelector(".mobile-cta");
  const footer = document.querySelector(".footer");

  const updateMobileCta = () => {
    if (!mobileCta || !footer) return;
    const nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - footer.offsetHeight / 2;
    mobileCta.classList.toggle("is-hidden", nearBottom);
  };

  updateMobileCta();
  window.addEventListener("scroll", updateMobileCta);
  window.addEventListener("resize", updateMobileCta);

  const catalogSort = document.querySelector("#catalog-sort");
  const catalogSearch = document.querySelector("#catalog-search");
  const catalogTable = document.querySelector(".catalog-table");

  if ((catalogSort || catalogSearch) && catalogTable) {
    const tbody = catalogTable.querySelector("tbody");
    const rows = Array.from(tbody?.querySelectorAll("tr") ?? []);

    const parseNumbers = (value) => {
      const matches = value.match(/\d+/g);
      return matches ? matches.map((num) => Number(num)) : [];
    };

    const getCellText = (row, index) => row.children[index]?.textContent?.trim() ?? "";

    const sortRows = () => {
      const mode = catalogSort?.value ?? "cca-asc";

      const sorted = [...rows].sort((a, b) => {
        if (mode.startsWith("cca")) {
          const aVal = Number(getCellText(a, 2)) || 0;
          const bVal = Number(getCellText(b, 2)) || 0;
          return mode === "cca-asc" ? aVal - bVal : bVal - aVal;
        }

        const aGroup = getCellText(a, 1);
        const bGroup = getCellText(b, 1);
        const aNums = parseNumbers(aGroup);
        const bNums = parseNumbers(bGroup);
        const aPrimary = aNums[0] ?? 0;
        const bPrimary = bNums[0] ?? 0;

        if (aPrimary !== bPrimary) {
          return mode === "group-asc" ? aPrimary - bPrimary : bPrimary - aPrimary;
        }

        const aSecondary = aNums[1] ?? 0;
        const bSecondary = bNums[1] ?? 0;
        if (aSecondary !== bSecondary) {
          return mode === "group-asc" ? aSecondary - bSecondary : bSecondary - aSecondary;
        }

        return mode === "group-asc" ? aGroup.localeCompare(bGroup) : bGroup.localeCompare(aGroup);
      });

      sorted.forEach((row) => tbody.appendChild(row));
    };

    const filterRows = () => {
      if (!catalogSearch) return;
      const query = catalogSearch.value.trim().toLowerCase();
      rows.forEach((row) => {
        const text = row.textContent?.toLowerCase() ?? "";
        row.style.display = text.includes(query) ? "" : "none";
      });
    };

    catalogSort?.addEventListener("change", sortRows);
    catalogSearch?.addEventListener("input", () => {
      sortRows();
      filterRows();
    });
    sortRows();
    filterRows();
  }
});
