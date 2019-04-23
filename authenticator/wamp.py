from wampy.peers.clients import Client
from wampy.roles.callee import callee

from .auth import Authenticator


class WampClient(Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.authenticator = Authenticator()

    @callee
    def user_authenticate(self, username, password):
        print('user_authenticate:', username)
        return self.authenticator.authenticate(username, password)

    @callee
    def user_sign_up(self, username, password):
        print('user_sign_up:', username)
        return self.authenticator.sign_up(username, password)
