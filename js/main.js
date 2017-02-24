/*global SockJS*/

document.addEventListener("DOMContentLoaded", function() {
    
    document.body.style.backgroundColor = 'grey';
    var uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var sessionId = uuid();
    var sock = new SockJS('https://order.ancestrystage.com/rt', null, {
        transports: ['xdr-streaming', 'xhr-streaming', 'iframe-eventsource',
            'iframe-htmlfile', 'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling'
        ]
    });

    sock.onopen = function() {
        //console.time('connection duration');
        sock.send(JSON.stringify({
            action: 'attach_session',
            session_id: sessionId
        }));
        console.log('open');
        document.body.style.backgroundColor = 'green';
        document.title = "⇞ Connected ⇞";
        start();
    };

    sock.onmessage = function(e) {
        var date = new Date();
        console.log(date.toUTCString(), JSON.parse(e.data));
    };

    sock.onclose = function() {
        // console.timeEnd('connection duration');
        console.log('close');
        document.title = 'X';
    };

    var input = {
        session_id: sessionId,
        action: "get_offer",
        offer_id: "O-23253",
        catalog_name: "Ancestry_US",
        market_id: "US",
        culture_id: "en_US"
    };

    function start() {
        console.log('starting...');
        var t = setInterval(function() {
            if (sock.readyState === 1) {
                sock.send(JSON.stringify(input));
            }
            else {
                console.log('ping stopped');
                clearInterval(t);
                document.body.style.backgroundColor = 'red';
                document.title = 'Stopped';
            }
        }, 15000);
    }
    window.sock = sock;
});
