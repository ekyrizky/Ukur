from object_size import measure
from flask import Flask, request, send_file
from flask_pymongo import PyMongo
import os, uuid, magic, base64
from bson.json_util import dumps
from datetime import datetime

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://rizky:lab4lab4@ukur-shard-00-00-vvcep.gcp.mongodb.net:27017,ukur-shard-00-01-vvcep.gcp.mongodb.net:27017,ukur-shard-00-02-vvcep.gcp.mongodb.net:27017/ukur?ssl=true&replicaSet=ukur-shard-0&authSource=admin&retryWrites=true&w=majority"
mongo = PyMongo(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

@app.route('/', methods=['POST','GET'])
def hello_world():
    return 'Hello, World!'

@app.route('/create', methods=['GET'])
def test():
    mongo.db.tests.insert_one({'test':1})
    return 'true'

@app.route('/upload', methods=['POST'])
def upload_file():
    f = request.files['file']
    original_filename = f.filename
    unique_filename = str(uuid.uuid4())+'.jpg'
    save_location = os.path.join(UPLOAD_FOLDER, unique_filename)
    f.save(save_location)
    measure(save_location, 0.9488189)
    mime = magic.from_file(save_location, mime=True)
    f_info = {
        'original_filename': original_filename,
        'unique_filename': unique_filename,
        'mime': mime
    }
    mongo.db.upload_files.insert_one(f_info)
    return dumps(f_info)

@app.route('/upload/base64', methods=['POST'])
def upload_file_base64():
    payload = request.json
    decoded = base64.b64decode(payload['base64'])
    original_filename = datetime.now().strftime("%d-%b-%Y (%H:%M)")
    unique_filename = str(uuid.uuid4())+'.jpg'
    save_location = os.path.join(UPLOAD_FOLDER, unique_filename)
    f = open(save_location, 'wb')
    f.write(decoded)
    f.close()
    measure(save_location, 0.9488189)
    mime = magic.from_file(save_location, mime=True)
    f_info = {
        'original_filename': original_filename,
        'unique_filename': unique_filename,
        'mime': mime
    }
    mongo.db.upload_files.insert_one(f_info)
    return dumps(f_info)

@app.route('/file/<unique_filename>', methods=['GET'])
def get_file(unique_filename):
    result = mongo.db.upload_files.find_one({'unique_filename': unique_filename})
    file_location = os.path.join(UPLOAD_FOLDER, unique_filename)
    return send_file(file_location, mimetype=result['mime'])

@app.route('/files', methods=['GET'])
def get_file_list():
    result = mongo.db.upload_files.find().sort('_id', -1)
    return dumps(result)

