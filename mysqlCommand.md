> Learn new concept
- npm install ngrok -g
- Ngrok is a tool that creates a secure tunnel to your localhost, allowing you to expose a local server to the internet.
- cmd : ngrok http port


# Go in Db
- USE ExcelDataDB;
# creat Db
- CREATE DATABASE IF NOT EXISTS ExcelDataDB;
# all db
- show database
# Creat Table
```
USE ExcelDataDB;
CREATE TABLE ExcelData (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ActualOccurrenceDate DATE,
    ueta_event_code VARCHAR(255),
    PredictedEventCode VARCHAR(255),
    assignment_origin VARCHAR(255),
    assignment_destination VARCHAR(255),
    VPC_city VARCHAR(255),
    sold_to_region VARCHAR(255),
    ship_to_region VARCHAR(255),
    sweta_predictability VARCHAR(255),
    occurence_flag BOOLEAN,
    pd_flag BOOLEAN,
    export_flag BOOLEAN,
    fleet_flag BOOLEAN,
    domestic_import_flag BOOLEAN,
    routes_identifier VARCHAR(255),
    distributor_code VARCHAR(255),
    predictions_model VARCHAR(255),
    Counts INT,
    Correct INT,
    Early INT,
    Late INT,
    window_size INT
);
```

