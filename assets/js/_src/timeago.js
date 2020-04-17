/*
 * Caculate the Timeago
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2019 Cotes Chung
 * MIT Licensed
 */

$(function () {
  function timeago(date, isLastmod) {
    var now = new Date();
    var past = new Date(date);
    var seconds = Math.floor((now - past) / 1000);

    var year = Math.floor(seconds / 31536000);
    if (year >= 1) {
      return year + " ano" + (year > 1 ? "s" : "") + " atrás";
    }

    var month = Math.floor(seconds / 2592000);
    if (month >= 1) {
      if (month > 1) {
        return month + " meses atrás";
      }

      return " mês atrás";
    }

    var week = Math.floor(seconds / 604800);
    if (week >= 1) {
      return week + " semana" + (week > 1 ? "s" : "") + " atrás";
    }

    var day = Math.floor(seconds / 86400);
    if (day >= 1) {
      return day + " dia" + (day > 1 ? "s" : "") + " atrás";
    }

    var hour = Math.floor(seconds / 3600);
    if (hour >= 1) {
      return hour + " horas" + (hour > 1 ? "s" : "") + " atrás";
    }

    var minute = Math.floor(seconds / 60);
    if (minute >= 1) {
      return minute + " minutos" + (minute > 1 ? "s" : "") + " atrás";
    }

    return (isLastmod ? "just" : "Just") + " now";
  }

  function updateTimeago() {
    $(".timeago").each(function () {
      if ($(this).children("i").length > 0) {
        var isLastmod = $(this).hasClass("lastmod");
        var node = $(this).children("i");
        var date = node.text(); /* ISO Dates: 'YYYY-MM-DDTHH:MM:SSZ' */
        $(this).text(timeago(date, isLastmod));
        $(this).append(node);
      }
    });

    if (vote == 0 && intervalId != undefined) {
      clearInterval(intervalId); /* stop interval */
    }
    return vote;
  }

  var vote = $(".timeago").length;
  if (vote == 0) {
    return;
  }

  if (updateTimeago() > 0) {
    /* run immediately */
    vote = $(".timeago").length; /* resume */
    var intervalId = setInterval(updateTimeago, 60000); /* loop every minutes */
  }
});
