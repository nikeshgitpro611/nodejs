const HttpError = require("../modle/httpModal");
const { v4: uuidv4 } = require("uuid");

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    email: "john.doe@example.com",
    address: "123 Main St, Cityville",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    email: "jane.smith@example.com",
    address: "456 Elm St, Townsville",
  },
  {
    id: 3,
    name: "Sam Johnson",
    age: 22,
    email: "sam.johnson@example.com",
    address: "789 Oak St, Villageville",
  },
  {
    id: 4,
    name: "Lisa Brown",
    age: 25,
    email: "lisa.brown@example.com",
    address: "101 Pine St, Hamletville",
  },
  {
    id: 5,
    name: "Tom Clark",
    age: 35,
    email: "tom.clark@example.com",
    address: "202 Maple St, Boroughville",
  },
  {
    id: 6,
    name: "Emily Davis",
    age: 29,
    email: "emily.davis@example.com",
    address: "303 Birch St, Villecity",
  },
  {
    id: 7,
    name: "Michael Miller",
    age: 27,
    email: "michael.miller@example.com",
    address: "404 Cedar St, Metrotown",
  },
  {
    id: 8,
    name: "Sarah Wilson",
    age: 31,
    email: "sarah.wilson@example.com",
    address: "505 Spruce St, Capitolville",
  },
  {
    id: 9,
    name: "David Moore",
    age: 33,
    email: "david.moore@example.com",
    address: "606 Aspen St, Centerville",
  },
  {
    id: 10,
    name: "Laura Taylor",
    age: 24,
    email: "laura.taylor@example.com",
    address: "707 Redwood St, Districtville",
  },
  {
    id: 11,
    name: "James Anderson",
    age: 26,
    email: "james.anderson@example.com",
    address: "808 Fir St, Uptownville",
  },
  {
    id: 12,
    name: "Sophia Martinez",
    age: 30,
    email: "sophia.martinez@example.com",
    address: "909 Cypress St, Downtownville",
  },
  {
    id: 13,
    name: "Robert Thomas",
    age: 34,
    email: "robert.thomas@example.com",
    address: "111 Oak St, Oldtown",
  },
  {
    id: 14,
    name: "Karen Jackson",
    age: 23,
    email: "karen.jackson@example.com",
    address: "222 Pine St, Newtown",
  },
  {
    id: 15,
    name: "Daniel White",
    age: 28,
    email: "daniel.white@example.com",
    address: "333 Birch St, Rivertown",
  },
  {
    id: 16,
    name: "Nancy Harris",
    age: 32,
    email: "nancy.harris@example.com",
    address: "444 Cedar St, Seaside",
  },
  {
    id: 17,
    name: "Brian Martin",
    age: 29,
    email: "brian.martin@example.com",
    address: "555 Spruce St, Hilltop",
  },
  {
    id: 18,
    name: "Alice Thompson",
    age: 27,
    email: "alice.thompson@example.com",
    address: "666 Aspen St, Valleyview",
  },
  {
    id: 19,
    name: "Mark Garcia",
    age: 31,
    email: "mark.garcia@example.com",
    address: "777 Redwood St, Lakeside",
  },
  {
    id: 20,
    name: "Susan Martinez",
    age: 35,
    email: "susan.martinez@example.com",
    address: "888 Fir St, Countryside",
  },
];

const getByUserId = (req, res, next) => {
  const { age } = req.body;
  const ageData = dummyData.find((getAge) => getAge.age === age);

  //Here Error Hnadling
  if (!ageData) {
    // const error = new Error('Some Thing Went Wrong data not Found of user age...');
    // error.code = 404;
    return next(
      new HttpError("Some Thing Went Wrong data not Found of user age...", 404)
    );

    // return res.status(404).json({
    //   status: false,
    //   message: "Some Thing Went Wrong data not Found...",
    // });
  }

  return res.json({
    status: true,
    message: "getingin data based on age",
    data: ageData,
  });
};

const getById = (req, res, next) => {
  const { id } = req.body;
  const getDummyData = dummyData.find((getAll) => getAll.id === id);
  if (!getDummyData) {
    // const error = new Error('Some Thing Went Wrong data not Found of id...');
    // error.code = 404;
    // throw error;
    throw new HttpError("Some Thing Went Wrong data not Found of id...", 404);
  }
  return res.json({
    status: true,
    message: "Geting Data Based On id",
    data: getDummyData,
  });
};

const getAllData = (req, res, next) => {
  return res.json({
    status: true,
    message: "Route Path",
    data: dummyData,
  });
};

const createPlace = (req, res, next) => {
  const { id, name, age, email, address } = req.body;
  const creatNewData = { id: uuidv4(), name, age, email, address };

  dummyData.push(creatNewData);
  return res.status(201).json({
    status: true,
    message: "Data Push Sucessfully..",
    data: creatNewData,
  });
};
module.exports = { getByUserId, getById, getAllData, createPlace };
