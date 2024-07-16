import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Switch, FormControlLabel, Box, Grid, Typography, Select, MenuItem } from '@mui/material';

const AddValueDialog = ({ open, onClose, onChange, onSubmit, value, categories }) => {
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    onChange({ target: { name, value: checked } });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Value</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the new value.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={value.name}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          value={value.amount}
          onChange={onChange}
          InputProps={{
            style: {
              borderColor: value.amount ? 'rgb(37, 138, 37)' : undefined,
            },
          }}
        />
        <TextField
          margin="dense"
          name="category_id"
          select
          label="Category"
          fullWidth
          value={value.category_id}
          onChange={onChange}
          InputProps={{
            style: {
              borderColor: value.category_id ? 'rgb(37, 138, 37)' : undefined,
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Box
          mt={2}
          mb={2}
          sx={{
            border: '1px solid rgb(118, 118, 118)',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs>
              <Typography variant="body1">Recurrence</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={value.recurrence}
                onChange={handleSwitchChange}
                name="recurrence"
                color="primary"
                sx={{ transform: 'scale(1.5)' }} // Aumenta o tamanho do Switch
              />
            </Grid>
          </Grid>
        </Box>
        {value.recurrence && (
          <>
            <TextField
              margin="dense"
              name="parcels"
              label="Parcels"
              type="number"
              fullWidth
              value={value.parcels}
              onChange={onChange}
              InputProps={{
                style: {
                  borderColor: value.parcels ? 'rgb(37, 138, 37)' : undefined,
                },
              }}
            />
            <TextField
              margin="dense"
              name="start_date"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={value.start_date}
              onChange={onChange}
              InputProps={{
                style: {
                  borderColor: value.start_date ? 'rgb(37, 138, 37)' : undefined,
                },
              }}
            />
            <TextField
              margin="dense"
              name="due_day"
              label="Due Day"
              type="text"
              fullWidth
              value={value.due_day}
              onChange={onChange}
              InputProps={{
                style: {
                  borderColor: value.due_day ? 'rgb(37, 138, 37)' : undefined,
                },
              }}
            />
          </>
        )}
        {!value.recurrence && (
          <TextField
            margin="dense"
            name="due_date"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={value.due_date}
            onChange={onChange}
            InputProps={{
              style: {
                borderColor: value.due_date ? 'rgb(37, 138, 37)' : undefined,
              },
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddValueDialog;
