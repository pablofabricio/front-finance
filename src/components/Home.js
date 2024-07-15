import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent, Divider, IconButton, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import Sidebar from './Sidebar';
import YearMonthSwitch from './YearMonthSwitch';
import api from '../services/api-finance';

const Home = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [budget, setBudget] = useState(0);
  const [expandedCards, setExpandedCards] = useState({}); // Estado para controlar a expansão dos cards

  useEffect(() => {
    api.get('/dashboard')
      .then(response => {
        setData(response.data);
        if (response.data && response.data.reports) {
          const report = response.data.reports.find(report => report.year === selectedYear);
          if (report) {
            setBudget(report.budget);
          }
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedYear]);

  useEffect(() => {
    if (data && data.reports) {
      const report = data.reports.find(report => report.year === selectedYear);
      if (report) {
        setBudget(report.budget);
      } else {
        setBudget(0);
      }
    }
  }, [data, selectedYear]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const toggleCard = (index) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const reportYears = data.reports.map(report => report.year);

  return (
    <Box display="flex" style={{ marginTop: '20px' }}>
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <YearMonthSwitch
          years={reportYears}
          months={months}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Budget per month: {budget ? `R$ ${budget.toFixed(2)}` : 'No budget available'}
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {data.categories.map((category, index) => {
            const categoryBudget = budget * (category.percent / 100);
            const sumValues = category.values.reduce((total, item) => total + item.amount, 0);
            const isWithinBudget = sumValues <= categoryBudget;

            const totalStyle = {
              backgroundColor: isWithinBudget ? 'rgb(37, 138, 37)' : '#FF6347',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
              display: 'inline-block',
              marginBottom: '5px',
            };

            const iconColor = isWithinBudget ? 'rgb(37, 138, 37)' : '#FF6347';

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.name} {category.percent}%
                      <IconButton
                        onClick={() => toggleCard(index)}
                        size="small"
                        style={{ float: 'right' }}
                      >
                        {expandedCards[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1" gutterBottom>
                      R$ {categoryBudget.toFixed(2)}
                      <AssistantOutlinedIcon style={{ marginLeft: '5px', verticalAlign: 'middle', fontSize: '1.2rem', color: iconColor }} />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={totalStyle}>
                      R$ {sumValues.toFixed(2)}
                    </Typography>
                    <Collapse in={expandedCards[index]} timeout="auto" unmountOnExit>
                      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Type</TableCell>
                              <TableCell>Value</TableCell>
                              <TableCell>Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category.values.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.due_date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
