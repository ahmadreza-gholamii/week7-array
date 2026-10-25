const DEFAULT_NUMBERS = [5, 12, 8, 130, 44];
const elements = {
  arrayForm: document.querySelector("#arrayForm"),
  arrayInput: document.querySelector("#arrayInput"),
  arrayError: document.querySelector("#arrayError"),
  numbers: document.querySelector("#numbers"),
  sortedReverse: document.querySelector("#sortedReverse"),
  lessThan30: document.querySelector("#lessThan30"),
  sum: document.querySelector("#sum"),
  stringNumbers: document.querySelector("#stringNumbers"),
  subtractedByIndex: document.querySelector("#subtractedByIndex"),
  dateForm: document.querySelector("#dateForm"),
  dateInput: document.querySelector("#dateInput"),
  dateError: document.querySelector("#dateError"),
  todaySample: document.querySelector("#todaySample"),
  selectedDate: document.querySelector("#selectedDate"),
  selectedWeekday: document.querySelector("#selectedWeekday"),
  randomForm: document.querySelector("#randomForm"),
  minInput: document.querySelector("#minInput"),
  maxInput: document.querySelector("#maxInput"),
  randomError: document.querySelector("#randomError"),
  randomNumber: document.querySelector("#randomNumber"),
  randomRange: document.querySelector("#randomRange"),
};
function setText(element, value) {
  element.textContent = value;
}
function formatArray(array) {
  return array.join(", ");
}
function parseNumbers(value) {
  const normalizedValue = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .trim();
  if (!normalizedValue) {
    return {
      numbers: null,
      error: "لطفاً حداقل ۲ عدد وارد کن.",
    };
  }
  const parts = normalizedValue.split(/[\s,،و]+/).filter(Boolean);
  if (parts.length < 2) {
    return {
      numbers: null,
      error: "لطفاً حداقل ۲ عدد وارد کن.",
    };
  }
  if (parts.some((part) => !/^\d+$/.test(part))) {
    return {
      numbers: null,
      error:
        "لطفاً فقط عدد وارد کن و برای جدا کردن اعداد از Space یا کاما استفاده کن.",
    };
  }
  const numbers = parts.map(Number);
  if (numbers.some((number) => !Number.isSafeInteger(number))) {
    return {
      numbers: null,
      error: "یکی از اعداد واردشده معتبر نیست.",
    };
  }
  return {
    numbers,
    error: "",
  };
}
function calculateArrayResults(numbers) {
  const sortedReverse = numbers.toSorted((a, b) => b - a);
  const lessThan30 = numbers.filter((items) => items < 30);
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const stringNumbers = numbers.map((items) => items.toString());
  const subtractedByIndex = numbers.map((items, index) => items - index);
  return {
    sortedReverse,
    lessThan30,
    sum,
    stringNumbers,
    subtractedByIndex,
  };
}
function displayArrayResults(numbers) {
  const results = calculateArrayResults(numbers);
  setText(elements.numbers, formatArray(numbers));
  setText(elements.sortedReverse, formatArray(results.sortedReverse));
  setText(elements.lessThan30, formatArray(results.lessThan30));
  setText(elements.sum, results.sum);
  setText(elements.stringNumbers, formatArray(results.stringNumbers));
  setText(elements.subtractedByIndex, formatArray(results.subtractedByIndex));
}
function displayArrayError(message = "") {
  setText(elements.arrayError, message);
}
elements.arrayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = parseNumbers(arrayInput.value);
  if (!result.numbers) {
    displayArrayError(result.error);
    return;
  }
  displayArrayError();
  displayArrayResults(result.numbers);
});
function getWeekday(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}
function parseDateInput(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function displayDateResult(value) {
  if (!value) {
    return;
  }
  const date = parseDateInput(value);
  setText(elements.selectedDate, value);
  setText(elements.selectedWeekday, getWeekday(date));
}
function displayDateError(message = "") {
  setText(elements.dateError, message);
}
function setDateValue(value) {
  elements.dateInput.value = value;
  displayDateError();
  displayDateResult(value);
}
function getTodayDate() {
  return formatDateInput(new Date());
}
elements.dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = elements.dateInput.value;
  if (!value) {
    displayDateError("لطفاً یک تاریخ انتخاب کن.");
    return;
  }
  displayDateError();
  displayDateResult(value);
});
document.querySelectorAll(".sample-date").forEach((button) => {
  button.addEventListener("click", () => {
    const value =
      button.dataset.date === "today" ? getTodayDate() : button.dataset.date;
    setDateValue(value);
  });
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function displayRandomError(message = "") {
  setText(elements.randomError, message);
}
function generateRandomNumber(min, max) {
  const randomNumber = getRandomInt(min, max);
  setText(elements.randomNumber, randomNumber);
  setText(elements.randomRange, `بازه: ${min} تا ${max}`);
}
elements.randomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const minValue = elements.minInput.value.trim();
  const maxValue = elements.maxInput.value.trim();
  const min = Number(minValue);
  const max = Number(maxValue);
  if (minValue === "" || maxValue === "") {
    displayRandomError("لطفاً مقدار Min و Max را وارد کن.");
    return;
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    displayRandomError("Min و Max باید عدد صحیح باشند.");
    return;
  }
  if (min > max) {
    displayRandomError("مقدار Min نباید از Max بزرگ‌تر باشد.");
    return;
  }
  displayRandomError();
  generateRandomNumber(min, max);
});
function initialize() {
  displayArrayResults([...DEFAULT_NUMBERS]);
  const today = getTodayDate();
  setText(elements.todaySample, today);
  setDateValue(today);
  elements.minInput.value = 1;
  elements.maxInput.value = 10;
  generateRandomNumber(1, 10);
}
initialize();
