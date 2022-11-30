import React, { useState, useEffect } from "react";
import "./styles/surveydetail.css";
import Chart from "react-apexcharts";
import Navbar from "./Navbar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ImRadioChecked } from "react-icons/im";

const SurveyDetail = () => {
  const [searchParams] = useSearchParams();
  const surveyGuid = searchParams.get("guid");
  const [survey, setSurvey] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [rerender, setRerender] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  

  useEffect(() => {
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
    const fetchSelected = async () => {
      const response = await axios
        .get(`http://localhost:8080/get-selected`)
        .then((response) => {
          setSelecteds(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    validateSurvey();
    postSurvey();
    fetchAnswers();
    fetchSelected();
  }, []);

  return (
    <>
      <Navbar />
      <div className="survey-detail-container flex flex-col ">
      <div className="survey-detail-title-area">
            <h1 className="survey-detail-title">ANKET ADI : {surveyName} </h1>
          </div>
      {survey.map((soru, index) => (
        <>
          

          <div className="survey-detail-area">
            <div className="survey-detail-question-area">
              <span className="survey-detail-question">
                Soru {index + 1} : {soru.TextSoru}{" "}
              </span>
            </div>
            {answers.map((ans) => (

              Number(ans.SoruID) === Number(soru.SoruID) 
              ?
              <div className="survay-detail-answer-area">
                <ImRadioChecked className="survay-detail-answer-icon" />
                <p className="survay-detail-answer">{
                  ans.TextCevap
                }</p>
              </div>
              :
              console.log("eşleşme yok")
            ))}
            <div className="survey-detail-chart">
              <Chart
                className="chart-background"
                type="bar"
                height={200}
                options={{
                  chart: {
                    stacked: true,
                    stackType: "100%",
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    },
                  },
                  xaxis: {
                    // title: {
                    //     text: "Müşteri Memnuniyet Anketi Cevaplar",
                    // },
                    categories: [""],
                  },
                }}
                series= {[ {
                  name : "Kararsızım",
                  data: [45],  
  
                },
                {
                  name : "Evet",
                  data: [55],
                }
                ]}
              />
            </div>
          </div>
        </>
      ))}
      </div>
    </>
  );
};

export default SurveyDetail;
