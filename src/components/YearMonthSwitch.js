import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const YearMonthSwitch = ({ years, months, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <ButtonGroup variant="outlined" color="primary" aria-label="year switch" style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => setSelectedYear(selectedYear - 1)}
          variant="outlined"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.12)',
            color: 'white',
            borderWidth: '1px',
          }}
        >
          {selectedYear - 1}
        </Button>
        <Button
          onClick={() => setSelectedYear(selectedYear)}
          variant="contained"
          style={{
            backgroundColor: 'rgb(37, 138, 37)',
            color: 'white',
            borderWidth: '1px',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          {selectedYear}
        </Button>
        <Button
          onClick={() => setSelectedYear(selectedYear + 1)}
          variant="outlined"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.12)',
            color: 'white',
            borderWidth: '1px',
          }}
        >
          {selectedYear + 1}
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" color="primary" aria-label="month switch">
        {months.map((month, index) => (
          <Button
            key={index}
            onClick={() => setSelectedMonth(index + 1)}
            variant={selectedMonth === index + 1 ? 'contained' : 'outlined'}
            style={{
              backgroundColor: selectedMonth === index + 1 ? 'rgb(37, 138, 37)' : 'transparent',
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              borderWidth: '1px',
            }}
          >
            {month}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default YearMonthSwitch;
