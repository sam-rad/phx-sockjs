/*global SockJS*/
document.addEventListener("DOMContentLoaded", function() {
    var sock = new SockJS('https://phx-sockjs-samatancestry.c9users.io:8081/echo');
    sock.onopen = function() {
        var date = new Date();
        console.log(date.toUTCString(), 'open');
        start();
    };

    sock.onmessage = function(e) {
        var date = new Date();
        console.log(date.toUTCString(), e.data);
    };

    sock.onclose = function() {
        var date = new Date();
        console.log(date.toUTCString(), 'close');
    };


    function start() {
        console.log('starting...');
        sock.send('yo');
        var t = setInterval(function() {
            if (sock.readyState === 1) {
                sock.send('yo');
            }
            else {
                console.log('ping stopped');
                clearInterval(t);
            }
        }, 70000);
    }
});