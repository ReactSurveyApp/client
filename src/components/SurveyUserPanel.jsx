import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoSaveSharp } from "react-icons/io5";
import './styles/survayuserpanel.css'
import axios from 'axios'

const SurveyUserPanel = () => {

    const [searchParams] = useSearchParams();
    const surveyGuid = searchParams.get('guid');
    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [surveyName, setSurveyName] = useState("");

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

    const postAnswers = () => {

    }

    const saveAnswers = () => {

    }

    useEffect(() => {

        validateSurvey();
        fetchAnswers();
        postSurvey();

    }, [])

    console.log(survey)
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
                                        <input type="radio" id={index} name={ans.SoruID} />
                                        <label>{ans.TextCevap}</label>
                                    </div>

                                    : <span></span>
                            ))}
                        </div>
                    )
                    )}
                </div>
            </div>
            <form onSubmit={postAnswers}>
                <div className='form-submit-button-area'>
                    <button
                        type="submit"
                        className="submit-button"
                        id="btn-anket-kaydet"
                        onClick={() => {
                            saveAnswers();
                        }}
                    >
                        <IoSaveSharp className='submit-button-icon' />   Anketi Kaydet
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SurveyUserPanel