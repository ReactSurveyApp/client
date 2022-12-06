import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import QRCode from "qrcode";
import "./styles/surveys.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [qr, setQr] = useState({});
  const navigate = useNavigate()
  const navigateToLogin = useCallback(() => navigate('/', {replace: true}), [navigate]);

  useEffect(() => {
      axios.get("http://localhost:8080/admin-login").then((response) => {
        if (response.data == false) {
          navigateToLogin()
        }
      });
    }, []);

  const GenerateQRCode = (url, guid) => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr({
          url: url,
          guid: guid,
        });
      }
    );
  };

  const fetchSurveys = async () => {
    const response = await axios.get("http://localhost:8080/surveys");
    setSurveys(response.data);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <>
      <Navbar />
      <div className="surveys-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Anket Adı</TableCell>
                <TableCell align="center">Cevaplanma Sayısı</TableCell>
                <TableCell align="center">Durum</TableCell>
                <TableCell align="center">GUID</TableCell>
                <TableCell align="center">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys.map((survey) => (
                <TableRow key={survey.Guid} component="th" scope="row">
                  <TableCell>{survey.AnketAdi}</TableCell>
                  <TableCell align="center">
                    {survey.AnketiYapanKullaniciSayisi / survey.SoruSayisi}
                  </TableCell>
                  <TableCell align="center">{survey.AnketDurumu}</TableCell>
                  <TableCell align="center">{survey.Guid}</TableCell>
                  <TableCell className="">
                    <Link
                    to={"/anket-detay/?guid=" + survey.Guid}
                      className="mr-2 shadow-md border border-green-300 text-green-600 p-2
                  hover:bg-gray-100 hover:border-green-600 transition duration-500 rounded"
                    >
                      DETAY
                    </Link>
                    <Button className="mr-2" variant="outlined" color="error">
                      PASİF YAP
                    </Button>
                    <Button
                      className="mr-2 shadow-lg"
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        GenerateQRCode(
                          "http://localhost:8080/survey-input?guid=" +
                            survey.Guid,
                          survey.Guid
                        );
                      }}
                    >
                      QR OLUŞTUR
                    </Button>
                    {qr.guid === survey.Guid && (
                      <>
                        <img className="w-24 h-24" alt="qr" src={qr.url} />
                        <a href={qr.url} download="qrcode.png">
                          Download
                        </a>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Surveys;
