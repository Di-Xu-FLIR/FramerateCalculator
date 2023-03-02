from flask import Flask
import psycopg2

app = Flask(__name__)

# Connect to the PostgreSQL database
conn = psycopg2.connect(database="mydatabase", user="user1", password="password1", host="localhost", port="5432")

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

if __name__ == '__main__':
    app.run(debug=True)
