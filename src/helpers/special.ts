type MonthDate = `${number}${number}-${number}${number}`;
interface SpecialDate {
  date: MonthDate;
  name: string;
  color: string;
  message: string;
}
export const SPECIAL_DATES: SpecialDate[] = [
  {
    date: "02-14",
    name: "valentines",
    color: "#FF69B4",
    message: "♡ Happy Valentines ♡ from Necitero ♡",
  },
  {
    date: "03-08",
    name: "womans-day",
    color: "#46296E",
    message: "Happy woman's day ♡ from Necitero",
  },

  {
    date: "05-17",
    name: "birthday",
    color: "#212121",
    message: "Happy Birthday, Necitero!",
  },
  {
    date: "10-31",
    name: "halloween",
    color: "#CC5500",
    message: "Spoooooky greetings from Necitero",
  },
  {
    date: "12-24",
    name: "christmas",
    color: "#056608",
    message: "Merry Christmas from Necitero!",
  },
];

export const getCurrentDate = (): MonthDate => {
  const date = new Date();
  const splits = date.toISOString().split("T")[0].split("-");
  return `${splits[1]}-${splits[2]}` as MonthDate;
};

export const getSpecialDate = (date: MonthDate) => {
  return SPECIAL_DATES.find((DAY) => DAY.date === date);
};
