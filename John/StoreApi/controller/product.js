const productSchemaDefine = require("../modals/productSchemaDefine");

const getAllProduct = async (req, res) => {
  console.log(req.query.page);

  const { featured, name, company, rating, sort, fields, numericFilters } =
    req.query;
  const queryObject = {
    // ...(featured && { featured: featured === "true" }),
    // ...(name && { name: { $regex: name, $options: "i" } }),
    // ...(company && { company }),
    // ...(rating && { rating }),
  };

  console.log("queryObject : ", queryObject);

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = name;
  }

  if (company) {
    queryObject.company = company;
  }
  if (rating) {
    queryObject.company = rating;
  }
  if (numericFilters) {
    let filterMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${filterMap[match]}-`
    );
    const option = ['price', 'rating'];
    filters.split(',').forEach(element => {
      const [field,oprater,value] = element.split("-");
      if (option.includes(field)) {
        queryObject[field] = {[oprater]: value}
      }
    });
    console.log("filters : ", filters);
    console.log("queryObject : ", queryObject);

    // queryObject.company = rating;
  }

  //Based on Query
  let data = productSchemaDefine.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    // console.log(sort.split(',').join(' '));
    data = data.sort(sortList);
  } else {
    data = data.sort("createdAt");
  }

  //Sorting Particular Fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    data = data.select(fieldList);
  }

  //Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  data = data.skip(skip).limit(limit);

  const products = await data.lean();

  res.status(200).json({
    status: true,
    message: "Products Route all Data...",
    nbHits: products.length,
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
