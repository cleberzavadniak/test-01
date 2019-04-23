from time import sleep

from prettyconf import config
from wampy.peers.clients import Client
from wampy.peers.routers import Crossbar
from wampy.messages.error import Error

# See https://github.com/noisyboiler/wampy/issues/89

ROLES = {
    'roles': {
        'subscriber': {},
        'publisher': {},
        'callee': {},
        'caller': {},
    },
    'authmethods': ['ticket'],  # where "anonymous" is the default
    'authid': 'test',
}

def main():
    port = config('PORT')
    url = f'ws://localhost:{port}/ws'
    # url = 'ws://crossbar.dronemapp.com:80/ws'
    realm = 'world'
    client = Client(router=Crossbar(url=url), realm=realm, roles=ROLES)
    client.start()
    x = client.call('user_authenticate', 'cleber@example.com', 'blebs')
    # import pdb; pdb.set_trace()
    if isinstance(x, Error):
        print('Error:', x.message)
    else:
        print(x)

    client.stop()


main()
