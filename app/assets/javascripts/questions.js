$(function () {

  function addQuestion(question) {
    // var question_div = '#q' + question.id;
    var question_div = $('#questions');
    // var height = question_div.height();
    // console.log(height);
    // console.log(question_div.css('height'))

    question_div.append('<div class="question_tab question_btn question_btn_raise" id=q' + question.id + '>' + question.subject + '</div>');
    // question_div.height(height + 33);

  }

  function addAnswers(question) {
    removeAllAnswers();

    var answer_div = $('#answers');

    answer_div.removeClass('bounceOutRight animated')
    answer_div.addClass('bounceInRight animated');

    $(question).addClass('selected');

    answer_div.append('<div id="question_title"><span>' + $(question).text() + '</span></div>')
    answer_div.append('<ul class=answer_tab id=answer_' + question.id +'></ul>');
    answer_div.append('<form id="new_answer"></form>');

    var question_id = question.id.slice(1, question.id.length);

    $('#new_answer')
      .append('<input type="text", name="answer[content]" id="answer_content">')
      .append('<input type="hidden" name="answer[question_id]" value=' + question_id + '>')
      .append('<input type="submit" id="answer_submit" value="Commenter">');
  

    answer_div.appendTo("body");
  }

  function removeAllAnswers() {
    $('#new_answer').remove();
    $('#question_title').remove();
    $('.answer_tab').remove();
    $('.question_tab').removeClass('selected');
  }

  function addSpecificAnswer(answer) {
    question_id = '#answer_q' + answer.question_id;
    $(question_id).append('<li>' + answer.content + '<span> écrit le ' + answer.created_at + '</span></li>');
  }

  function get_question_id(question_div_id) {
    return question_div_id.slice(1, question_div_id.length);
  }

  $('#container_logo').addClass('swing animated');
  $('#questions').addClass('fadeInUpBig animated');
  $('#new_question_tab').addClass('bounceInRight animated');

  $('#answers').on('submit', '#new_answer', function(e) {
    $.post('/api/v1/answers', $(this).serialize(), addSpecificAnswer);
    this.reset();
    e.preventDefault();
  });

  $('#questions').on('click', '.question_tab', function (){
    answer_id = $('#answer_' + this.id);
    answer_div = $('#answers');
    // if (!$(answer_id).length) {
    if (!answer_id.length || answer_div.hasClass('bounceOutRight')) {

      $('#new_question_tab').addClass('bounceOutRight animated');
      // $('#new_question_tab').height(0);
      $('#new_question_tab').hide();

      addAnswers(this);

      var question_id = get_question_id(this.id);

      // Add the specific answer
      $.getJSON('/api/v1/specific_answer/' + question_id, function(answers) {
        console.log(answers);
        $.each(answers, function() { console.log(this); addSpecificAnswer(this) });
      }); 
    }
    else {
      $('#answers').removeClass('bounceInRight animated');
      $('#answers').addClass('bounceOutRight animated');

      $('.question_tab').removeClass('selected');

      $('#new_question_tab').removeClass('bounceOutRight animated');
      $('#new_question_tab').addClass('bounceInRight animated');
      $('#new_question_tab').show();

      // removeAllAnswers();
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