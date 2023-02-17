// [SP]ハンバーガをクリックしたらメニューを表示
$(".global-nav-icon").on("click", function () {
  if ($(".global-nav .nav-list").css("display") === "block") {
    $(".global-nav .nav-list").slideUp("1500");
  } else {
    $(".global-nav .nav-list").slideDown("1500");
  }
  /* メニューアイコンを切り替える */
  $("i", this).toggleClass("fas fa-bars fas fa-times");
});

// Windowサイズによってスタイルを変更
$(window).on("load resize", function () {
  if (window.innerWidth > 768) {
    $(".global-nav .nav-list").css("display", "flex");
  } else {
    $(".global-nav .nav-list").css("display", "none");
    $("i").removeClass("fas fa-times");
    $("i").addClass("fas fa-bars");
  }
});

// アコーディオンメニュー
$(".nav-item").on("click", function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    $(this).children(".nav-item_sub").slideToggle();
    $(".nav-item").not($(this)).children(".nav-item_sub").slideUp();
  }
});

$("#hamburger").on("click", function () {
  $(".icon").toggleClass("close");
  $(".sm").slideToggle();
});
