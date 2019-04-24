import sys
import asyncio

from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner
from prettyconf import config

from .wamp import MyAuthenticator


port = config('PORT', default=80, cast=int)
url = f'ws://cztest01.herokuapp.com:{port}/ws'
runner = ApplicationRunner(url, 'world')
runner.run(MyAuthenticator)
