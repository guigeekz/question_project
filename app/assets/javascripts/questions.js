$(function () {

  function addQuestion(question) {
    var question_div = $('#questions');

    question_id = 'q' + question.id

    question_div.append('<div class="question_tab question_btn question_btn_raise fadeInUpBig animated" id=' + question_id + '>' + question.subject + '</div>');
    if (question.is_own == true) {
      $('#' + question_id).attr('data-own', true);
    }

  }

  function addAnswers(question) {
    removeAllAnswers();

    var answer_div = $('#answers');

    answer_div.removeClass('bounceOutRight animated')
    answer_div.addClass('bounceInRight animated');

    $(question).addClass('selected');

    answer_div.append('<div id="question_title"><span id="question_subject">' + $(question).text() + '</span></div>')
    // answer_div.append('<div id="question_date"></div>');
    answer_div.append('<div id="answer_tab"><ul class=answer_tab id=answer_' + question.id +'></ul></div>');
    answer_div.append('<form id="new_answer"></form>');

    var question_id = question.id.slice(1, question.id.length);

    $('#new_answer')
      .append('<input type="text", name="answer[content]" id="answer_content">')
      .append('<input type="hidden" name="answer[question_id]" value=' + question_id + '>')
      .append('<input type="submit" id="answer_submit" value="Répondre">');

    answer_div.append('<div id="question_info"><span id="question_view">8 vues</span><span id="question_date">21/12/12</span></div>');

    /* add edit question */
    if ($(question).attr('data-own')) {
      $('#question_title').append('<span><img class="edit_question" data-question=' + question_id + ' src="/assets/edit_question.png"alt="edit" /></span>');
      $('#question_title').append('<span><img class="delete_question" data-question=' + question_id + ' src="/assets/delete_question.png"alt="edit" /></span>');
    } 
    else {
      /* add new view if this is not my question */
      $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/v1/new_view/' + question_id,
        contentType: 'application/json',
      }).done(function(question) {
        //nothing
      });
    }

    answer_div.appendTo("body");
  }

  function searchQuestionTab(questions) {
    for(var question_id in questions) {
      console.log("question_id : " + questions[question_id].id);
      question_id = '#q' + questions[question_id].id;
      $(question_id).remove();
    }
  }

  function swapInputQuestion(question) {
    question_input = '#input_question_' + question.id
    question_id = 'question_subject';

    $(question_input).replaceWith('<span class="zoomIn animated question_content" id=' + question_id + '>' + question.subject + '</span>');
  }

  function swapInputAnswer(answer) {
    answer_input = '#input_answer_' + answer.id
    answer_date_id = '#answer_date_' + answer.id;
    answer_id = 'edit_answer_' + answer.id;

    $(answer_input).replaceWith('<span class="zoomIn animated answer_content" id=' + answer_id + '>' + answer.content + '</span>');
    $(answer_date_id).text(answer.updated_at);
    $(answer_date_id).addClass('zoomIn animated');
  }

  function removeAllAnswers() {
    $('#new_answer').remove();
    $('#question_title').remove();
    $('#question_info').remove();
    $('.answer_tab').remove();
    $('.question_tab').removeClass('selected');
  }

  function addSpecificAnswer(answer) {
    question_id = '#answer_q' + answer.question_id;
    answer_id = 'answer_' + answer.id;
    answer_edit_id = 'edit_answer_' + answer.id;
    answer_date_id = 'answer_date_' + answer.id;
    line = '<li id=' + answer_id + '><span id=' + answer_edit_id + ' class="answer_content">' + answer.content + '</span><span> ' + answer.user + '</span> <span id='+ answer_date_id +'>' + answer.created_at + '</span>';
    if (answer.is_own == true) {
      line += ' <span><img class="edit_answer" data-answer=' + answer.id + ' src="/assets/edit.png" alt="edit" /></span>';
      line += '<span><img class="delete_answer" data-answer='+ answer.id + ' src="/assets/delete.png" alt="delete"/></span>';
    }
    line += '</li>';
    $(question_id).append(line);
  }

  function postNewAnswer(answer) {
    question_id = '#answer_q' + answer.question_id;
    answer_id = 'answer_' + answer.id;
    answer_edit_id = 'edit_answer_' + answer.id;
    answer_date_id = 'answer_date_' + answer.id;
    line = '<li id=' + answer_id + '><span class="fadeInUp animated answer_content" id=' + answer_edit_id + ' >' + answer.content + '</span><span> ' + answer.user + '</span> <span id='+ answer_date_id +'>' + answer.created_at + '</span>';
    line += ' <span><img class="edit_answer" data-answer=' + answer.id + ' src="/assets/edit.png"alt="edit" /></span>'
    line += '<span><img class="delete_answer" data-answer='+ answer.id + ' src="/assets/delete.png" alt="delete"/></span></li>';
    // $(question_id).append('<li class="fadeInUp animated">' + answer.content + '<span> ' + answer.user + ' ' + answer.created_at + '</span></li>');    
    $(question_id).append(line);
  }

  function swapToNewQuestion() {
    answer_block = $('#answers');
    new_question_block = $('#new_question_tab');

    answer_block.removeClass('bounceInRight animated');
    answer_block.addClass('bounceOutRight animated');

    $('.question_tab').removeClass('selected');

    new_question_block.removeClass('bounceOutRight animated');
    new_question_block.addClass('bounceInRight animated');
    new_question_block.show();
  }

  function get_question_id(question_div_id) {
    return question_div_id.slice(1, question_div_id.length);
  }

  $('#container_logo').addClass('swing animated');
  $('#new_question_tab').addClass('bounceInRight animated');

  $('#answers').on('submit', '#new_answer', function(e) {
    $.post('/api/v1/answers', $(this).serialize(), postNewAnswer);
    this.reset();
    e.preventDefault();
  });

  /**********************
  * click on a question *
  **********************/

  $('#questions').on('click', '.question_tab', function (){
    answer_id = $('#answer_' + this.id);
    answer_div = $('#answers');
    // if (!$(answer_id).length) {
    if (!answer_id.length || answer_div.hasClass('bounceOutRight')) {

      $('#new_question_tab').addClass('bounceOutRight animated');
      // $('#new_question_tab').height(0);
      $('#new_question_tab').hide();

      var question_id = get_question_id(this.id);

      addAnswers(this);

      $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/v1/questions/' + question_id,
        contentType: 'application/json',
      }).done(function(question) {
        $('#question_date').text(question.created_at);
        $('#question_view').text(question.nb_view + " vues");
      });


      // Add the specific answer
      $.getJSON('/api/v1/specific_answer/' + question_id, function(answers) {
        // console.log(answers);
        $.each(answers, function() { addSpecificAnswer(this) });
      }); 
    }
    else {
      swapToNewQuestion();
    }

  });

  /******************
  * search question *
  ******************/
  $('#question_search').on('input', function() {
    var reg = new RegExp("[ ,;]+", "g");
    var search = $(this).val();
    var searchwords = $.trim(search.toLowerCase()).split(reg);
    var nbrwords = searchwords.length;
    
    $('.question_tab').each(function(){
      var wList = [];
      
      for(var i=0;i<nbrwords;i++)
      {
        var w = searchwords[i];
        var html = $(this).html().toLowerCase();
        if(html.indexOf(w) !== -1)
        {
          if($.inArray(w,wList) === -1){
            wList.push(w);
          }
        }
        
        if(wList.length === nbrwords){
          $(this).removeClass("hidden_word");
        }
        else{
          $(this).addClass("hidden_word");
        }
      }
    });
  });

  /****************
  * edit question *
  ****************/
  $('#answers').on('click', '.edit_question', function() {
    question_id = $(this).attr('data-question');
    question_span = '#question_subject';
    input_id = 'input_question_' + question_id;
    $(question_span).replaceWith('<input class="fadeIn animated input_question" name="question[subject]" id=' + input_id + ' data-question=' + question_id + ' type="text" value="' + $(question_span).html() + '"/>');

  });

  $('#answers').on('keypress', '.input_question', function (event) {
    if(event.keyCode == 13)
      {
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: '/api/v1/questions/' + $(this).attr('data-question'),
            contentType: 'application/json',
            data: JSON.stringify({ question:{subject: $(this).val() }, _method:'put' })
        }).done(function( question )
        {
          swapInputQuestion(question);
        });
      }
  });  

  
  /**************
  * edit answer *
  ***************/

  $('#answers').on('click', '.edit_answer', function() {
    answer_id = $(this).attr('data-answer');
    answer_span = '#edit_answer_' + answer_id;
    input_id = 'input_answer_' + answer_id;
    $(answer_span).replaceWith('<input class="fadeIn animated input_answer" name="answer[content]" id=' + input_id + ' data-answer=' + answer_id + ' type="text" value="' + $(answer_span).html() + '"/>');
  });

  $('#answers').on('keypress', '.input_answer', function (event) {
    if(event.keyCode == 13)
      {
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: '/api/v1/answers/' + $(this).attr('data-answer'),
            contentType: 'application/json',
            data: JSON.stringify({ answer:{content: $(this).val() }, _method:'put' })
        }).done(function( answer )
        {
            swapInputAnswer(answer);
        });
      }
  });

  /****************
  * Delete answer *
  ****************/

  $('#answers').on('click', '.delete_answer', function() {
    if (confirm('Etes-vous sûr de vouloir supprimer la réponse?')) {
      answer_id = $(this).attr('data-answer');
      $.ajax({
        type: 'Delete',
        dataType: 'json',
        url: '/api/v1/answers/' + answer_id,
        contentType: 'application/json',
      }).done(function() {
        answer = '#answer_' + answer_id;
        $(answer).remove();
      });      
    }
  });

  /****************
  * Delete answer *
  ****************/
  $('#answers').on('click', '.delete_question', function() {
    if (confirm('Etes-vous sûr de vouloir supprimer la question')) {
      question_id = $(this).attr('data-question');
      $.ajax({
        type: 'Delete',
        dataType: 'json',
        url: '/api/v1/questions/' + question_id,
        contentType: 'application/json',
      }).done(function() {
        $('#q' + question_id).remove();
        swapToNewQuestion();
      });      
    }
  });

  /***************
  * New question *
  ***************/

  $('#new_question').submit(function(e) {
    $.post('/api/v1/questions', $(this).serialize(), addQuestion);
    this.reset();
    e.preventDefault();
  });



  /********************
  * Get all questions *
  ********************/

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/api/v1/questions/',
    contentType: 'application/json',
  }).done(function(questions) {
    $.each(questions, function() { addQuestion(this) });
  });      

    
});