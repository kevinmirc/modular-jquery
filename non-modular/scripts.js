(function () {
  $.get('/people', function (data) {
    data.forEach(function (person) {
      $('#peopleModule').find('ul').append(`<\li>${person.name} - \$${parseFloat(person.amount)}</li>`);
    });
  });

  $.get('/code/non-modular', function (res) {
    $('#js-code-box').append(res.js);
  });
})();

$('#person-form').on('submit', function (e) {
  e.preventDefault();
  var name = $('#input-name').val()
  var amount = $('#input-amount').val()
  $.post("/people", { name: name, amount: amount }, function (person) {
    console.log(person)
    $('#peopleModule').find('ul').append(`<\li>${person.name} - \$${parseFloat(person.amount)}</li>`)
  });
  $('#peopleModule').find('input').val('');
});

// backslashes in list items are for your readability