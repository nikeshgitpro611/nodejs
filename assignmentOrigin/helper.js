const connection = require("./dbConncect");

const selectActiveRecord = (sql, sqlParam = null) => {
  // console.log("sqlParam : ", sqlParam);
  return new Promise((resolve, reject) => {
    connection.query(sql, sqlParam, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getAllDataByDump = async () => {
  let sql = `SELECT * FROM dump limit 10`;
  let result = await selectActiveRecord(sql);
  // console.log(result);
  return result;

  // try {
  //   const rows = await new Promise((resolve, reject) => {
  //     connection.query("SELECT * FROM dump", (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     });
  //   });
  //   return rows;
  // } catch (err) {
  //   console.error("Error:", err);
  //   return [];
  // }
};

const getDataByRequestBodyLocation = async (state) => {
  console.log("State : ", state);
  let sql = `SELECT * FROM dump WHERE assignment_origin = ? `;
  let result = await selectActiveRecord(sql, [state]);
  // console.log(result);

  return result;
};

const getAllDateX = async () => {
  let sql = `SELECT ActualOccurrenceDate FROM dump`;
  let result = await selectActiveRecord(sql);
  return result; // Return the array of dates
};

const getAllDateWindowY = async () => {
  let sql = `SELECT ActualOccurrenceDate, SUM(window_size) AS windows, SUM(Correct) AS Accurate, SUM(Counts) AS Total
  FROM dump GROUP BY ActualOccurrenceDate ORDER BY STR_TO_DATE(ActualOccurrenceDate, '%m/%d/%Y') ASC`;
  let result = await selectActiveRecord(sql);
  console.log(result);

  return result;
};

const getAllDataBasedOnDate = async (dateA, dateB) => {
  let sql = `SELECT ActualOccurrenceDate, 
       SUM(window_size) AS windows, 
       SUM(Correct) AS Accurate, 
       SUM(Counts) AS Total
      FROM dump WHERE ActualOccurrenceDate BETWEEN ? AND ?
      GROUP BY ActualOccurrenceDate
      ORDER BY STR_TO_DATE(ActualOccurrenceDate, '%m/%d/%Y') ASC;
`;
  let result = await selectActiveRecord(sql, [dateA, dateB]);
  // console.log('Result : ', result);
  return result;
};

const getAllDataForBarChart = async () => {
  let sql = `select month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) as monthName, 
  ship_to_region, sum(window_size) AS total_window_size, 
  sum(Counts) AS total_counts
  from dump group by ship_to_region, month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) 
  ORDER BY ship_to_region, month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) ASC`;

  let result = await selectActiveRecord(sql);
  // console.log('Result : ', result);
  return result;

  // y - 11132/1191
  // x - 110(ship_region)
};

const postAllDataForBarChart = async (dateA, dateB) => {
  
  let sql = `select month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) as monthName, ship_to_region, sum(window_size) AS total_window_size, 
sum(Counts) AS total_counts
from dump  WHERE month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) BETWEEN ? AND ? group by ship_to_region, month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) 
ORDER BY ship_to_region, month(STR_TO_DATE(ActualOccurrenceDate,'%m/%d/%Y')) ASC`;
const result = await selectActiveRecord(sql, [dateA, dateB]);
return result;
}

module.exports = {
  getAllDataByDump,
  getDataByRequestBodyLocation,
  getAllDateX,
  getAllDateWindowY,
  getAllDataBasedOnDate,
  getAllDataForBarChart,
  postAllDataForBarChart
};
