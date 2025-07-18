document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop normal form submission

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alertBox.textContent = "✅ Thank you! Your message has been sent.";
        alertBox.className = "alert alert-success";
        alertBox.classList.remove("d-none");
        form.reset(); // this clears the form inputs
      } else {
        alertBox.textContent =
          "⚠️ Oops! Something went wrong. Please try again.";
        alertBox.className = "alert alert-danger";
        alertBox.classList.remove("d-none");
      }
    } catch (error) {
      alertBox.textContent = "❌ Error submitting the form. Try again later.";
      alertBox.className = "alert alert-danger";
      alertBox.classList.remove("d-none");
      console.error("Form submission error:", error);
    }
  });
});
