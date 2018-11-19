/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification)
 */

var modal_content,
  modal_screen;

// Start Working ASAP.
$(document).ready(function () {
  av_legality_check();
});

// Make sure the prompt stays in the middle.
$(window).resize(function () {
  av_positionPrompt();
});

av_legality_check = function () {
  if ($.cookie('cc_legal') == "yes") {
    // Do nothing
  } else {
    av_showmodal();
  }
};

av_showmodal = function () {
  modal_screen = $('<div id="modal_screen"></div>');
  modal_content = $('<div id="modal_content" style="display:none"></div>');
  var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
  var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

  // Question Content
  //<img src="img/logo.png" class="age-logo">
  var content_heading = $('<h2>Age Verification</h2>');
  var content_buttons = $('<nav><ul><li><a href="#y" class="av_btn av_go" rel="yes">Confirm</a></li></ul></nav>');
  var content_text = $('<p>To visit this site, you must confirm that you are 21+ years old.</p>');

  modal_content_wrapper.append(content_heading, content_buttons, content_text);
  modal_content.append(modal_content_wrapper);

  // Append the prompt to the end of the document
  $('body').append(modal_screen, modal_content);

  // Center the box
  av_positionPrompt();

  modal_content.find('a.av_btn').on('click', av_setCookie);
};

av_setCookie = function (e) {
  e.preventDefault();

  var is_ca_legal = $(e.currentTarget).attr('rel');

  $.cookie('cc_legal', is_ca_legal, {
    expires: 60,
    path: '/'
  });

  if (is_ca_legal == "yes") {
    av_closeModal();
    $(window).off('resize');
  } else {
    av_showRegret();
  }
};

av_closeModal = function () {
  modal_content.fadeOut();
  modal_screen.fadeOut();
};

av_positionPrompt = function () {
  var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
  var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
  if (modal_content.css === null) {

  } else {
    modal_content.css({
      'top': top,
      'left': left
    });
  }


  if (modal_content.is(':hidden') && ($.cookie('cc_legal') != "yes")) {
    modal_content.fadeIn('slow')
  }
};