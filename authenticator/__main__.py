from prettyconf import config
from wampy.backends import async_adapter

from .wamp import WampClient

# See https://github.com/noisyboiler/wampy/issues/89

ROLES = {
    'roles': {
        'subscriber': {},
        'publisher': {},
        'callee': {},
        'caller': {},
    },
    'authmethods': ['ticket'],  # where "anonymous" is the default
    'authid': 'authenticator',
}

def main():
    port = config('PORT')
    url = f'ws://localhost:{port}/ws'
    # url = 'ws://crossbar.dronemapp.com:80/ws'
    client = WampClient(url=url, realm='world', roles=ROLES)
    client.start()

    while True:
        async_adapter.sleep(0)

    client.stop()

main()
