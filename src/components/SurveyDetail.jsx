import React from 'react'
import './styles/surveydetail.css'
import Chart from "react-apexcharts";
import Navbar from './Navbar';
const SurveyDetail = () => {
    return (
        <>
            <Navbar />
            <div className='survey-detail-container'>
                <div className='survey-detail-title-area'>
                    <h1 className='survey-detail-title'>Müşteri Memnuniyet Anketi</h1>
                </div>
                <div className='survey-detail-area'>
                    <div className='survey-detail-question-area'>
                        <span className='survey-detail-question'>{"1) Müşteri Memnuniyet Anketi Soru?"}</span>
                    </div>
                    <div className='survay-detail-answer-area'>
                        <p className='survay-detail-answer'>Müşteri Memnuniyet Anketi Cevap 1</p>
                        <p className='survay-detail-answer'>Müşteri Memnuniyet Anketi Cevap 2</p>
                        <p className='survay-detail-answer'>Müşteri Memnuniyet Anketi Cevap 3</p>
                        <p className='survay-detail-answer'>Müşteri Memnuniyet Anketi Cevap 4</p>
                    </div>
                    <div className='survey-detail-chart'>
                        <Chart className="chart-background"
                            type='bar'
                            height={200}
                            series={[
                                {
                                    name: "Müşteri Memnuniyet Anketi Cevap 1",
                                    data: [45]
                                },
                                {
                                    name: "Müşteri Memnuniyet Anketi Cevap 2",
                                    data: [125]
                                },
                                {
                                    name: "Müşteri Memnuniyet Anketi Cevap 3",
                                    data: [55]
                                },
                                {
                                    name: "Müşteri Memnuniyet Anketi Cevap 4",
                                    data: [190]
                                }
                            ]}
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
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurveyDetail