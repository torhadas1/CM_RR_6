$(document).ready(function () {
  // Load case 2's OWN journal data (separate from investigation phase journal)
  if (localStorage.getItem('case2JournalData')) {
    const journalData = JSON.parse(localStorage.getItem('case2JournalData'));
    $('#case2_journal_container').html(journalData);
  }
  // Mark already-dropped items as afterDrag so they can't be re-dragged
  $(".draggable").each(function () {
    var elementId = $(this).attr('id');
    if (elementId && $('#case2_journal_container').find('#' + elementId).length > 0) {
      $(this).removeClass('draggable').addClass('afterDrag');
    }
  });

  // --- Timer ---
  var countDownDate;
  if (localStorage.getItem('countDownDate')) {
    countDownDate = parseInt(localStorage.getItem('countDownDate'));
  } else {
    countDownDate = new Date().getTime() + 35 * 60 * 1000;
  }
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    if (document.getElementById("count_down")) {
      document.getElementById("count_down").innerHTML = minutes + ":" + seconds;
    }
    if (distance < 0) {
      clearInterval(x);
      if (document.getElementById("count_down")) {
        document.getElementById("count_down").innerHTML = "Time's Up";
      }
    } else {
      localStorage.setItem('countDownDate', countDownDate);
    }
  }, 1000);
});

document.getElementById('clearStorage').addEventListener('click', function () {
  var isLoggedIn = localStorage.getItem('isLoggedIn');
  localStorage.clear();
  localStorage.setItem('isLoggedIn', isLoggedIn);
  window.location.href = "index.html";
});

function showConfirmBox() {
  // Save case 2 journal to its OWN localStorage key
  const journalData = $('#case2_journal_container').html();
  localStorage.setItem('case2JournalData', JSON.stringify(journalData));

  // Save each dropped item under a "Case 2 " prefix for test_review
  $('#case2_journal_container .sortable').each(function () {
    const title = $(this).find('.title').text() || $(this).data('title') || '';
    const value = $(this).find('.text-content').text() || $(this).clone().children().remove().end().text().trim();
    if (title) {
      localStorage.setItem('Case 2 ' + title, value);
    }
  });

  document.getElementById("overlay").hidden = false;
}

function closeConfirmBox() {
  document.getElementById("overlay").hidden = true;
}

function isConfirm(answer) {
  if (answer) {
    alert("Answer is yes");
  } else {
    closeConfirmBox();
  }
}

$(function () {
  // Draggable setup
  $(".draggable").draggable({
    cancel: ".title",
    helper: function () {
      return $(this).clone().css("z-index", 10).appendTo('body');
    },
    revert: function (valid) {
      if (!valid) {
        $(this).removeClass('afterDrag').addClass('draggable ui-draggable ui-draggable-handle');
        $(this).draggable('enable');
        return true;
      }
    },
    start: function (event, ui) {
      $(ui.helper).addClass('dragging');
      $(this).addClass('afterDrag').removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging');
      $(this).draggable('disable');
    },
    stop: function (event, ui) {
      $(ui.helper).removeClass('dragging');
    },
  });

  // Drop target = right_screen (case 2's journal)
  $(".right_screen").droppable({
    accept: ".draggable",
    tolerance: "pointer",
    drop: function (event, ui) {
      let newElem;
      if (ui.draggable.hasClass('draggable')) {
        newElem = $(ui.helper).clone(false);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.removeClass('draggable dragging');
        newElem.addClass('sortable');

        const title = ui.helper.data('title');
        const originalText = newElem.text().trim();

        newElem.empty()
          .append("<div class='title' contenteditable='true'>" + title + "</div>")
          .append("<div class='text-content'>" + originalText + "</div>")
          .append("<button class='remove'>X</button>");

        newElem.appendTo(this);
      } else if (ui.draggable.hasClass('sortable')) {
        newElem = $(ui.draggable);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-sortable-handle').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.appendTo(this);
      }
      $(this).sortable({ cancel: '.title' });
    }
  });

  $(document).on('click', '.remove', function () {
    var elementId = $(this).parent().parent().attr('id');
    if (elementId) {
      $('#' + elementId).removeClass('afterDrag ui-draggable-disabled').addClass('draggable');
      $('#' + elementId).draggable('enable');
    }
    $(this).parent().next('hr').remove();
    $(this).parent().parent().remove();
  });
});

$('#case2_journal_container').sortable({ cancel: '.title' });
