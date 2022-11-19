import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {IoSaveSharp} from "react-icons/io5";
import './styles/survayuserpanel.css'
import axios from 'axios'

const SurveyUserPanel = () => {

    const [searchParams] = useSearchParams();
    const surveyGuid = searchParams.get('guid');
    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [surveyName, setSurveyName] = useState("");
    const [userInput, setUserInput] = useState([])

    const validateSurvey = async () => {
        const response = await axios.post(`http://localhost:8080/get-survey-name`, {
            guid: surveyGuid
        })
            .then(response => {
                console.log(response.data)
                setSurveyName(String(response.data))
            })
            .catch(error => {
                console.log(error);
            })

    }

    const postSurvey = async () => {
        const response = await axios.post(`http://localhost:8080/survey-input`, {
            guid: surveyGuid
        })
            .then(response => {
                setSurvey(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const fetchAnswers = async () => {
        const response = await axios.post(`http://localhost:8080/answers`)
            .then(response => {
                setAnswers(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const setChangeToAnswer = (e) => {

        userInput.map((item) => {
            if (item?.questionId === e.target.id) {
                item.answerId = e.target.value
            } else {
                userInput.push({
                    questionId: e.target.id,
                    answerId: e.target.value
                })
            }
        })

        // setUserInput( [ ...userInput, {
        //     questionId :e.target.name,
        //     answerId : e.target.value
        // }])
        console.log(userInput)
    }

    useEffect(() => {
        validateSurvey();
        fetchAnswers();
        postSurvey();

    }, [])

    return (
        <div className='user-survay-container'>
            <div className='survay-title-area'>
                <h1 className='survay-title'>{surveyName}</h1>
            </div>
            <div className='survay-questions-container'>
                <div className="survay-questions-area">
                    {survey.map((soru, index) => (
                            <div key={index} className="survay-question-and-answer-area">
                                <div className='survay-question'>
                                    <p>{/* sorunun text: */} {index + 1 + ") "} {soru.TextSoru}</p>
                                </div>
                                {answers.map((ans, index) => (
                                    ans.SoruID === soru.SoruID
                                        ?
                                        <div className='survay-answer'>
                                            <input
                                                type="radio"
                                                id={index}
                                                name={ans.SoruID}
                                                value={ans.Id}
                                                onChange={(event) => {
                                                    let varMi = false;
                                                    userInput.length <= 0
                                                        ?
                                                    setUserInput( [ ...userInput, {
                                                        info : "sifirdan kucuk",
                                                        questionId :Number(event.target.name),
                                                        answerId : Number(event.target.value)
                                                    }])
                                                        :
                                                        userInput.map((el) => {
                                                            if (el.questionId === Number(event.target.name)) {
                                                                (el.answerId) = Number(event.target.value)
                                                                varMi = true;
                                                            }
                                                        })
                                                    if (varMi === false) {
                                                        setUserInput( [ ...userInput, {
                                                            info : "sifirdan buyuk",
                                                            questionId :Number(event.target.name),
                                                            answerId : Number(event.target.value)
                                                        }])
                                                    }
                                                }}
                                            />
                                            <label>{ans.TextCevap}</label>
                                        </div>
                                        : <span></span>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className='form-submit-button-area'>
                <button
                    type="submit"
                    className="submit-button"
                    id="btn-anket-kaydet"
                    onClick={() => {
                        console.log((userInput))
                    }}
                >
                    <IoSaveSharp className='submit-button-icon'/> Anketi Kaydet
                </button>
            </div>

        </div>
    )

}

export default SurveyUserPanel