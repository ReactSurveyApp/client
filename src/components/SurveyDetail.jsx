import React, { useState, useEffect, useContext } from "react";
import "./styles/surveydetail.css";
import Chart from "react-apexcharts";
import Navbar from "./Navbar";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { ImRadioChecked } from "react-icons/im";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";


const SurveyDetail = () => {
  const [searchParams] = useSearchParams();
  const surveyGuid = searchParams.get("guid");
  const [survey, setSurvey] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [series, setSeries] = useState([]);
  const [cevapSayisi, setCevapSayisi] = useState(440);


  let cevaplarDistinct = [];
  let esitMi = false;

  useEffect(() => {
    const validateSurvey = async () => {
      const response = await axios
        .post(`http://localhost:8080/get-survey-name`, {
          guid: surveyGuid,
        })
        .then((response) => {
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

  const getAnswerCount = (questionId, answerId) => {

    const response = axios
    .post('http://localhost:8080/get-answer-count', {
      qid : questionId,
      aid : answerId
    })
    .then((response) => {
     console.log("cevap sayisi: ", response)
    });

    //setCevapSayisi(response.data)
   // console.log("dataaa");
 
  }  

  const getDistinctAnswerCount = async (soruId, liste) => { 
    const response = await axios
      .post("http://localhost:8080/distinct-answer-count", {
        soruid: soruId,
      })
      .then((response) => {
        liste = response.data;
      });
  };

  
  return (
    <>
      <Navbar />
      <div className="survey-detail-container flex flex-col ">
        <div className="survey-detail-title-area">
          <h1 className="survey-detail-title">ANKET ADI : {surveyName} </h1>
        </div>
        {survey.map(
          (soru, index) => (
            getDistinctAnswerCount(soru.SoruID, cevaplarDistinct),
            (
              <>
                <div className="survey-detail-area border border-gray-200 rounded" key={index}>
                  <div className="survey-detail-question-area">
                    <span className="survey-detail-question">
                      Soru {index + 1} : {soru.TextSoru}{" "}
                    </span>
                  </div>
                  {answers.map((ans, index) =>
                    Number(ans.SoruID) === Number(soru.SoruID) ? (
                      <div className="survay-detail-answer-area" key={index}>
                        <ImRadioChecked className="survay-detail-answer-icon" />
                        <p className="survay-detail-answer">{ans.TextCevap}</p>
                      </div>
                    ) : null
                  )}

                  {/* <div className="survey-detail-chart">
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
                      // series={[
                      //   { name: "şık1", data: [45] },
                      //   { name: "şık2", data: [23] },
                      //   { name: "şık3", data: [66] },
                      // ]}
                      // series= {
                      //   cevaplarDistinct.map((a) => ((
                      //     answers.forEach(el => {
                      //       if(Number(el.Id) === Number(a.CevapID) && esitMi === false) {
                      //         esitMi = true
                      //         setSeries({name:el.TextCevap , data : [31]})
                      //       }}
                      //   ))))
                      // }

                      // series={[
                      //   cevaplarDistinct.map((a) => {
                      //     answers.forEach((el) => {
                      //       if (
                      //         Number(el.Id) === Number(a.CevapID) &&
                      //         esitMi === false
                      //       ) {
                      //         esitMi = true;
                      //         return { name: el.TextCevap, data: [31] };
                      //       }
                      //     });
                      //   }),
                      // ]}
                    />
                  </div> */}
                  <div className="flex justify-center items-center">
                    <Accordion className="border border-gray-200 min-w-[80%]">
                      <AccordionSummary
                        // icon eklemek için expandIcon 
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Detaylar</Typography>
                      </AccordionSummary>

                      <AccordionDetails> 
                        {answers.map((a) => (
                          Number(a.SoruID) === Number(soru.SoruID) ?
                          getAnswerCount(a.SoruID, a.Id)
                          :null,
                          Number(a.SoruID) === Number(soru.SoruID) ?
                          <Typography>
                          {a.TextCevap} şıkkını seçen kullanıcı sayısı : {cevapSayisi}
                          </Typography> 
                          :null
                        ))}
                         
                      </AccordionDetails>

                    </Accordion>
                  </div>
                </div>
              </>
            )
          )
        )}
      </div>
    </>
  );
};

export default SurveyDetail;
