// 0 	Clear sky
// 1, 2, 3 	Mainly clear, partly cloudy, and overcast
// 45, 48 	Fog and depositing rime fog
// 51, 53, 55 	Drizzle: Light, moderate, and dense intensity
// 56, 57 	Freezing Drizzle: Light and dense intensity
// 61, 63, 65 	Rain: Slight, moderate and heavy intensity
// 66, 67 	Freezing Rain: Light and heavy intensity
// 71, 73, 75 	Snow fall: Slight, moderate, and heavy intensity
// 77 	Snow grains
// 80, 81, 82 	Rain showers: Slight, moderate, and violent
// 85, 86 	Snow showers slight and heavy
// 95 * 	Thunderstorm: Slight or moderate
// 96, 99 * 	Thunderstorm with slight and heavy hail

export const weatherCodes = {
  0: "🌞 Clear Sky",
  1: "🌤 Mainly Clear",
  2: "🌤  Partly Cloudy",
  3: "🌥 Overcast",
  45: "🌫 Fog",
  48: "🌫 Depositing Rime Fog",
  51: "⛈ Drizzle Light",
  53: "⛈ Drizzle Moderate",
  55: "⛈ Drizzle Dense Intensity",
  56: "❄ Freezing Drizzle",
  57: "❄ Freezing Drizzle Intensity",
  61: "🌧 Rain Slight",
  63: "🌧 Rain Moderate",
  65: "🌧 Rain Intensity",
  66: "❄ Freezing Rain Light",
  67: "❄ Freezing Raing Heavy",
  71: "❄ Snow Fall Slight",
  73: "❄ Snow Fall Moderate",
  75: "❄ Snow Fall Heavy Intensity",
  77: "❄ Snow Grains",
  80: "🌧 Rain showers Slight",
  81: "🌧 Rain showers Moderate",
  82: "🌧 Rain showers Violent",
  85: "❄ Snow showers Slight",
  86: "❄ Snow showers Heavy",
  95: "⚡ ThunderStorm Slight",
  96: "⚡ ThunderStorm with Slight and Heavy hall",
};
