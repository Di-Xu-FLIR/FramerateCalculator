# Instructions to set up webserver

## Setup requirements

- Linux machine with Ubuntu (e.g. 22.04)
- python3

---

## Install required package

Install:
- flask
- postgres

```
sudo apt-get install libpq-dev
sudo apt-get install python3-flask

pip install psycopg2

```
---

## Database related
---

### Set up the postgres database in general
Add password for user 'postgres"
```
sudo -u postgres psql
ALTER USER postgres PASSWORD 'password';

CREATE USER user1 WITH PASSWORD 'password1';
GRANT ALL PRIVILEGES ON DATABASE frame_rate_calculator TO user1;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO user1;

# example on how to grant permission for specific table if needed
GRANT SELECT, INSERT, UPDATE, DELETE ON bfs_u3_161s7m TO user1;

```
---

### Create the frame_rate_calculator database and import data from csv

Command to:
- create the camera_settings table in the frame_rate_calculator database
- import the data from csv files into the camera_settings table

  (the csv file are in /mnt/work/temp/avner/Hackathon2023/FramerateCalculator/data/)


```
bash /mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/importFromCsv.bash
```

Related files:
```
# In directory:
ll /mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/
importFromCsv.bash
prepareforImportFromCsv.sql
importFromCsvFile.sql
```

---

Manage the postgres service: e.g.
- restart
- check status
```
sudo systemctl restart postgresql
sudo systemctl status postgresql
```

---

Run the webapp in a terminal:
```
python /mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/app.py
```

---

## Access the webserver:
- from local machine http://127.0.0.1:5000/
- from another computer on the network http://10.195.100.158:5000/


---
Sanity check calls - should return default set of camera_settings just to see that the client-server flow is ok
Call from the webserver machine  
http://10.195.100.158:5000/  
http://127.0.0.1:5000/  

Call from another machine on the network  
http://10.195.100.158:5000/api/camera_settings  
http://10.195.100.158:5000/api/camera_settings  

---
### Example on how to access from the browser.  
Clicking the button "Button2' triggers a query to get the data for specific camera parameters (see the snapshot):
```
file:///mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/example1.html
```


![A cute cat](/mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/triggerQueryFromTheBrowserExample.png)



