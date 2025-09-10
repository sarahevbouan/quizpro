import questions from "../../src/data/questionsDB.json" with {type: "json"};

const handler = (req, res) => {
  const subjectId = req.query.subjectId;
  console.log(req.query.subjectId)
  const filtered = questions.find((question) => question.id === subjectId);
  res.status(200).json(filtered);
};

export default handler;
