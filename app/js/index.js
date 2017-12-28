$(document).ready(function () {
    // Menu
    console.log('hello')
    $('.nav-button').click(function () {
        $('.burger').toggleClass('active');
        $('.screen-navigation').toggleClass('open');
    });
});

