// Helper function to convert 12-hour time to 24-hour time
function convertTo24Hour(hours, minutes, period) {
  if (period === "PM" && hours !== "12") {
    hours = parseInt(hours) + 12;
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }
  return `${hours}:${minutes}`;
}

// Helper function to format time
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Helper function to format hours and minutes
function formatHoursAndMinutes(totalHours) {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  if (minutes === 0) {
    return `${hours} hours`;
  }
  return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
}

// Calculate bedtime based on wake-up time
function calculateBedtime(wakeUpTime) {
  const [hours, minutes] = wakeUpTime.split(":").map(Number);
  let wakeDate = new Date();
  wakeDate.setHours(hours, minutes, 0);

  const cycles = [4, 5, 6, 7];
  let results = [];

  cycles.forEach((cycle) => {
    const bedtime = new Date(wakeDate);
    // Each cycle is exactly 90 minutes
    const totalSleepMinutes = cycle * 90;
    bedtime.setMinutes(bedtime.getMinutes() - totalSleepMinutes);

    results.push({
      bedtime: formatTime(bedtime),
      cycles: cycle,
      totalSleep: totalSleepMinutes / 60,
    });
  });

  return results;
}

// Calculate wake-up time based on bedtime
function calculateWakeUpTime(bedtime) {
  const [hours, minutes] = bedtime.split(":").map(Number);
  let bedDate = new Date();
  bedDate.setHours(hours, minutes, 0);

  const cycles = [4, 5, 6, 7];
  let results = [];

  cycles.forEach((cycle) => {
    const wakeUpTime = new Date(bedDate);
    // Each cycle is exactly 90 minutes
    const totalSleepMinutes = cycle * 90;
    wakeUpTime.setMinutes(wakeUpTime.getMinutes() + totalSleepMinutes);

    results.push({
      wakeUpTime: formatTime(wakeUpTime),
      cycles: cycle,
      totalSleep: totalSleepMinutes / 60,
    });
  });

  return results;
}

// Display results in a table
function displayResults(results, type) {
  const resultsContent = document.getElementById("resultsContent");
  let html = "";

  // Add personalized message
  if (type === "bedtime") {
    // Get the wake-up time from the input fields
    const hours =
      document.getElementById("modalWakeUpHours").value ||
      document.getElementById("wakeUpHours").value;
    const minutes =
      document.getElementById("modalWakeUpMinutes").value ||
      document.getElementById("wakeUpMinutes").value;
    const period =
      document.getElementById("modalWakeUpPeriod").value ||
      document.getElementById("wakeUpPeriod").value;

    if (hours && minutes) {
      const wakeUpTime = `${hours}:${minutes} ${period}`;
      html += `<div class="alert alert-primary mb-4">
        <i class="fas fa-info-circle me-2"></i>
        If you want to wake up at ${wakeUpTime}, you should go to bed at one of these times:
      </div>`;
    }
  } else {
    // Get the bedtime from the input fields or current time
    const hours = document.getElementById("bedtimeHours").value;
    const minutes = document.getElementById("bedtimeMinutes").value;
    const period = document.getElementById("bedtimePeriod").value;

    if (hours && minutes) {
      const bedtime = `${hours}:${minutes} ${period}`;
      html += `<div class="alert alert-primary mb-4">
        <i class="fas fa-info-circle me-2"></i>
        If you go to bed at ${bedtime}, you should wake up at one of these times:
      </div>`;
    } else {
      // For "Go to Sleep Now" button
      const currentTime = new Date();
      const bedtime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      html += `<div class="alert alert-primary mb-4">
        <i class="fas fa-info-circle me-2"></i>
        If you go to bed now (${bedtime}), you should wake up at one of these times:
      </div>`;
    }
  }

  // Add the table
  html +=
    '<div class="table-responsive"><table class="table table-hover"><thead><tr>';

  if (type === "bedtime") {
    html += "<th>Bedtime</th>";
  } else {
    html += "<th>Wake Up Time</th>";
  }

  html += "<th>Sleep Cycles</th><th>Total Sleep</th></tr></thead><tbody>";

  results.forEach((result) => {
    html += "<tr>";
    if (type === "bedtime") {
      html += `<td>${result.bedtime}</td>`;
    } else {
      html += `<td>${result.wakeUpTime}</td>`;
    }
    html += `<td>${result.cycles} cycles</td>`;
    html += `<td>${formatHoursAndMinutes(result.totalSleep)}</td>`;
    html += "</tr>";
  });

  html += "</tbody></table></div>";
  resultsContent.innerHTML = html;
  document.getElementById("results").style.display = "block";

  // Scroll to results section
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

// Get current time in 24-hour format
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Event Listeners
document
  .getElementById("calculateWakeUpButton")
  .addEventListener("click", function () {
    const hours = document.getElementById("wakeUpHours").value;
    const minutes = document.getElementById("wakeUpMinutes").value;
    const period = document.getElementById("wakeUpPeriod").value;

    if (!hours || !minutes) {
      alert("Please select both hours and minutes");
      return;
    }

    const wakeUpTime = convertTo24Hour(hours, minutes, period);
    const results = calculateBedtime(wakeUpTime);
    displayResults(results, "bedtime");
  });

document
  .getElementById("calculateBedtimeButton")
  .addEventListener("click", function () {
    const hours = document.getElementById("bedtimeHours").value;
    const minutes = document.getElementById("bedtimeMinutes").value;
    const period = document.getElementById("bedtimePeriod").value;

    if (!hours || !minutes) {
      alert("Please select both hours and minutes");
      return;
    }

    const bedtime = convertTo24Hour(hours, minutes, period);
    const results = calculateWakeUpTime(bedtime);
    displayResults(results, "wakeup");
  });

// Quick Calculate - Sleep Now (Calculate wake-up times if you go to sleep now)
document
  .getElementById("sleepNowButton")
  .addEventListener("click", function () {
    const currentTime = getCurrentTime();
    const results = calculateWakeUpTime(currentTime);
    displayResults(results, "wakeup");
  });

// Quick Calculate - Set Wake Up Time (Calculate bedtimes to wake up at a specific time)
document
  .getElementById("sleepNowFallButton")
  .addEventListener("click", function () {
    // Show the modal
    const modal = new bootstrap.Modal(
      document.getElementById("wakeUpTimeModal")
    );
    modal.show();
  });

// Handle modal calculation
document
  .getElementById("calculateWakeUpFromModal")
  .addEventListener("click", function () {
    const hours = document.getElementById("modalWakeUpHours").value;
    const minutes = document.getElementById("modalWakeUpMinutes").value;
    const period = document.getElementById("modalWakeUpPeriod").value;

    if (!hours || !minutes) {
      alert("Please select both hours and minutes");
      return;
    }

    const wakeUpTime = convertTo24Hour(hours, minutes, period);
    const results = calculateBedtime(wakeUpTime);
    displayResults(results, "bedtime");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("wakeUpTimeModal")
    );
    modal.hide();

    // Reset the form
    document.getElementById("modalWakeUpHours").value = "";
    document.getElementById("modalWakeUpMinutes").value = "";
    document.getElementById("modalWakeUpPeriod").value = "AM";
  });

// Reset buttons
document
  .getElementById("checkAgainButton")
  .addEventListener("click", function () {
    document.getElementById("wakeUpHours").value = "";
    document.getElementById("wakeUpMinutes").value = "";
    document.getElementById("wakeUpPeriod").value = "AM";
    document.getElementById("results").style.display = "none";
  });

document
  .getElementById("checkAgainFallButton")
  .addEventListener("click", function () {
    document.getElementById("bedtimeHours").value = "";
    document.getElementById("bedtimeMinutes").value = "";
    document.getElementById("bedtimePeriod").value = "AM";
    document.getElementById("results").style.display = "none";
  });
