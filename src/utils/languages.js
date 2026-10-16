// App languages, mirroring the backend's utils/languages.js. A user's
// `language` is one of these codes, or empty when they never picked one.
export const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
];

export const languageName = (code) => {
  const l = LANGUAGES.find((x) => x.code === code);
  return l ? (l.native === l.name ? l.name : `${l.name} (${l.native})`) : "";
};
