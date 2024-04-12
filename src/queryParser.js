function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.+?))?$/i;
  const match = query.match(selectRegex);

  if (match) {
    const [, fields, table, whereClause] = match;
    // console.log("where" + whereClause);
    return {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
      whereClause:
        whereClause !== undefined && whereClause !== ""
          ? whereClause.trim()
          : null,
    };
  } else {
    throw new Error("Invalid query format");
  }
}
// parseQuery("SELECT id, name FROM sample");
module.exports = parseQuery;
