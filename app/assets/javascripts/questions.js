$(function () {

  function addQuestion(question) {
    var question_div = '#question_' + question.id;

    // $('#questions').append('<div id=question_' + question.id + '><a href=/questions/' + question.id + '>' + question.subject + '</div>');
    $('#questions').append('<div class=question_tab id=question_' + question.id + '>' + question.subject + '</div>');
    // $('#questions').append('<div class=question_tab id=question_1>' + question.subject + '</div>');
    // $(question_div).append('<div id=answer_' + question.id +'></div>');
  }

  function addAnswers(question) {
    $(question).append('<div id=answer_' + question.id +'></div>');
  }


  $('#questions').on('click', '.question_tab', function (){
    addAnswers(this);
  });

  $('#new_question').submit(function(e) {
    $.post('/api/v1/questions', $(this).serialize(), addQuestion);
    this.reset();
    e.preventDefault();
  });

  $.getJSON('/api/v1/questions', function(questions) {
    $.each(questions, function() { addQuestion(this) });
  });
    
});