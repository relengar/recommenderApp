company = new Object();
company.data = [
  {id: 1, category: "builders", description: "We can basically just dig holes in the ground, so that\'s about it", rating: 0, comments: [], information: {name: "Diggers", address: "The Hole 23, In the ground,82 667", owner:"Mr. Mole"}},
  {id: 2, category: "builders", description: "It will cost ya", rating: 0, comments: [], information: {name: "Expensive dude", address: "Luxury house 5, The better part of the town, 81 001", owner:"Old Rich Guy"}},
];

company.getAll = (req, res) => {
  res.send(company.data);
};

company.getById = (req, res) => {
  //test implementation, replaced by real after db is connected
  for (let i = 0; i < company.data.length; i++) {
    if (company.data[i].id == req.query.id) {
      console.log(company.data[i].id);
      res.send(company.data[i]);
    }
  }
};

module.exports = company;
