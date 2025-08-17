// app.js — small UX helpers, calculator and contact form demo
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s,r=document) => Array.from(r.querySelectorAll(s));

// Mobile nav toggle
const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Savings calculator
const calcForm = $("#calcForm");
if (calcForm) {
  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const goal = parseFloat($("#goal").value) || 0;
    const months = parseInt($("#months").value, 10) || 0;
    const rate = (parseFloat($("#rate").value) || 0) / 100;
    const initial = parseFloat($("#initial").value) || 0;
    const err = $("#calcError");
    err.textContent = "";

    if (!(goal > 0 && months > 0)) {
      err.textContent = "Enter a valid goal and timeframe.";
      return;
    }

    const rMonthly = rate / 12;
    // present value of initial deposit after months:
    const futureInitial = initial * Math.pow(1 + rMonthly, months);
    let target = Math.max(0, goal - futureInitial);

    let monthly;
    if (rMonthly === 0) monthly = target / months;
    else monthly = target * rMonthly / (Math.pow(1 + rMonthly, months) - 1);

    $("#monthlyNeed").textContent = monthly.toLocaleString(undefined, {style:"currency", currency:"USD"});
    $("#calcSummary").textContent = to reach ${goal.toLocaleString(undefined, {style:"currency", currency:"USD"})} in ${months} months.;
  });
}

// Contact form (client-side demo)
const contact = $("#contactForm");
if (contact) {
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const topic = $("#topic").value;
    const message = $("#message").value.trim();
    const status = $("#formStatus");
    status.textContent = "";

    if (!name  !email  !topic || !message) {
      status.textContent = "Please fill all required fields.";
      status.className = "error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Enter a valid email.";
      status.className = "error";
      return;
    }
    status.textContent = "Thanks — message queued (demo only).";
    status.className = "helper";
    contact.reset();
  });
}

// Make <details> keyboard friendly: only one open at a time
$$("details").forEach(d => {
  d.addEventListener("toggle", () => {
    if (d.open) $$("details").forEach(o => { if (o !== d) o.removeAttribute("open"); });
  });
});