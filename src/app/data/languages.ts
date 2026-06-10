export type CvLanguage = {
  nameKey: string;
  levelKey: string;
};

export const cvLanguages: readonly CvLanguage[] = [
  { nameKey: "lang.ro.name", levelKey: "lang.ro.level" },
  { nameKey: "lang.en.name", levelKey: "lang.en.level" },
];
