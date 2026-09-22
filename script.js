/* =====================================================
   ELEMENTS
===================================================== */

const lockScreen = document.getElementById("lockScreen");
const unlockAnimation = document.getElementById("unlockAnimation");
const mainSite = document.getElementById("mainSite");

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");
const showPassword = document.getElementById("showPassword");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const modalOverlay = document.getElementById("modalOverlay");
const modalWindow = document.getElementById("modalWindow");
const modalClose = document.getElementById("modalClose");

const galaxyCards = document.querySelectorAll(".galaxy-card");
const modalContents = document.querySelectorAll(".modal-content");

const secretGate = document.getElementById("secretGate");
const secretSuccess = document.getElementById("secretSuccess");
const secretRealContent = document.getElementById("secretRealContent");

const secretPasswordForm = document.getElementById("secretPasswordForm");
const secretPasswordInput = document.getElementById("secretPasswordInput");
const secretPasswordMessage = document.getElementById("secretPasswordMessage");
const secretShowPassword = document.getElementById("secretShowPassword");
const secretNextButton = document.getElementById("secretNextButton");

/* =====================================================
   PASSWORDS
===================================================== */

const MAIN_PASSWORD = "Dipta&MoniWedding2026";
const SECRET_PASSWORD = "Dipta&MoniWedding2468";

/* =====================================================
   MAIN PASSWORD SHOW / HIDE
===================================================== */

if (showPassword && passwordInput) {
  showPassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    showPassword.textContent = isHidden ? "◉" : "◎";
  });
}

/* =====================================================
   MAIN UNLOCK
===================================================== */

if (passwordForm) {
  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim().toLowerCase();

    /* EMPTY */

    if (!enteredPassword) {
      passwordMessage.textContent =
        "পাসওয়ার্ড না দিলে কিন্তু ইউনিভার্স খুলবে না ❤️";

      passwordInput.focus();

      return;
    }

    /* WRONG */

    if (enteredPassword !== MAIN_PASSWORD) {
      passwordMessage.textContent =
        "হুম... পাসওয়ার্ডটা ঠিক হয়নি 😏 আবার চেষ্টা করো।";

      passwordInput.classList.remove("shake");

      void passwordInput.offsetWidth;

      passwordInput.classList.add("shake");

      return;
    }

    /* CORRECT */

    passwordMessage.textContent = "";

    passwordInput.blur();

    const unlockButton = passwordForm.querySelector(".unlock-button");

    if (unlockButton) {
      unlockButton.disabled = true;

      unlockButton.textContent = "Welcome ❤️";
    }

    /* ================================================
       START MUSIC IMMEDIATELY
    ================================================= */

    if (backgroundMusic) {
      backgroundMusic.volume = 0.65;

      try {
        const musicPromise = backgroundMusic.play();

        if (musicPromise !== undefined) {
          musicPromise
            .then(() => {
              if (musicToggle) {
                musicToggle.classList.add("playing");
              }
            })
            .catch((error) => {
              console.log("Music autoplay blocked:", error);
            });
        }
      } catch (error) {
        console.log("Music could not start:", error);
      }
    }

    /* ================================================
       SHOW GALAXY IMMEDIATELY
    ================================================= */

    if (lockScreen) {
      lockScreen.classList.add("hidden");
    }

    if (mainSite) {
      mainSite.classList.add("active");
    }

    /* ================================================
       VERY SHORT LOVE ANIMATION
    ================================================= */

    if (unlockAnimation) {
      unlockAnimation.classList.add("active");

      setTimeout(() => {
        unlockAnimation.classList.remove("active");
      }, 300);
    }

    setTimeout(() => {
      if (unlockButton) {
        unlockButton.disabled = false;

        unlockButton.textContent = "আমার ইউনিভার্স খুলে দাও ❤️";
      }
    }, 350);
  });
}

/* =====================================================
   MUSIC TOGGLE
===================================================== */

if (musicToggle && backgroundMusic) {
  musicToggle.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      const musicPromise = backgroundMusic.play();

      if (musicPromise !== undefined) {
        musicPromise
          .then(() => {
            musicToggle.classList.add("playing");
          })
          .catch((error) => {
            console.log("Music could not start:", error);
          });
      }
    } else {
      backgroundMusic.pause();

      musicToggle.classList.remove("playing");
    }
  });
}

/* =====================================================
   OPEN MODAL
===================================================== */

function openModal(modalName) {
  modalContents.forEach((content) => {
    content.classList.remove("active");
  });

  const selectedContent = document.querySelector(
    `[data-content="${modalName}"]`,
  );

  if (!selectedContent) {
    console.log("Modal not found:", modalName);

    return;
  }

  selectedContent.classList.add("active");

  if (modalOverlay) {
    modalOverlay.classList.add("active");
  }

  document.body.classList.add("modal-open");
  document.documentElement.classList.add("modal-open");

  if (modalWindow) {
    modalWindow.scrollTop = 0;
  }

  if (modalName === "secret") {
    resetSecret();
  }
}

/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }

  document.body.classList.remove("modal-open");

  document.documentElement.classList.remove("modal-open");
}

/* =====================================================
   CARD CLICK
===================================================== */

galaxyCards.forEach((card) => {
  card.addEventListener("click", () => {
    const modalName = card.dataset.modal;

    if (modalName) {
      openModal(modalName);
    }
  });
});

/* =====================================================
   CLOSE BUTTON
===================================================== */

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

/* =====================================================
   CLOSE BY OUTSIDE CLICK
===================================================== */

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

/* =====================================================
   ESCAPE
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* =====================================================
   SECRET PASSWORD SHOW / HIDE
===================================================== */

if (secretShowPassword && secretPasswordInput) {
  secretShowPassword.addEventListener("click", () => {
    const isHidden = secretPasswordInput.type === "password";

    secretPasswordInput.type = isHidden ? "text" : "password";

    secretShowPassword.textContent = isHidden ? "◉" : "◎";
  });
}

/* =====================================================
   SECRET PASSWORD
===================================================== */

if (secretPasswordForm) {
  secretPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredPassword = secretPasswordInput.value.trim().toLowerCase();

    /* EMPTY */

    if (!enteredPassword) {
      secretPasswordMessage.textContent = "আগে স্পেশাল পাসওয়ার্ডটা দাও ❤️";

      secretPasswordInput.focus();

      return;
    }

    /* WRONG */

    if (enteredPassword !== SECRET_PASSWORD) {
      secretPasswordMessage.innerHTML =
        "❤️ জামাইকে স্পেশালভাবে আদর করো ❤️<br>" + "তাহলেই পাসওয়ার্ড পাবে 🥰";

      secretPasswordInput.value = "";

      secretPasswordInput.classList.remove("shake");

      void secretPasswordInput.offsetWidth;

      secretPasswordInput.classList.add("shake");

      return;
    }

    /* CORRECT */

    secretPasswordMessage.textContent = "";

    secretPasswordInput.blur();

    /* Hide gate */

    if (secretGate) {
      secretGate.style.display = "none";
    }

    /* Show success immediately */

    if (secretSuccess) {
      secretSuccess.style.display = "grid";

      secretSuccess.classList.add("show");
    }
  });
}

/* =====================================================
   OPEN REAL SECRET
===================================================== */

function openRealSecret() {
  if (secretSuccess) {
    secretSuccess.classList.remove("show");

    setTimeout(() => {
      secretSuccess.style.display = "none";
    }, 120);
  }

  if (secretRealContent) {
    setTimeout(() => {
      secretRealContent.classList.add("show");
    }, 100);
  }

  if (modalWindow) {
    modalWindow.scrollTop = 0;
  }
}

/* =====================================================
   SECRET NEXT BUTTON
===================================================== */

if (secretNextButton) {
  secretNextButton.addEventListener("click", openRealSecret);
}

/* =====================================================
   RESET SECRET
===================================================== */

function resetSecret() {
  if (secretGate) {
    secretGate.style.display = "grid";
  }

  if (secretSuccess) {
    secretSuccess.classList.remove("show");

    secretSuccess.style.display = "none";
  }

  if (secretRealContent) {
    secretRealContent.classList.remove("show");
  }

  if (secretPasswordInput) {
    secretPasswordInput.value = "";

    secretPasswordInput.type = "password";
  }

  if (secretPasswordMessage) {
    secretPasswordMessage.textContent = "";
  }

  if (secretShowPassword) {
    secretShowPassword.textContent = "◎";
  }
}

/* =====================================================
   CARD 3D HOVER
===================================================== */

const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

if (supportsHover) {
  galaxyCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 4;

      const rotateX = (y / rect.height - 0.5) * -4;

      card.style.transform = `
          translateY(-3px)
          perspective(700px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener("load", () => {
  if (lockScreen) {
    lockScreen.classList.remove("hidden");
  }

  if (mainSite) {
    mainSite.classList.remove("active");
  }

  resetSecret();

  setTimeout(() => {
    if (passwordInput) {
      passwordInput.focus();
    }
  }, 300);
});
