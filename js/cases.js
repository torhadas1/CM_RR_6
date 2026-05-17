document.getElementById('clearStorage').addEventListener('click', function () {
    // Temporarily store isLoggedIn
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    // Clear all items from local storage
    localStorage.clear();

    // Restore isLoggedIn
    localStorage.setItem('isLoggedIn', isLoggedIn);
    // Refresh the page
    window.location.href = "index.html";
});

// end analysis btn
// function showConfirmBox() {
//     // const journalData = $('#case_two').html();
//     // localStorage.setItem('8.Case 2', JSON.stringify(journalData));
  
//     document.getElementById("overlay").hidden = false;
//     $('.input_answer').each(function () {
//       const id = $(this).attr('id');
//       const value = $(this).val();
//       localStorage.setItem(id, value);
//     });
    // const selectedRadio = $('input[type=radio][name=case_3_radio]:checked');
    // const id = selectedRadio.attr('id');
    // const value = selectedRadio.val();
    // localStorage.setItem(id, value);
    
  // }