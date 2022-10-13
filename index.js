function reverseString(str) {
    var split = str.split("");
    var reverse = split.reverse();
    var reverseJoined = reverse.join("");
    return reverseJoined;
  }
  
  function isPalindrome(str) {
    var reverse = reverseString(str);
    return str === reverse;
  }
  
  function convertDatetoStr(date) {
    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getDateForAllFormat(date) {
    var dateStr = convertDatetoStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getDateForAllFormat(date);
  
    var result = false;
  
    for (var i = 0; i < listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        result = true;
        break;
      }
    }
    return result;
  }
  
  function leapYear(year) {
    if (year % 400 === 0 || year % 4 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    } else {
      return false;
    }
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (leapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    };
  }
  
  function nextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);
  
    while (1) {
      count++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [count, nextDate];
  }
  
  // function previousPalindromeDate(date) {
  // }
  
  // var date = {
  //   day: 28,
  //   month: 8,
  //   year: 2000
  // };
  
  var input = document.querySelector("#input-date");
  var showButton = document.querySelector("#show-button");
  var finalOutput = document.querySelector("#output");
  
  function clickHandler() {
    var bdayInput = input.value;
    // console.log(bdayInput)
  
    if (bdayInput !== "") {
      var listOfDate = bdayInput.split("-");
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
  
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if (isPalindrome) {
        finalOutput.innerText = "Yay!! Your Birthday Is Palindrome!!!";
      } else {
        var [count, nextDate] = nextPalindromeDate(date);
  
        finalOutput.innerText =
          "Your Birthday Is Not Palindrome. You missed it by " +
          count +
          " days. Next Date is " +
          nextDate.day +
          "/" +
          nextDate.month +
          "/" +
          nextDate.year;
      }
    }
  }
  
  showButton.addEventListener("click", clickHandler);
  
  // console.log(nextPalindromeDate(date));
  