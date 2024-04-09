function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (match) {
    const [, fields, table, whereClause] = match;
    const parsedQuery = {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
      whereClauses: [],
    };
    if (whereClause) {
      const conditionRegex = /(\w+)\s*([=<>]+)\s*(\w+)/g;
      let match;
      while ((match = conditionRegex.exec(whereClause)) !== null) {
        parsedQuery.whereClauses.push({
          field: match[1].trim(),
          operator: match[2].trim(),
          value: match[3].trim(),
        });
      }
    }

    return parsedQuery;
  } else {
    throw new Error("Invalid query format");
  }
}
function parseWhereClause(whereString) {
  const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
  return whereString.split(/ AND | OR /i).map(conditionString => {
      const match = conditionString.match(conditionRegex);
      if (match) {
          const [, field, operator, value] = match;
          return { field: field.trim(), operator, value: value.trim() };
      }
      throw new Error('Invalid WHERE clause format');
  });
}
module.exports = parseQuery;
