function queryDataById(id) {
  // SELECT * FROM table WHERE id = $id;
  console.log('WARNING! YOU ARE ACCESSING A LIVE DATABASE!');
  return { id: 1 };
}

module.exports = {
  queryDataById
}