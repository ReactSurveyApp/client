import React, { useState, useEffect } from 'react'
import './styles/surveydetail.css'
import Chart from "react-apexcharts";
import Navbar from './Navbar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ImRadioChecked } from "react-icons/im";
const SurveyDetail = () => {
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


    useEffect(() => {
        validateSurvey();
        postSurvey();
        fetchAnswers();
    }, [])


    return (
        <>
            <Navbar />
            <div className='survey-detail-container'>
                <div className='survey-detail-title-area'>
                    <h1 className='survey-detail-title'>{surveyName}</h1>
                </div>
                {survey.map((soru, index) => (
                    <div className='survey-detail-area' key={index}>
                        <div className='survey-detail-question-area'>
                            <span className='survey-detail-question'>{index+1 + ") " + soru.TextSoru}</span>
                        </div>
                        {answers.map((ans,index)=>(
                            ans.SoruID === soru.SoruID
                            ?          
                            <div className='survay-detail-answer-area' key={index}>
                                <ImRadioChecked className='survay-detail-answer-icon'/>
                                <p className='survay-detail-answer'>{ans.TextCevap}</p>
                            </div>
                            :
                            <span key={index}></span>
                        ))}
                        
                        <div className='survey-detail-chart'>
                            <Chart className="chart-background"
                                type='bar'
                                height={200}
                                options={{
                                    chart: {
                                        stacked: true,
                                        stackType: '100%'
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: true
                                        }
                                    },
                                    xaxis: {
                                        // title: {
                                        //     text: "Müşteri Memnuniyet Anketi Cevaplar",
                                        // },
                                        categories: ['']
                                    }
                                }}
                                series={[
                                    answers.map((anschart)=>(
                                        anschart.SoruID === soru.SoruID
                                        ? 
                                        {
                                            name: anschart.TextCevap,
                                            data: [45]
                                        }
                                        :
                                        {

                                        }
                                    ))
                                    
                                    // {
                                    //     name: "Müşteri Memnuniyet Anketi Cevap 1",
                                    //     data: [45]
                                    // },
                                    // {
                                    //     name: "Müşteri Memnuniyet Anketi Cevap 2",
                                    //     data: [125]
                                    // },
                                    // {
                                    //     name: "Müşteri Memnuniyet Anketi Cevap 3",
                                    //     data: [55]
                                    // },
                                    // {
                                    //     name: "Müşteri Memnuniyet Anketi Cevap 4",
                                    //     data: [190]
                                    // }
                                ]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SurveyDetail