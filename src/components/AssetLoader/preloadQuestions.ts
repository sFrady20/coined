import _ from "lodash";
import xlsx from "xlsx";
import Axios from "axios";

const preloadQuestions = async () => {
  const results = await Axios.get("/questions.xlsx", {
    responseType: "arraybuffer",
  });
  const data = new Uint8Array(results.data);
  const workbook = xlsx.read(data, { type: "array" });
  const questions = _.mapValues(workbook.Sheets, (sheet) =>
    xlsx.utils.sheet_to_json(sheet, {
      range: 2,
      header: [
        "quarter",
        "difficulty",
        "prompt",
        "correctAnswer",
        "wrongAnswer1",
        "wrongAnswer2",
      ],
    })
  ) as { [s: string]: any };
  return questions;
};

export default preloadQuestions;
