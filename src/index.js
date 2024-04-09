const parseQuery = require("./queryParser");
const readCSV = require("./csvReader");
async function executeSELECTQuery(query) {
  try {
    const { fields, table, whereClauses } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);
    let filteredData = data;
    if (whereClauses && whereClauses.length > 0) {
      filteredData =
        whereClauses.length > 0
          ? data.filter((row) =>
              whereClauses.every((clause) => evaluateCondition(row, clause))
            )
          : data;
    }

    return filteredData.map((row) => {
      const filteredRow = {};
      fields.forEach((field) => {
        filteredRow[field] = row[field];
      });
      return filteredRow;
    });
  } catch (error) {
   
    console.error("Error executing SELECT query:", error.message);
    throw error;
  }
}

function evaluateCondition(row, clause) {
  const { field, operator, value } = clause;
  switch (operator) {
    case "=":
      return row[field] === value;
    case "!=":
      return row[field] !== value;
    case ">":
      return row[field] > value;
    case "<":
      return row[field] < value;
    case ">=":
      return row[field] >= value;
    case "<=":
      return row[field] <= value;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}
module.exports = executeSELECTQuery;