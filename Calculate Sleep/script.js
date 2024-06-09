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

document
  .getElementById("checkAgainButton")
  .addEventListener("click", function () {
    document.getElementById("results").innerHTML = "";
    document.getElementById("wakeUpHours").value = "";
    document.getElementById("wakeUpMinutes").value = "";
    document.getElementById("wakeUpPeriod").value = "AM";
  });

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

  var results = [];
  var sleepCycles = 6; // Number of sleep cycles to display

  var wakeUpText =
    type === "wake"
      ? `If you want to wake up at ${time}, you should go to bed at:`
      : `You should try to wake up at one of the following times:`;
  results.push(wakeUpText);

  for (var i = 1; i <= sleepCycles; i++) {
    var adjustedTime = new Date();
    adjustedTime.setHours(hours);
    adjustedTime.setMinutes(minutes);

    if (type === "wake") {
      adjustedTime.setMinutes(adjustedTime.getMinutes() - i * 90);
    } else {
      adjustedTime.setMinutes(adjustedTime.getMinutes() + i * 90);
    }

    var adjustedHours = adjustedTime.getHours();
    var adjustedMinutes = adjustedTime.getMinutes();
    var adjustedPeriod = adjustedHours >= 12 ? "PM" : "AM";

    adjustedHours = adjustedHours % 12;
    adjustedHours = adjustedHours ? adjustedHours : 12; // hour '0' should be '12'
    adjustedMinutes =
      adjustedMinutes < 10 ? "0" + adjustedMinutes : adjustedMinutes;

    var formattedTime = `${adjustedHours}:${adjustedMinutes} ${adjustedPeriod}`;
    var cycleText =
      type === "wake"
        ? `Sleep Cycle ${i}: ${formattedTime}`
        : `${formattedTime} For ${i} Cycles - ${(i * 1.5).toFixed(
            1
          )} Hours of Sleep.`;
    results.push(cycleText);
  }

  results.push(
    "<br>Remember to consider that you should be getting up at these designated times. Keep in mind that it takes the average person fourteen minutes to fully wake up, so adjust your plans accordingly!"
  );

  resultsDiv.innerHTML = results.join("<br>");
}

function formatTime(hours, minutes) {
  var period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + period;
}
