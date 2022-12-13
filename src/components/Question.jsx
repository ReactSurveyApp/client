import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./styles/question.css";
import { IoSaveSharp, IoAddCircleOutline, IoTrash } from "react-icons/io5";
import { ImRadioChecked } from "react-icons/im";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState([String(Date.now())]);
  const [answerId, setAnswerId] = useState([String(Date.now() + 1)]);
  const navigate = useNavigate();
  const navigateToLogin = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );
  const navigateToSurveys = useCallback(
    () => navigate("/anket-listele", { replace: true }),
    [navigate]
  );

  useEffect(() => {
    axios.get("http://localhost:8080/admin-login").then((response) => {
      if (response.data == false) {
        navigateToLogin();
      }
    });
  }, []);

  const addMultipleChoiceQuestion = () => {
    setQuestionId([...questionId, String(Date.now())]);
    const newQuestion = {
      id: questionId[questionId.length - 1],
      question: "",
      answers: [],
      type: "multiple-choice",
    };
    setQuestions([...questions, newQuestion]);
    console.log(questions);
  };

  const addOpenEndedQuestion = () => {
    setQuestionId([...questionId, String(Date.now())]);
    const newQuestion = {
      id: questionId[questionId.length - 1],
      question: "",
      type: "open-ended",
    };
    setQuestions([...questions, newQuestion]);
    console.log(questions)
  };

  const addAnswer = (questionId) => {
    setAnswerId([...answerId, String(Date.now())]);
    const newAnswer = {
      id: answerId[answerId.length - 1],
      qid: questionId,
      answer: "",
    };

    const newQuestions = questions.map((question) => {
      if (question.id === questionId && question.type === "multiple-choice") {
        question.answers?.push(newAnswer);
      }
      return question;
    });

    setQuestions(newQuestions);
  };

  const deleteAnswer = (questionId, answerIdParam) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        question.answers = question.answers.filter(
          (answer) => answer.id !== answerIdParam
        );
      }
      return question;
    });
    setQuestions(newQuestions);
    const newId = answerId.filter((item) => item !== answerIdParam);
    setAnswerId(newId);
  };

  const deleteQuestion = (questionIdParameter) => {
    const newQuestions = questions.filter(
      (question) => question.id !== questionIdParameter
    );
    setQuestions(newQuestions);
    const newId = questionId.filter((item) => item !== questionIdParameter);
    setQuestionId(newId);
  };

  let questionsData = [];
  const saveSurveyForm = () => {
    questionsData = questions;
    console.log("data :   ", questionsData);
    console.log(questions);

    try {
      questionsData.map((question, index) => {
        if (question.type === "multiple-choice") {
          question.question = document.getElementById(questionId[index]).value;
          question.answers?.map((answer,index2) => {
            console.log("cevap idler : " + answerId);
            answer.answer = document.getElementById(
              "answer-" + answerId[index2]
            ).value;
          });
        } else {
          console.log("soru idler : " + questionId[index]);
          question.question = document.getElementById(questionId[index]).value;
        }
      });
    } catch (err) {
      console.log("HATA OLUŞTU. HATA MESAJI : " + err);
    }
  };

  async function postQuestionData(e) {
    e.preventDefault();
    let surveyName = document.getElementById("survey-name").value;

    try {
      await axios.post("http://localhost:8080/survey_name", { surveyName });
    } catch (err) {
      console.log("hata oluştu : " + err.message);
    }

    try {
      await axios.post("http://localhost:8080/question_data", {
        questionsData,
      });
      navigateToSurveys();
    } catch (err) {
      console.error("HATA MESAJI : " + err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="survay-container">
        <div className="survay-header flex flex-col items-center">
          <h1>ANKET OLUŞTUR</h1>
        </div>
        <div className="survay-name-area">
          <input
            className="survay-name-input"
            type="text"
            id="survey-name"
            placeholder="Anket adını girin..."
          />
        </div>
        <div className="add-new-question-button-area">
          <button
            id="btn-question-ekle"
            className="add-new-question-button mr-5"
            onClick={() => {
              // addMultipleChoiceQuestion();
              addOpenEndedQuestion();
            }}
          >
            <IoAddCircleOutline className="add-new-question-button-icon" /> Açık
            Uçlu Soru Oluştur
          </button>
          <button
            id="btn-question-ekle"
            className="add-new-question-button"
            onClick={() => {
              addMultipleChoiceQuestion();
              //addOpenEndedQuestion();
            }}
          >
            <IoAddCircleOutline className="add-new-question-button-icon" />{" "}
            Çoktan Seçmeli Soru Oluştur
          </button>
        </div>
        <div>
          {questions?.map((question) => (
            <div className="new-question-area" key={question.id}>
              <input
                className="add-new-question-input"
                type="text"
                id={question.id}
                name="question"
                placeholder="Soru içeriğini girin..."
              />
              {question.type === "multiple-choice" ? (
                <div className="">
                  {/* cevapları gösteren inputlar */}
                  {question.answers.length !== 0 ? (
                    question.answers?.map((answer) => (
                      <div key={answer.id}>
                        <div className="add-new-answer-area">
                          <ImRadioChecked className="add-new-answer-radio-icon" />
                          <input
                            placeholder="Cevap girin..."
                            className="add-new-answer"
                            type="text"
                            id={"answer-" + answer.id}
                            name="answer"
                          />
                          <IoTrash
                            className="delete-answer-icon"
                            id="btn-cevap-sil"
                            onClick={() => {
                              deleteAnswer(question.id, answer.id);
                            }}
                          />
                          {/* <button
                                            className="delete-answer-icon"
                                            id="btn-cevap-sil" onClick={() => {
                                                deleteAnswer(question.id, answer.id);
                                            }}>
                                            Sil
                                        </button> */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="notice-message">
                      Lütfen Bir Cevap Ekleyin!
                    </h1>
                  )}
                </div>
              ) : (
                <div>
                  <h1 className={"notice-message"}>
                    Açık uçlu sorulara cevap şıkkı eklenemez!
                  </h1>
                </div>
              )}
              <div className="question-buttons-area">
                {question.type === "multiple-choice" ? (
                  <button
                    id="btn-cevap-ekle"
                    className="add-new-answer-button"
                    onClick={() => {
                      addAnswer(question.id);
                      console.log(questions);
                    }}
                  >
                    <IoAddCircleOutline className="add-new-answer-button-icon" />{" "}
                    Cevap Ekle
                  </button>
                ) : null}
                <button
                  id="btn-delete-question"
                  className="delete-question-button"
                  onClick={() => {
                    deleteQuestion(question.id);
                  }}
                >
                  <IoTrash className="delete-question-button-icon" /> Soru Sil
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="submit-button-area">
          <form onSubmit={postQuestionData}>
            <button
              type="submit"
              className="submit-button"
              id="btn-anket-kaydet"
              onClick={() => {
                saveSurveyForm();
              }}
            >
              <IoSaveSharp className="submit-button-icon" /> Anketi Kaydet
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Question;
