import _ from "lodash";
import xlsx from "xlsx";
import Axios from "axios";

const preloadQuestions = async () => {
  const results = await Axios.get("/questions.xlsx", {
    responseType: "arraybuffer",
  });
  const data = new Uint8Array(results.data);
  const workbook = xlsx.read(data, { type: "array" });
  const sheet = xlsx.utils.sheet_to_json(workbook.Sheets["TrueFalse"], {
    range: 2,
    header: ["category", "question", "answer"],
  });
  const questions = _(sheet)
    .map((q: any) => ({
      ...q,
      explanation: q.answer,
      answer: (/^That’s\s(true|false)!/g.exec(q.answer) || [])[1] === "true",
    }))
    .groupBy((row: any) => row.category)
    .value();
  return questions;
};

export default preloadQuestions;
