$(function () {

  function addQuestion(question) {
    var question_div = '#q' + question.id;

    $('#questions').append('<div class=question_tab id=q' + question.id + '><b>' + question.subject + '</b></div>');

  }

  function addAnswers(question) {

    $(question).append('<ul class=answer_tab id=answer_' + question.id +'></ul>');

    $(question).append('<form id="new_answer"></form>');

    var question_id = question.id.slice(1, question.id.length);

    $('#new_answer')
      .append('<input type="text", name="answer[content]" id="answer_content">')
      .append('<input type="hidden" name="answer[question_id]" value=' + question_id + '>')
      .append('<input type="submit" value="Ajouter">');
  }

  function removeAllAnswers() {
    $('#new_answer').remove();
    $('.answer_tab').remove();
  }

  function addSpecificAnswer(answer) {
    question_id = '#answer_q' + answer.question_id;
    $(question_id).append('<li>' + answer.content + '</li>');
  }

  function get_question_id(question_div_id) {
    return question_div_id.slice(1, question_div_id.length);
  }

  $('#questions').on('submit', '#new_answer', function(e) {
    console.log(this);
    $.post('/api/v1/answers', $(this).serialize(), addSpecificAnswer);
    this.reset();
    e.preventDefault();
  });

  $('#questions').on('click', '.question_tab', function (){
    answer_id = '#answer_' + this.id;
    if (!$(answer_id).length) {
      removeAllAnswers();
      addAnswers(this);

      var question_id = get_question_id(this.id);

      // Add the specific answer
      $.getJSON('/api/v1/specific_answer/' + question_id, function(answers) {
        $.each(answers, function() { addSpecificAnswer(this) });
      });
    }

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