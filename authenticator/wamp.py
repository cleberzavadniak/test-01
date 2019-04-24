from prettyconf import config
from wampy.peers.clients import Client
from wampy.roles.callee import callee

from .auth import Authenticator


class WampClient(Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.authenticator = Authenticator(salt=config('SALT', default='blebs'))

    @callee
    def authenticate(self, username, password):
        return self.authenticator.authenticate(username, password)

    @callee
    def sign_up(self, username, password):
        return self.authenticator.sign_up(username, password)
