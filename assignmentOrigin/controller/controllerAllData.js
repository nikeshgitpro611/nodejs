const { parse } = require("dotenv");
const {
  getAllDataByDump,
  getDataByRequestBodyLocation,
  getAllDateX,
  getAllDateWindowY,
  getAllDataBasedOnDate,
  getAllDataForBarChart,
  postAllDataForBarChart,
} = require("../helper");

const getAllTyData = async (req, res) => {
  try {
    const data = await getAllDataByDump();
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDataByLocation = async (req, res) => {
  try {
    const state = req.body.assignment_origin; // Access query parameters
    const data = await getDataByRequestBodyLocation(state);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPlotlyWindowAndAccuranceData = async (req, res) => {
  try {
    let xData = [];
    let totalVal = [];

    let yWindowData = [];
    let yWindowAccuracy = [];
    const yWindows = await getAllDateWindowY();

    // console.log("yWindows : ", yWindows);

    for (let index = 0; index < yWindows.length; index++) {
      const itratForYWindow = yWindows[index];

      let dateString = itratForYWindow.ActualOccurrenceDate.replace(/"/g, "");

      xData.push(dateString); // Or push timestamp if you need numerical data

      yWindowData.push(parseFloat(itratForYWindow.windows));

      yWindowAccuracy.push(parseFloat(itratForYWindow.Accurate));
      totalVal.push(parseFloat(itratForYWindow.Total));
    }

    const data = {
      x: xData,
      y: {
        Windows: yWindowData,
        Accuracy: yWindowAccuracy,
      },
      Total: totalVal,
      color: {
        a: "r",
        b: "b",
      },
      label: {
        x: "date",
        y: "Vehicle Count",
      },
      chartType: "line",
    };

    return res.status(200).json({
      status: true,
      message: "Successfully Message...",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFilterLineData = async (req, res) => {
  try {
    let xData = [];
    let totalVal = [];
    let yWindowData = [];
    let yWindowAccuracy = [];
    const primeryDate = req.body.primeryDate;
    const secondaryDate = req.body.secondaryDate;
    const getFilterDate = await getAllDataBasedOnDate(
      primeryDate,
      secondaryDate
    );

    for (let index = 0; index < getFilterDate.length; index++) {
      const element = getFilterDate[index];
      // console.log("element : ", element);
      let dateString = element.ActualOccurrenceDate;

      xData.push(dateString); // Or push timestamp if you need numerical data
      yWindowData.push(parseFloat(element.windows));
      yWindowAccuracy.push(parseFloat(element.Accurate));
      totalVal.push(parseFloat(element.Total));
    }

    const data = {
      x: xData,
      y: {
        Windows: yWindowData,
        Accuracy: yWindowAccuracy,
      },
      Total: totalVal,
      color: {
        a: "r",
        b: "b",
      },
      label: {
        x: "date",
        y: "Vehicle Count",
      },
      chartType: "line",
    };

    return res.status(200).json({
      status: true,
      message: "Successfully Message...",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllDataForBarChartGui = async (req, res) => {
  try {
    let xShipRegion = [];
    let yMayDataWindowSize = [];
    let yJuneDataWindowSize = [];
    let yJulyDataWindowSize = [];
    let yMayCounts = [];
    let yJuneCounts = [];
    let yJulyCounts = [];

    const getBarChartList = await getAllDataForBarChart();

    for (let index = 0; index < getBarChartList.length; index++) {
      const { monthName, ship_to_region, total_window_size, total_counts } =
        getBarChartList[index];
      xShipRegion.push(ship_to_region);

      if (monthName === 5) {
        yMayDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yMayCounts.push(parseInt(total_counts));
      } else if (monthName === 6) {
        yJuneDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yJuneCounts.push(parseInt(total_counts));
      } else if (monthName === 7) {
        yJulyDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yJulyCounts.push(parseInt(total_counts));
      }
    }

    let data = {
      x: xShipRegion,
      y: {
        may: yMayDataWindowSize,
        june: yJuneDataWindowSize,
        july: yJulyDataWindowSize,
      },
      z: {
        may: yMayCounts,
        june: yJuneCounts,
        july: yJulyCounts,
      },
      color: {
        may: "r",
        june: "b",
        july: "k",
      },
      label: {
        x: "region",
        y: "window",
        z: "count",
      },
      chartType: "bar",
    };

    return res.status(200).json({
      status: true,
      message: "Successfully Message...",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFilterDataForBarChart = async (req, res) => {
  try {
    const primeryDate = req.body.primeryDate;
    const secondaryDate = req.body.secondaryDate;

    let xShipRegion = [];
    let yMayDataWindowSize = [];
    let yJuneDataWindowSize = [];
    let yJulyDataWindowSize = [];
    let yMayCounts = [];
    let yJuneCounts = [];
    let yJulyCounts = [];

    const getReqDate = await postAllDataForBarChart(
      parseInt(primeryDate),
      parseInt(secondaryDate)
    );

    for (let index = 0; index < getReqDate.length; index++) {
      const { monthName, ship_to_region, total_window_size, total_counts } =
        getReqDate[index];
      xShipRegion.push(ship_to_region);

      if (monthName === 5) {
        yMayDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yMayCounts.push(parseInt(total_counts));
      } else if (monthName === 6) {
        yJuneDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yJuneCounts.push(parseInt(total_counts));
      } else if (monthName === 7) {
        yJulyDataWindowSize.push(
          parseFloat((total_window_size / total_counts).toFixed(2))
        );
        yJulyCounts.push(parseInt(total_counts));
      }
    }

    let data = {
      x: xShipRegion,
      y: {
        may: yMayDataWindowSize,
        june: yJuneDataWindowSize,
        july: yJulyDataWindowSize,
      },
      z: {
        may: yMayCounts,
        june: yJuneCounts,
        july: yJulyCounts,
      },
      color: {
        may: "r",
        june: "b",
        july: "k",
      },
      label: {
        x: "region",
        y: "window",
        z: "count",
      },
      chartType: "bar",
    };

    return res.status(200).json({
      status: true,
      message: "Successfully Message...",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTyData,
  getDataByLocation,
  getPlotlyWindowAndAccuranceData,
  getAllFilterLineData,
  getAllDataForBarChartGui,
  getAllFilterDataForBarChart,
};
