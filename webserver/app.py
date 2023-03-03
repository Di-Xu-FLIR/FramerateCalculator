import logging
from flask import Flask, request
import psycopg2
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)

# create a file handler for the log file
handler = logging.FileHandler('app.log')
handler.setLevel(logging.INFO)

# create a logging format
formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
handler.setFormatter(formatter)

# add the handler to the app's logger
app.logger.addHandler(handler)

# sample log message
app.logger.info('Application started')

# Connect to the PostgreSQL database
# conn = psycopg2.connect(database="mydatabase", user="user1", password="password1", host="localhost", port="5432")
conn = psycopg2.connect(database="frame_rate_calculator", user="postgres", password="password", host="localhost", port="5432")

# Define a route to display the data from the database
@app.route('/')
def index():
    cur = conn.cursor()

    # cur.execute("SELECT * FROM users")
    # rows = cur.fetchall()
    # html = '<html><body><table>'
    # for row in rows:
    #     html += '<tr><td>{}</td><td>{}</td></tr>'.format(row[1], row[2])
    # html += '</table></body></html>'

    cur.execute("SELECT * FROM bfs_u3_161s7m")
    rows = cur.fetchall()
    html = '<html><body><table>'
    for row in rows:
        html += '<tr><td>{}</td> <td>{}</td> <td>{}</td> <td>{}</td></tr>'.format(row[0], row[1], row[2], row[3])
    html += '</table></body></html>'

    return html

@app.route('/api/camera_settings')
def camera_settings():
    app.logger.info('BEG camera_settings')
    print('BEG camera_settings')
    # name = request.args.get('name')
    request_args = request.args
    print('request_args: ', request_args)

    cur = conn.cursor()
    print('foo1')
    cur.execute("SELECT * FROM camera_settings limit 3")
    print('foo2')
    rows = cur.fetchall()
    print('foo3')
    print('rows: ', rows)
    

    data = {
        'name': 'John',
        'age': 30,
        'city': 'New York'
    }
    return json.dumps(data)




if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)