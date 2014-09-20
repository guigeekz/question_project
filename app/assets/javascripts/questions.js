$(function () {

  function addQuestion(question) {
    var question_div = '#question_' + question.id;

    $('#questions').append('<div id=question_' + question.id + '><a href=/questions/' + question.id + '>' + question.subject + '</div>');
    $(question_div).append('<div id=answer_' + question.id +'></div>');
  }

  $('#new_question').submit(function(e) {
    $.post('/questions.json', $(this).serialize(), addQuestion);
    this.reset();
    e.preventDefault();
  });

  $.getJSON('/questions.json', function(questions) {
    $.each(questions, function() { addQuestion(this) });
  });
    
});