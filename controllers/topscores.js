const bogusScores = [
    {user: 'Dylan', points: 30000},
  ];
  
  function index(req, res) {
    console.log(req.user);
    res.json(bogusScores);
  }
  
  module.exports = {
    index
  };
  