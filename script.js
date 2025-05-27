'use strict';

// Fonction de bascule d'un élément
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Modal testimonial (section commentée dans ton HTML)
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
};

if (testimonialsItem && modalImg && modalTitle && modalText) {
  testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title = this.querySelector('[data-testimonials-title]');
      const text = this.querySelector('[data-testimonials-text]');

      modalImg.src = avatar?.src || "";
      modalImg.alt = avatar?.alt || "";
      modalTitle.innerHTML = title?.innerHTML || "";
      modalText.innerHTML = text?.innerHTML || "";

      testimonialsModalFunc();
    });
  });
}

if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);
}

// Select & Filter
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category;
    if (selectedValue === "all" || category === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

if (select && selectValue && selectItems) {
  select.addEventListener('click', function () {
    elementToggleFunc(this);
  });

  selectItems.forEach(item => {
    item.addEventListener('click', function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });
}

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Form (non présent dans le HTML fourni)
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });
}

// Navigation (fonctionne avec About / Resume / Portfolio)
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(link => {
  link.addEventListener('click', function () {
    const targetPage = this.textContent.trim().toLowerCase();

    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    navigationLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    window.scrollTo(0, 0);
  });
});