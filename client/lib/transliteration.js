// License MIT © Aleksandr Filatov alfilatov.com
// Source: https://github.com/greybax/cyrillic-to-translit-js/blob/master/CyrillicToTranslit.js
const invert = require('lodash.invert');

const _firstLetters = {
  "а": "a", "б": "b", "в": "v", "д": "d", "з": "z", "й": "y", "к": "k", "л": "l", "м": "m",
  "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "г": "h", "ґ": "g",
  "е": "e", "и": "y", "і": "i"
}

const _reversedFirstLetters = Object.assign(invert(_firstLetters), { "": "" })

const _initialDigraphs = { "є": "ye", "ї": "yi" }

const _regularDigraphs = {
  "ж": "zh", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", 
  "щ": "shch", "ь": "bb", "ю": "yu", "я": "ya", "'": "yy"
}

const _firstDigraphs = Object.assign({}, _regularDigraphs, _initialDigraphs)

const _reversedFirstDigraphs = Object.assign(invert(_firstDigraphs))

const _firstAssociations = Object.assign(_firstLetters, _firstDigraphs)

const _nonFirstLetters = Object.assign({}, _firstLetters, { "й": "i" })
Object.assign(_nonFirstLetters, { "ї": "i" })

let _reversedNonFirstLetters = Object.assign(invert(_firstLetters), { "": "" })

let _nonInitialDigraphs = {
  "є": "ie",
  "ю": "iu",
  "я": "ia",
}

const _nonFirstDigraphs = Object.assign(_regularDigraphs, _nonInitialDigraphs);

const _reversedNonFirstDigraphs = Object.assign(invert(_nonFirstDigraphs));

const _nonFirstAssociations = Object.assign(_nonFirstLetters, _nonFirstDigraphs);


export function transform(input) {
  if (!input) {
    return "";
  }

  const normalizedInput = input.normalize();

  let newStr = "";
  let isWordBoundary = false;

  for (let i = 0; i < normalizedInput.length; i++) {
    const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
    let strLowerCase = normalizedInput[i].toLowerCase();

    if (strLowerCase === " ") {
      newStr += "_";
      isWordBoundary = true;
      continue;
    }

    let newLetter;

    if (normalizedInput.slice(i - 1, i + 1).toLowerCase() === "зг") {
      newLetter = "gh";
    } else if (i === 0 || isWordBoundary) {
      newLetter = _firstAssociations[strLowerCase];
      isWordBoundary = false;
    } else {
      newLetter = _nonFirstAssociations[strLowerCase];
    }

    if ("undefined" === typeof newLetter) {
      newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
    } else if (isUpperCaseOrWhatever) {
      // handle multi-symbol letters
      newLetter.length > 1
        ? newStr += newLetter[0].toUpperCase() + newLetter.slice(1)
        : newStr += newLetter.toUpperCase();
    } else {
      newStr += newLetter;
    }
  }
  return newStr;
}

export function reverse(input) {

  if (!input) return "";

  const normalizedInput = input.normalize();

  let newStr = "";
  let isWordBoundary = false;
  let i = 0;

  while (i < normalizedInput.length) {
    const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
    let strLowerCase = normalizedInput[i].toLowerCase();
    let currentIndex = i;

    if (strLowerCase === "_") {
      newStr += " ";
      isWordBoundary = true;
      i++;
      continue;
    }

    let newLetter;

    let digraph = normalizedInput.slice(i, i + 2).toLowerCase();
    if (i === 0 || isWordBoundary) {
      newLetter = _reversedFirstDigraphs[digraph];
      if (newLetter) {
        i += 2;
      } else {
        newLetter = _reversedFirstLetters[strLowerCase];
        i++;
      }
      isWordBoundary = false;
    } else {
      newLetter = _reversedNonFirstDigraphs[digraph];
      if (newLetter) {
        i += 2;
      } else {
        newLetter = _reversedNonFirstLetters[strLowerCase];
        i++;
      }
    }

    // special cases: щ and зг
    if (normalizedInput.slice(currentIndex, currentIndex + 4).toLowerCase() === "shch") {
      newLetter = "щ";
      i = currentIndex + 4;
    } else if (normalizedInput.slice(currentIndex - 1, currentIndex + 2).toLowerCase() === "zgh") {
      newLetter = "г";
      i = currentIndex + 2;
    }

    if ("undefined" === typeof newLetter) {
      newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
    }
    else {
      if (isUpperCaseOrWhatever) {
        // handle multi-symbol letters
        newLetter.length > 1
          ? newStr += newLetter[0].toUpperCase() + newLetter.slice(1)
          : newStr += newLetter.toUpperCase();
      } else {
        newStr += newLetter;
      }
    }
  }

  return newStr;
}