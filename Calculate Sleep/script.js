document
  .getElementById("calculateWakeUpButton")
  .addEventListener("click", function () {
    var wakeUpHours = document.getElementById("wakeUpHours").value;
    var wakeUpMinutes = document.getElementById("wakeUpMinutes").value;
    var wakeUpPeriod = document.getElementById("wakeUpPeriod").value;

    if (wakeUpHours === "" || wakeUpMinutes === "") {
      alert("Please select both hours and minutes.");
      return;
    }

    var wakeUpTime = `${wakeUpHours}:${wakeUpMinutes} ${wakeUpPeriod}`;
    calculateSleepTimes(wakeUpTime, "wake");
  });

document
  .getElementById("calculateBedtimeButton")
  .addEventListener("click", function () {
    var bedtimeHours = document.getElementById("bedtimeHours").value;
    var bedtimeMinutes = document.getElementById("bedtimeMinutes").value;
    var bedtimePeriod = document.getElementById("bedtimePeriod").value;

    if (bedtimeHours === "" || bedtimeMinutes === "") {
      alert("Please select both hours and minutes.");
      return;
    }

    var bedtime = `${bedtimeHours}:${bedtimeMinutes} ${bedtimePeriod}`;
    calculateSleepTimes(bedtime, "sleep");
  });

// sleep for button for I want to wake up at...
document
  .getElementById("sleepNowButton")
  .addEventListener("click", function () {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var currentTime = `${hours}:${minutes} ${period}`;
    calculateSleepTimes(currentTime, "sleep");
  });

// sleep for button for I plan to fall asleep at...
document
  .getElementById("sleepNowFallButton")
  .addEventListener("click", function () {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var currentTime = `${hours}:${minutes} ${period}`;
    calculateSleepTimes(currentTime, "sleep");
  });

//check again for I want to wake up at...
document
  .getElementById("checkAgainButton")
  .addEventListener("click", function () {
    document.getElementById("results").innerHTML = "";
    document.getElementById("wakeUpHours").value = "";
    document.getElementById("wakeUpMinutes").value = "";
    document.getElementById("wakeUpPeriod").value = "AM";
  });

// check again for I plan to fall asleep at...
document
  .getElementById("checkAgainFallButton")
  .addEventListener("click", function () {
    document.getElementById("results").innerHTML = "";
    document.getElementById("bedtimeHours").value = "";
    document.getElementById("bedtimeMinutes").value = "";
    document.getElementById("bedtimePeriod").value = "AM";
  });
function calculateSleepTimes(time, type) {
  var timeParts = time.split(/[: ]/);
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var period = timeParts[2];

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  var sleepCycles = 6; // Recommended cycles (6 cycles * 90 minutes)
  var results = [];
  var wakeUpText =
    type === "wake"
      ? `If you want to wake up at ${time}, you should go to bed at:`
      : `You should try to wake up at one of the following times:`;
  results.push(wakeUpText);

  for (var i = 0; i < sleepCycles; i++) {
    if (type === "wake") {
      minutes -= 90;
      while (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
    } else {
      minutes += 90;
      while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    }

    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours += 24;
    }

    var formattedTime = formatTime(hours, minutes);
    var cycleText =
      type === "wake"
        ? `Sleep Cycle ${i + 1}: ${formattedTime}`
        : `${formattedTime} For ${i + 3} Cycles - ${
            ((i + 3) * 90) / 60
          } Hours of Sleep.`;
    results.push(cycleText);
  }

  resultsDiv.innerHTML = results.join("<br>");
}

function formatTime(hours, minutes) {
  var period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + period;
}
