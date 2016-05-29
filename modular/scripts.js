(function () {
  var people = {
    init: function() {
      this.renderPeople();
      this.cacheDom();
      this.bindEvents();
      this.renderCode();
    },
    renderPeople: function () {
      var _that = this;
      $.get('/people').done(function (people) {
        people.forEach(function (person) {
          _that.renderPerson(person);
        });
      });
    },
    cacheDom: function() {
      this.$el = $('#peopleModule');
      this.$nameInput = $('#input-name');
      this.$amountInput = $('#input-amount');
      this.$personForm = $('#person-form');
      this.$personList = this.$el.find('ul');
    },
    bindEvents: function() {
      var _that = this;
      this.$personForm.on('submit', function (e) {
        e.preventDefault();
        _that.createPerson();
      });
    },
    renderPerson: function (person) {
      this.$personList.append(`<\li>${person.name} - \$${parseFloat(person.amount)}</li>`);
    },
    createPerson: function() {
      var name = this.$nameInput.val();
      var amount = this.$amountInput.val();
      var _that = this;

      $.post('/people', {name: name, amount: amount})
      .done(function (person) {
        console.log(person);
        _that.renderPerson(person);
      });

      this.$nameInput.val("");
      this.$amountInput.val("");
    },
    renderCode: function () {
      $.get('/code/modular', function (res) {
        $('#js-code-box').append(res.js);
      });
    }
  }
  people.init();
})();

