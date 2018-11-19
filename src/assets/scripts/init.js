$(function () {

  $('.contents').addClass('fade-contents-in');

  $("nav a").on("click", function (event) {

    event.preventDefault()
    const href = $(this).attr("href")
    window.history.pushState(null, null, href)
    $('nav a').click(false);

    $('main > div:nth-child(1) .contents').addClass('fade-contents-out')

    $('nav a').removeClass("active")

    $(this).addClass("active")

    $.ajax({
      url: href,
      success: function (data) {
        const newPage = $(data).find("main").html()

        $("main").append(newPage)

        $("main > div:nth-child(2)").addClass('fade-in')

        setTimeout(
          function () {
            $("main > div:first-child").remove();
          }, 1000);


      }
    })

  })


});
