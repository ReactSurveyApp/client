import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import QRCode from 'qrcode'
import './styles/surveys.css'

const Surveys = () => {

  const [surveys, setSurveys] = useState([])
  const [qr, setQr] = useState({})

  const GenerateQRCode = (url, guid) => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) return console.error(err)
      setQr({
        url: url,
        guid: guid
      })
    })
  }

  const fetchSurveys = async () => {
    const response = await axios.get('http://localhost:8080/surveys');
    setSurveys(response.data)
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <div>
      <TableContainer className="shadow-lg" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-red-200">
              <TableCell>Anket Adı</TableCell>
              <TableCell align="center" >Cevaplanma Sayısı</TableCell>
              <TableCell align="center" >Durum</TableCell>
              <TableCell align="center" >GUID</TableCell>
              <TableCell align="center" >İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow className="bg-gray-100" key={survey.Guid} component="th" scope="row">
                <TableCell>{survey.AnketAdi}</TableCell>
                <TableCell align="center">{survey.AnketiYapanKullaniciSayisi}</TableCell>
                <TableCell align="center">{(survey.AnketDurumu)}</TableCell>
                <TableCell align="center">{survey.Guid}</TableCell>
                <TableCell className="">
                  <Button className="mr-2 shadow-lg" variant="outlined" color="success">DETAY</Button>
                  <Button className="mr-2 shadow-lg" variant="outlined" color="error">PASİF</Button>
                  <Button className="mr-2 shadow-lg" variant="outlined" color="secondary" onClick={() => {
                    GenerateQRCode(("http://localhost:8080/survey-input?guid=" + survey.Guid), survey.Guid)
                  }}>QR OLUŞTUR</Button>
                  {qr.guid === survey.Guid &&
                    <>
                      <img className="w-24 h-24" alt="qr" src={qr.url} />
                      <a href={qr.url} download="qrcode.png">Download</a>
                    </>
                  }

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='survays-list-pagination'>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </div>
    </div>
  )
}

export default Surveys