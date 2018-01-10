//Disable Hover
var body = document.body,
    timer;

window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) {
        body.classList.add('disable-hover')
    }

    timer = setTimeout(function(){
        body.classList.remove('disable-hover')
    },500);
}, false);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vRGlzYWJsZSBIb3ZlclxudmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgIHRpbWVyO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICBpZighYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGUtaG92ZXInKSkge1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtaG92ZXInKVxuICAgIH1cblxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtaG92ZXInKVxuICAgIH0sNTAwKTtcbn0sIGZhbHNlKTtcbiJdLCJmaWxlIjoic2NyaXB0cy5qcyJ9
