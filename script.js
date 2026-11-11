/* =========================================
   Sri Ganapathy Traders — Final Script
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. BACKGROUND SLIDER
  const bgSlides = document.querySelectorAll(".bg-slide");
  let currentBg = 0;

  function nextBg() {
    if (bgSlides.length === 0) return;
    bgSlides[currentBg].classList.remove("active");
    currentBg = (currentBg + 1) % bgSlides.length;
    bgSlides[currentBg].classList.add("active");
  }

  if (bgSlides.length > 0) {
    setInterval(nextBg, 4000);
  }

  // 2. MOBILE MENU & POS-F-T COLLAPSE TOGGLER
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");
  const posFTToggle = document.getElementById("posFTToggle");
  const externalCollapse = document.getElementById("navbarToggleExternalContent");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      if (nav) nav.classList.toggle("show");
    });
  }

  if (posFTToggle && externalCollapse) {
    let savedScrollY = 0;

    const setMobileMenu = (open) => {
      const isOpen = externalCollapse.classList.contains("show");
      if (open === isOpen) return;

      if (open) {
        savedScrollY = window.scrollY;
        document.body.style.top = `-${savedScrollY}px`;
      } else {
        document.body.style.top = "";
      }

      externalCollapse.classList.toggle("show", open);
      posFTToggle.classList.toggle("active", open);
      posFTToggle.setAttribute("aria-expanded", String(open));
      document.documentElement.classList.toggle("menu-open", open);
      document.body.classList.toggle("menu-open", open);

      if (!open) {
        window.scrollTo({ top: savedScrollY, behavior: "instant" });
      }
    };

    posFTToggle.addEventListener("click", () => {
      setMobileMenu(!externalCollapse.classList.contains("show"));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && externalCollapse.classList.contains("show")) {
        setMobileMenu(false);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 993px)");
    const onDesktopChange = (e) => {
      if (e.matches) setMobileMenu(false);
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", onDesktopChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(onDesktopChange);
    }

    const mobileNavLinks = externalCollapse.querySelectorAll("a");
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => setMobileMenu(false));
    });
  }

  // 3. STICKY NAVBAR LOGIC (Only runs on desktop view layout)
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".custom-desktop-nav");
    if (!navbar || window.getComputedStyle(navbar).display === "none") return;

    const navLinks = navbar.querySelectorAll(".nav-links a");
    const btn = navbar.querySelector(".btn");
    const menuSpans = navbar.querySelectorAll(".menu-btn span");

    if (window.scrollY > 60) {
      navbar.style.background = "rgba(255, 255, 255, 0.88)";
      navbar.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)";
      navbar.style.border = "1px solid rgba(0,0,0,0.08)";
      navLinks.forEach(a => a.style.color = "#2E7D32");
      if (btn) {
        btn.style.background = "#2E7D32";
        btn.style.color = "#fff";
      }
      menuSpans.forEach(s => s.style.background = "#2E7D32");
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.16)";
      navbar.style.boxShadow = "0 4px 24px rgba(0,0,0,0.1)";
      navbar.style.border = "1px solid rgba(255, 255, 255, 0.18)";
      navLinks.forEach(a => a.style.color = "#fff");
      if (btn) {
        btn.style.background = "#fff";
        btn.style.color = "#2E7D32";
      }
      menuSpans.forEach(s => s.style.background = "#fff");
    }
  });

  // 4. ANIMATED COUNTERS (Triggered on Scroll Viewport Entry)
  const counters = document.querySelectorAll(".counter");
  const counterSection = document.querySelector(".counter-section");
  let hasCounted = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const speed = 200; 
      const increment = Math.ceil(target / speed);

      const updateCount = () => {
        const current = parseInt(counter.innerText, 10);
        if (current < target) {
          counter.innerText = current + increment > target ? target : current + increment;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
  };

  if (counterSection) {
    const observerOptions = { threshold: 0.4 };
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          startCounters();
          hasCounted = true;
        }
      });
    }, observerOptions);

    counterObserver.observe(counterSection);
  }

  // 5. PHONE FIELD CONFIGURATION UTILITY
  const countryCodeSelect = document.getElementById("countryCode");
  const phoneInput = document.getElementById("phoneInput");

  if (countryCodeSelect && phoneInput) {
    countryCodeSelect.addEventListener("change", () => {
      const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
      const maxLen = selectedOption.getAttribute("data-length") || "10";
      phoneInput.setAttribute("maxlength", maxLen);
      phoneInput.value = ""; 
    });
  }

  // 6. BACK TO TOP BUTTON
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    if (topBtn) {
      if (window.scrollY > 400) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    }
  });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 7. CONTACT FORM — SEND ENQUIRY VIA WHATSAPP
  const contactForm = document.querySelector(".contact-form");
  const waBtn = document.getElementById("whatsappBtn");

  // Obfuscated phone number
  const _p = [91,9789419437];
  const _wa = "https://wa.me/" + _p[0] + _p[1];

  // Thank you toast
  function showThankYou() {
    const toast = document.createElement("div");
    toast.className = "thank-you-toast";
    toast.innerHTML = "🙏 Thank you for contacting us! We will reply soon.";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  if (waBtn) {
    waBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(_wa, "_blank");
      showThankYou();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const phone = document.getElementById("phoneInput").value.trim();
      const countryCode = document.getElementById("countryCode");
      const selectedOption = countryCode.options[countryCode.selectedIndex];
      const dialCode = selectedOption.getAttribute("data-code") || "+91";
      const message = contactForm.querySelector("textarea").value.trim();

      if (!name) { alert("Please enter your name."); return; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Please enter a valid email address."); return; }
      if (!phone) { alert("Please enter your phone number."); return; }
      if (!message) { alert("Please enter your message."); return; }

      const fullPhone = dialCode + phone;
      const whatsappMsg = encodeURIComponent(
        "New Enquiry from Website\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + fullPhone + "\n\n" +
        "Message:\n" + message
      );

      window.open(_wa + "?text=" + whatsappMsg, "_blank");
      showThankYou();
      contactForm.reset();
    });
  }

  // 8. DIAGONAL MARQUEE — set speed from data attributes
  document.querySelectorAll(".diagonal-marquee-row").forEach(row => {
    const speed = row.getAttribute("data-speed") || "45";
    row.style.setProperty("--speed", speed + "s");
  });

  // 9. AUTO-UPDATE COPYRIGHT YEAR
  const copyrightYear = document.getElementById("copyrightYear");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});