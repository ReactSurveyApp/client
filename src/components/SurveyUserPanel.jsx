import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoSaveSharp } from "react-icons/io5";
import "./styles/survayuserpanel.css";
import axios from "axios";

const SurveyUserPanel = () => {
  const [searchParams] = useSearchParams();
  const surveyGuid = searchParams.get("guid");
  const [survey, setSurvey] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [userInput, setUserInput] = useState([]);

  const validateSurvey = async () => {
    const response = await axios
      .post(`http://localhost:8080/get-survey-name`, {
        guid: surveyGuid,
      })
      .then((response) => {
        console.log(response.data);
        setSurveyName(String(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postSurvey = async () => {
    const response = await axios
      .post(`http://localhost:8080/survey-input`, {
        guid: surveyGuid,
      })
      .then((response) => {
        setSurvey(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAnswers = async () => {
    const response = await axios
      .post(`http://localhost:8080/answers`)
      .then((response) => {
        setAnswers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendSelected = async () => {
    await userInput.map((item) =>
      axios.post("http://localhost:8080/save-selected", {
        guid: surveyGuid,
        questionId: item.questionId,
        answerId: item.answerId,
      })
    );
  };

  useEffect(() => {
    validateSurvey();
    fetchAnswers();
    postSurvey();
  }, []);

  return (
    <div className="user-survay-container">
      <div className="survay-title-area">
        <h1 className="survay-title">{surveyName}</h1>
      </div>
      <div className="survay-questions-container">
        <div className="survay-questions-area">
          {survey.map((soru, index) =>
            soru.Tip === "multiple-choice" ? (
              <div key={index} className="survay-question-and-answer-area">
                <div className="survay-question">
                  <p>
                    {/* sorunun text: */} {index + 1 + ") "} {soru.TextSoru}
                  </p>
                </div>
                {answers.map((ans, index) =>
                  ans.SoruID === soru.SoruID ? (
                    <div className="survay-answer">
                      <input
                        type="radio"
                        id={index}
                        name={ans.SoruID}
                        value={ans.Id}
                        onChange={(event) => {
                          let varMi = false;
                          userInput.length <= 0
                            ? setUserInput([
                                ...userInput,
                                {
                                  info: "sifirdan kucuk",
                                  questionId: Number(event.target.name),
                                  answerId: Number(event.target.value),
                                  answerContent : event.target.value
                                },
                              ])
                            : userInput.map((el) => {
                                if (
                                  el.questionId === Number(event.target.name)
                                ) {
                                  el.answerId = Number(event.target.value);
                                  varMi = true;
                                }
                              });
                          if (varMi === false) {
                            setUserInput([
                              ...userInput,
                              {
                                info: "sifirdan buyuk",
                                questionId: Number(event.target.name),
                                answerId: Number(event.target.value),
                                answerContent : event.target.value
                              },
                            ]);
                          }
                        }}
                      />
                      <label>{ans.TextCevap}</label>
                    </div>
                  ) : (
                    <span></span>
                  )
                )}
              </div>
            ) : (
              // açık uçluysa yapılacaklar
              <>
                <div key={index} className="survay-question-and-answer-area">
                  <p>
                    {/* sorunun text: */} {index + 1 + ") "} {soru.TextSoru}
                  </p>
                  <textarea
                    id = {soru.SoruID}
                    className="resize-none border border-gray-400 rounded p-2 m-4 min-w-[50%]"
                    placeholder="cevabınızı giriniz..."
                  ></textarea>
                </div>
              </>
            )
          )}
        </div>
      </div>

      <div className="form-submit-button-area">
        <button
          type="submit"
          className="submit-button"
          id="btn-anket-kaydet"
          onClick={() => {
            console.log(userInput)
            sendSelected();
          }}
        >
          <IoSaveSharp className="submit-button-icon" /> Anketi Kaydet
        </button>
      </div>
    </div>
  );
};

export default SurveyUserPanel;
