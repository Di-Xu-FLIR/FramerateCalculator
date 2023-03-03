#!/usr/bin/bash

# PGPASSWORD=password psql -h localhost -d frame_rate_calculator -U postgres

# Set the database credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=frame_rate_calculator
DB_USER=postgres
DB_PASSWORD=password
export PGPASSWORD=password

# Define the SQL script to execute
PREPARE_FOR_IMPORT_SQL_SCRIPT=/mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/prepareforImportFromCsv.sql

# Build the psql command
PSQL_COMMAND="psql -h ${DB_HOST} -p ${DB_PORT} -d ${DB_NAME} -U ${DB_USER} -w -f ${PREPARE_FOR_IMPORT_SQL_SCRIPT}"

# Execute the psql command
${PSQL_COMMAND}

# exit 1

# Build the psql command2
IMPORT_FROM_CSV_FILE_SQL_SCRIPT=/mnt/work/temp/avner/Hackathon2023/FramerateCalculator/webserver/importFromCsvFile.sql

for filename in /mnt/work/temp/avner/Hackathon2023/FramerateCalculator/data/*; do

  # Define the SQL script to execute
  echo "$filename"
  PSQL_COMMAND2="psql -h ${DB_HOST} -p ${DB_PORT} -d ${DB_NAME} -U ${DB_USER} -w -v filename="$filename" -f ${IMPORT_FROM_CSV_FILE_SQL_SCRIPT}"
  
  # Execute the psql command
  ${PSQL_COMMAND2}
  if [ $? -ne 0 ]; then
      echo "Error: sql script returned with error."
      exit 1
  fi  
 
done

