from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo


def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:
        connection = PyMongo(current_app)
        db = g._database = connection.db

    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)


def seed_test_database(collection, seed_data):
    """
    Reseeds the database based on the JSON data in seeds folder
    """
    db[collection].drop()
    db[collection].insert_many(seed_data)
