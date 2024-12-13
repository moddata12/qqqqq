// Define a function to convert UTC date strings to Indian Standard Time format
function convertToIndianTime(utcDateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Indian Standard Time
  };

  const date = new Date(utcDateString);
  const indianTime = date.toLocaleString("en-IN", options);
  return indianTime;
}

module.exports = {
  convertToIndianTime,
};
