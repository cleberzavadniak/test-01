from autobahn.asyncio.wamp import ApplicationSession
from autobahn.wamp.exception import ApplicationError
from prettyconf import config

from .auth import Authenticator


class MyAuthenticator(ApplicationSession):
    def onConnect(self):
        self.join(self.config.realm, [u"ticket"], 'authenticator')

    def onJoin(self, details):
        authenticator = Authenticator(salt=config('SALT', default='blebs'))

        try:
            self.register(authenticator.authenticate, 'authenticate')
            self.register(authenticator.sign_up, 'sign_up')
        except Exception as e:
            print(f"could not register {e}")

    def onChallenge(self, challenge):
        if challenge.method == u"ticket":
            print("WAMP-Ticket challenge received: {}".format(challenge))
            return config('WAMPYSECRET')
        else:
            raise Exception("Invalid authmethod {}".format(challenge.method))
