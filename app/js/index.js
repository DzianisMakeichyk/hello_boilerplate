$(document).ready(function () {
    // Menu
    console.log('hello2')
    $('.nav-button').click(function () {
        $('.burger').toggleClass('active');
        $('.screen-navigation').toggleClass('open');
    });
});
