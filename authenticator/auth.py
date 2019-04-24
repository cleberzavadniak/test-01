import datetime
from uuid import uuid4

from cached_property import cached_property
from pbkdf2 import crypt
import dataset


class Authenticator:
    def __init__(self, salt):
        self.db = dataset.connect()
        self.salt = salt

    def hash_password(self, password):
        return crypt(password, self.salt)

    def check_password(self, alleged, password):
        hashed = self.hash_password(alleged)
        return hashed == password

    def authenticate(self, username, alleged_password):
        users = self.db['users'].find(username=username)

        if len(users) == 0:
            raise Exception('Not found')

        for user in users:
            if self.check_password(alleged_password, user['password']):
                data = dict(user)
                del data['password']
                return data

        raise Exception('Wrong password')

    def generate_token(self):
        return str(uuid4()).replace('-', '')

    def sign_up(self, username, password):
        user = self.db['users'].find_one(username=username)
        if user is not None:
            raise Exception('Another user with the same username already exists')

        hashed_password = self.hash_password(password)
        token = self.generate_token()

        primary_key_value = self.db['users'].insert({
            'username': username,
            'password': hashed_password,
            'token': token
        })

        return {
            'id': primary_key_value,
            'token': token
        }
