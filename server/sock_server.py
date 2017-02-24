import os

from tornado import web, ioloop
from sockjs.tornado import SockJSRouter, SockJSConnection

class EchoConnection(SockJSConnection):
    def on_message(self, msg):
        self.send("FROM SERVER: {}".format(msg))

if __name__ == '__main__':
    EchoRouter = SockJSRouter(EchoConnection, '/echo')

    app = web.Application(EchoRouter.urls)
    app.listen(8081, no_keep_alive=True)
    ioloop.IOLoop.instance().start()