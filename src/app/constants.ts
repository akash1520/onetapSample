//Valorant Game Events
//@see Please read the overwolf.games.events documentation page to learn how to use Overwolf game events.

//Valorant Game Features
//@see https://overwolf.github.io/docs/api/overwolf-games-events-Valorant
export const REQUIRED_FEATURES_VALORANT = [
  "gep_internal",
  "game_info",
  "match_info",
  "kill",
  "me",
  "death",
];

export const REQUIRED_FEATURES_ROCKET_LEAGUE = [
  "gep_internal",
  "stats",
  "match",
  "roster",
  "me",
  "match_info",
  "death",
  "game_info",
  "training",
];

// register gep events
export const REGISTER_RETRY_TIMEOUT = 10000;

//same name in the public/app/manifest.json  "windows"
export const WINDOW_NAMES = {
  BACKGROUND: "background",
  SETTINGS: "settings",
  DEVELOPMENT: "development",
  INGAME: "in_game",
  DESKTOP: "desktop",
};

//overwolf-hooks logs
export const OVERWOLF_HOOKS_OPTIONS = {
  displayLog: process.env.NODE_ENV === "production",
};
