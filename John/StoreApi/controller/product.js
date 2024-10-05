const productSchemaDefine = require("../modals/productSchemaDefine");

const getAllProduct = async (req, res) => {
  const { featured, name, company, rating, sort } = req.query;
  const queryObject = {
    ...(featured && { featured: featured === "true" }),
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(company && { company }),
    ...(rating && { rating }),
  };

  console.log("queryObject : ", queryObject);

  // if (featured) {
  //   queryObject.featured = featured === "true" ? true : false;
  // }

  // if (name) {
  //   queryObject.name = name;
  // }

  // if (company) {
  //   queryObject.company = company;
  // }

  //Based on Query
  let data = productSchemaDefine.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    // console.log(sort.split(',').join(' '));
    data = data.sort(sortList);
  }
  const products = await data.lean();

  res.status(200).json({
    status: true,
    message: "Products Route all Data...",
    nbHits: data.length,
    data: products,
  });
};

const creatData = async (req, res) => {
  try {
    console.log("Req : ", req.body);
    const task = await productSchemaDefine.create(req.body);
    res.status(200).json({
      status: true,
      message: "Created Data Sucessfully..",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Some thing went Wrong//",
    });
  }
};

module.exports = { getAllProduct, creatData };
