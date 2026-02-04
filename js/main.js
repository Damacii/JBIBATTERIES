document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const phoneToggle = document.querySelector(".phone-toggle");
  const phoneMenu = document.querySelector(".phone-menu");

  if (phoneToggle && phoneMenu) {
    phoneToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = phoneMenu.classList.toggle("open");
      phoneToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!phoneMenu.contains(event.target) && !phoneToggle.contains(event.target)) {
        phoneMenu.classList.remove("open");
        phoneToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        phoneMenu.classList.remove("open");
        phoneToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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

  const heroLocation = document.querySelector(".hero-location");
  const heroPhone = document.querySelector(".hero-phone");

  if (heroLocation && heroPhone) {
    const locations = [
      {
        label: "Pickup available in Hesperia, CA",
        phoneDisplay: "+1 (909) 258-1166",
        phoneHref: "tel:+19092581166",
      },
      {
        label: "Pickup available in Fontana, CA",
        phoneDisplay: "+1 (951) 254-8437",
        phoneHref: "tel:+19512548437",
      },
    ];

    let currentIndex = 0;

    const updateHeroContact = () => {
      const current = locations[currentIndex];
      heroLocation.textContent = current.label;
      heroPhone.textContent = `Call ${current.phoneDisplay}`;
      heroPhone.setAttribute("href", current.phoneHref);
      currentIndex = (currentIndex + 1) % locations.length;
    };

    updateHeroContact();
    setInterval(updateHeroContact, 5000);
  }
});
