import logging
from flask import Flask, request, jsonify
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
    # cur = conn.cursor()

    # # cur.execute("SELECT * FROM users")
    # # rows = cur.fetchall()
    # # html = '<html><body><table>'
    # # for row in rows:
    # #     html += '<tr><td>{}</td><td>{}</td></tr>'.format(row[1], row[2])
    # # html += '</table></body></html>'

    # cur.execute("SELECT * FROM bfs_u3_161s7m")
    # rows = cur.fetchall()
    # html = '<html><body><table>'
    # for row in rows:
    #     html += '<tr><td>{}</td> <td>{}</td> <td>{}</td> <td>{}</td></tr>'.format(row[0], row[1], row[2], row[3])
    # html += '</table></body></html>'

    # return html

    return camera_settings()

@app.route('/api/camera_settings')
def camera_settings():
    app.logger.info('BEG camera_settings')
    
    print('BEG camera_settings')

    print('request.args: ', request.args)


    model = request.args.get('model', 'BFS-U3-161S7M')
    pixel_format = request.args.get('pixel_format', 'Mono8')
    width = request.args.get('width', 5320)
    height = request.args.get('height', 8)
    isp = request.args.get('isp', 'OFF')
    adc = request.args.get('adc', '8 Bit')
    bin_selector = request.args.get('bin_selector', 'isp')
    bin_x = request.args.get('bin_x', 1)
    bin_y = request.args.get('bin_y', 1)
    bin_mode_x = request.args.get('bin_mode_x', 'average')
    bin_mode_y = request.args.get('bin_mode_y', 'average')
    
    # print('model: ', model)
    # print('pixel_format: ', pixel_format)
    # print('width: ', width)
    # print('height: ', height)
    # print('isp: ', isp)
    # print('adc: ', adc)
    # print('bin_selector: ', bin_selector)
    # print('bin_x: ', bin_x)
    # print('bin_y: ', bin_y)
    # print('bin_mode_x: ', bin_mode_x)
    # print('bin_mode_y: ', bin_mode_y)


    cur = conn.cursor()

    query = """
SELECT id, model, pixel_format, width, height, isp, adc, frame_rate
FROM camera_settings
WHERE model = '{}'
AND pixel_format = '{}'
AND width = '{}'
AND isp = '{}'
AND adc = '{}'
limit 10000
""".format(model, pixel_format, width, isp, adc)

    print('query: ', query)

    cur.execute(query)

    rows = cur.fetchall()
    # print('rows: ', rows)

    # conn.close()
    data = []
    for row in rows:
        print('row: ', row)
        data.append({
            'id': row[0],
            'model': row[1],
            'pixel_format': row[2],
            'witdh': row[3],
            'height': row[4],
            'isp': row[5],
            'adc': row[6],
            'frame_rate': row[7]
        })
        
    return jsonify(data)


if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)