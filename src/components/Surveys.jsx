import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const Surveys = () => {

  const [surveys, setSurveys] = useState([])

  const fetchSurveys = async () => {
    const response = await axios.get('http://localhost:8080/surveys');
    setSurveys(response.data)
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Anket Adı</TableCell>
              <TableCell align="center" >Cevaplanma Sayısı</TableCell>
              <TableCell align="center" >Durum</TableCell>
              <TableCell align="center" >GUID</TableCell>
              <TableCell align="center" >İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.Guid} component="th" scope="row">
                <TableCell>{survey.AnketAdi}</TableCell>
                <TableCell align="center">{survey.AnketiYapanKullaniciSayisi}</TableCell>
                <TableCell align="center">{(survey.AnketDurumu)}</TableCell>
                <TableCell align="center">{survey.Guid}</TableCell>
                <TableCell className="">
                  <Button className = "mr-2" variant="outlined" color="success">DETAY</Button>
                  <Button className = "mr-2" variant="outlined" color="error">PASİF</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Surveys