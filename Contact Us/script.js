document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Simulate loading time

  setTimeout(() => {
    loader.classList.add("hidden");
    content.classList.remove("hidden");
    // Fade in content
    content.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
      if (opacity < 1) {
        opacity += 0.1;
        content.style.opacity = opacity;
      } else {
        clearInterval(fadeIn);
      }
    }, 50);
  }, 200);

  // Form submission
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    form.reset();
  });
});
