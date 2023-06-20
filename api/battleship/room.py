from flask import (Blueprint, make_response, session, jsonify)

from .auth import login_required
from .helpers import generate_unique_code

rooms = {}

bp = Blueprint('room', __name__, url_prefix='/room')

@bp.route('/create', methods=['POST'])
@login_required
def create_room():
  session['room'] = generate_unique_code()
  rooms[(session['room'])] = {"gamestate": "someconfigs"}
  return make_response({'room': session['room']}, 200)

@bp.route('/list', methods=['GET'])
def list_rooms():
  return jsonify(rooms)