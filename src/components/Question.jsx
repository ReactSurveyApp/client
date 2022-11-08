import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './styles/question.css'
import { IoSaveSharp, IoAddCircleOutline, IoTrash } from "react-icons/io5";
import { ImRadioChecked } from "react-icons/im";

const Question = () => {

    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState(1);

    const addQuestion = () => {
        const newQuestion = {
            id: questionId,
            question: '',
            answers: [],
        };
        setQuestions([...questions, newQuestion]);
    }

    const addAnswer = (questionId) => {
        const newAnswer = {
            id: (String(questionId) + "-" + String(Number(questions[questionId - 1].answers.length) + 1)),
            qid: questionId,
            answer: '',
        };

        const newQuestions = questions.map((question) => {
            if (question.id === questionId) {
                question.answers?.push(newAnswer);
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    const deleteAnswer = (questionId, answerId) => {
        const newQuestions = questions.map((question) => {
            if (question.id === questionId) {
                question.answers = question.answers.filter((answer) => answer.id !== answerId);
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    const deleteQuestion = (questionId) => {
        const newQuestions = questions.filter((question) => question.id !== questionId);
        setQuestions(newQuestions);
    }

    let questionsData = [];
    const saveSurveyForm = () => {
        console.log(questions)

        questionsData = questions;

        questionsData.map((question, index) => {

            question.question = document.getElementById(String(index + 1)).value;
            question.answers?.map((answer, index2) => {
                answer.answer = document.getElementById("answer-" + String(index + 1) + "-" + String(index2 + 1)).value;
            })
        })
    }

    async function postQuestionData(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/question_data", { questionsData });
        } catch (err) {
            console.error("HATA MESAJI : " + err.message);

        }
    }
    
    return (
        <div className="survay-container">
            <div className="survay-header">
                <h1 >ANKET OLUŞTUR</h1>
            </div>
            <div className='add-new-question-button-area'>
                <button id="btn-question-ekle"
                    className="add-new-question-button"
                    onClick={() => {
                        addQuestion();
                        setQuestionId(questionId + 1);
                    }}>
                    <IoAddCircleOutline className='add-new-question-button-icon' /> Yeni Soru Oluştur
                </button>
            </div>
            <div>
                {questions?.map((question) => (
                    <div
                        className="new-question-area"
                        key={question.id}>

                        <input
                            className="add-new-question-input"
                            type="text"
                            id={question.id}
                            name="question"
                            placeholder="Soru içeriğini girin..."
                        />
                        <div className="">
                            {/* cevapları gösteren inputlar */}
                            {question.answers.length !== 0 ? question.answers?.map((answer) => (
                                <div key={answer.id}>
                                    <div className='add-new-answer-area'>
                                        <ImRadioChecked className='add-new-answer-radio-icon' />
                                        <input
                                            placeholder="Cevap girin..."
                                            className="add-new-answer"
                                            type="text"
                                            id={"answer-" + answer.id}
                                            name="answer"
                                        />
                                        <IoTrash
                                            className='delete-answer-icon'
                                            id="btn-cevap-sil" onClick={() => {
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

                            )) : <h1 className="notice-message">Lütfen Bir Cevap Ekleyin!</h1>}
                        </div>
                        <div className='question-buttons-area'>
                            <button
                                id="btn-cevap-ekle"
                                className="add-new-answer-button"
                                onClick={() => {
                                    addAnswer(question.id);
                                    console.log(questions)
                                }
                                }>
                                <IoAddCircleOutline className='add-new-answer-button-icon' /> Cevap Ekle
                            </button>
                            <button
                                id="btn-delete-question"
                                className="delete-question-button"
                                onClick={() => {
                                    deleteQuestion(question.id);
                                }}
                            >
                                <IoTrash className='delete-question-button-icon' /> Soru Sil
                            </button>
                        </div>
                    </div>

                ))}
            </div>
            <div className='submit-button-area'>
                <button
                    className="submit-button"
                    id="btn-anket-kaydet"
                    onClick={() => {
                        saveSurveyForm();
                    }}
                >
                    < IoSaveSharp className='submit-button-icon' />   Anketi Kaydet
                </button>
            </div>
            <form onSubmit={postQuestionData}>
                <button type="submit">
                    Backend'e Gönder
                </button>
            </form>
        </div>

    );
};

export default Question;
