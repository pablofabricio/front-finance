import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent, Divider, IconButton, Collapse, Skeleton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Add as AddIcon } from '@mui/icons-material';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import Sidebar from './Sidebar';
import YearMonthSwitch from './YearMonthSwitch';
import api from '../services/api-finance';
import AddValueDialog from './AddValueDialog';  // Importando o novo componente

const SkeletonCard = () => (
  <Card variant="outlined" style={{ marginBottom: '20px' }}>
    <CardContent>
      <Skeleton variant="text" width="30%" height={20} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" width="50%" />
        </Box>
        <Box display="flex" alignItems="center">
          <Skeleton variant="text" width="50%" />
        </Box>
      </Box>
      <Divider style={{ margin: '10px 0' }} />
      <Box display="flex" alignItems="center">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="20%" />
      </Box>
      <Box display="flex" alignItems="center" marginTop="10px">
        <Skeleton variant="text" width="60%" />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop="10px">
        <Skeleton variant="text" width="30%" />
      </Box>
    </CardContent>
  </Card>
);

const Home = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [budget, setBudget] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [newValue, setNewValue] = useState({
    category_id: '',
    name: '',
    description: '',
    amount: '',
    recurrence: false,
    parcels: '',
    start_date: '',
    end_date: '',
    due_date: '',
    due_day: ''
  });
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [loading, setLoading] = useState(true); // Estado para controlar o estado de carregamento

  useEffect(() => {
    // Função para buscar os dados do dashboard
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);

        if (response.data && response.data.reports) {
          const report = response.data.reports.find(report => report.year === selectedYear);
          if (report) {
            setBudget(report.budget);
          }
        }

        // Definir as categorias recebidas do backend
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Marca o carregamento como completo, independentemente do resultado
      }
    };

    fetchData(); // Chamar a função de busca de dados
  }, [selectedYear]);

  // Função para abrir o diálogo de adicionar valor
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Função para fechar o diálogo de adicionar valor
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Função para lidar com mudanças nos campos do novo valor
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com submissão do novo valor
  const handleAddValue = () => {
    console.log(newValue); // Lógica para adicionar o novo valor à categoria selecionada
    handleDialogClose();
  };

  const toggleCard = (index) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const reportYears = data?.reports?.map(report => report.year); // Verificação opcional para evitar erros de acesso a propriedades nulas

  if (loading) {
    // Mostrar skeleton enquanto os dados estão sendo carregados
    return (
      <Box display="flex" style={{ marginTop: '20px' }}>
        <Sidebar />
        <Box flexGrow={1} p={3}>
          <SkeletonCard />
          <Grid container spacing={3}>
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" style={{ marginTop: '20px' }}>
      <Sidebar />
      <Box flexGrow={1} p={3}>
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
          <CardContent>
            <YearMonthSwitch
              years={reportYears}
              months={months}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" borderRadius="5px" border="1px solid rgb(37, 138, 37)" p={1}>
                <IconButton
                  onClick={handleDialogOpen}
                  style={{ color: 'rgb(37, 138, 37)', fontSize: '2rem' }}
                >
                  <AddIcon style={{ fontSize: '3rem' }} />
                </IconButton>
                <Typography variant="subtitle3" component="span" mr={1}>
                  <strong>Value</strong>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" borderRadius="5px" border="1px solid rgb(37, 138, 37)" p={1}>
                <Typography variant="h6" gutterBottom>
                  <strong>Budget</strong> per month {budget ? `R$ ${budget.toFixed(2)}` : 'No budget available'}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {data.categories && data.categories.map((category, index) => {
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
                        style={{ float: 'right', color: totalStyle.backgroundColor }}
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
        {/* Componente AddValueDialog com propriedades */}
        <AddValueDialog
          open={openDialog}
          onClose={handleDialogClose}
          onChange={handleInputChange}
          onSubmit={handleAddValue}
          value={newValue}
          categories={categories} // Passando as categorias como propriedade
        />
      </Box>
    </Box>
  );
};

export default Home;
