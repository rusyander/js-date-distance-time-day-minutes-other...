const rtf = new Intl.RelativeTimeFormat("ru", {
  numeric: "auto",
  style: "long",
  localeMatcher: "best fit",
});

console.log(rtf.format(2, "day"));
console.log(rtf.format(1, "month"));
console.log(rtf.format(1, "year"));
console.log(rtf.format(1, "hour"));
console.log(rtf.format(1, "minute"));
// ------------------------

function getRelativeTimeString(
  // date: Date | number, -------  TS only
  date,
  lang = navigator.language
) {
  const timeMs = typeof date === "number" ? date : date.getTime(); // получаем время в милисекундах
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000); // получаем разницу в секундах с тем временим то что у нас сейчас - может как положителяная так и отрицательная
  const cutoffa = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ]; // представляет собой минуту, час, день, неделю, месяц, год и бесконечность
  // const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"]    -------  TS only
  const units = ["second", "minute", "hour", "day", "week", "month", "year"]; // представляет собой секунду, минуту, час, день, неделю, месяц, год

  const unitIndex = cutoffa.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  ); // находим индекс в массиве cutoffa который больше чем разница в секундах
  const divisor = unitIndex ? cutoffa[unitIndex - 1] : 1; // если индекс не равен 0 то берем предыдущий элемент иначе 1
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" }); // создаем объект Intl.RelativeTimeFormat

  return rtf.format(
    Math.floor(deltaSeconds / divisor), // округляем до целого числа
    units[unitIndex - 1].replace(/s$/, "") // берем предыдущий элемент и убираем с него s
  ); // возвращаем строку с помощью метода format
}

console.log(getRelativeTimeString(new Date("2023-01-28T13:38:04"), "ru"));

// все тоже самое что и выше только с помощью библиотеки date-fns

// import { intlFormatDistance } from "date-fns";

// console.log(
//   intlFormatDistance(new Date("2023-01-28T13:38:04"), new Date(), {
//     locale: "ru",
//   })
// ); // 1 - дата с который мы работаем   2 - дата относительно которой мы деланм проверку   3 - язык на котором будет писаться
