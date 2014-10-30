$(document).ready(function() {

  $('.main-nav .projects').click(function() {
    $('#app').load('views/manage_projects.html');
    $('.main-nav a').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.main-nav .plugins').click(function() {
    $('#app').load('views/manage_plugins.html');
    $('.main-nav a').removeClass('active');
    $(this).toggleClass('active');
  });

});