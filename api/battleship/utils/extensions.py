from flask_socketio import SocketIO

socketio = SocketIO(
    cors_allowed_origins="*", manage_session=False, engineio_logger=True, logger=True
)
