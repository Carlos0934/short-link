const TIME_UNITS = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
};

function formatTimeAgo(date: Date) {
  const now = new Date();

  Intl.RelativeTimeFormat.supportedLocalesOf("en", {
    style: "narrow",
  });

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  for (const [unit, secondsPerUnit] of Object.entries(TIME_UNITS)) {
    const value = Math.floor(seconds / secondsPerUnit);
    if (value >= 1) {
      return new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
      }).format(-value, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
}

export default formatTimeAgo;
