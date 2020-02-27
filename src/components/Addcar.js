import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });
    const [yearError, setYearError] = useState(false);
    const [priceError, setPriceError] = useState(false);

    const handleClickOpen = () => {
     setOpen(true);
    };

    const handleClose = () => {
     setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    };

    const addCar = () => {
        if(isNaN(car.year)===true && isNaN(car.price)===true){
            setYearError(true);
            setPriceError(true);
        }
        else if(isNaN(car.year)===true || car.year.length > 4) {
            setYearError(true);
            console.log(car.year);
        } else if (isNaN(car.price)===true || car.price < 0) {
            setPriceError(true);
        } else {
        props.saveCar(car);
        handleClose();
        }
    }

    return(
        <div>
        <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
            Add a new car
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New car</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="brand"
                value={car.brand}
                onChange={e => handleInputChange(e)}
                label="Brand"
                fullWidth
            />
            <TextField
                margin="dense"
                name="model"
                value={car.model}
                onChange={e => handleInputChange(e)}
                label="Model"
                fullWidth
            />
            <TextField
                margin="dense"
                name="color"
                value={car.color}
                onChange={e => handleInputChange(e)}
                label="Color"
                fullWidth
            />
            <TextField
                margin="dense"
                name="fuel"
                value={car.fuel}
                onChange={e => handleInputChange(e)}
                label="Fuel"
                fullWidth
            />
            <TextField
                margin="dense"
                name="year"
                value={car.year}
                onChange={e => handleInputChange(e)}
                label="Year"
                fullWidth
                error={yearError}
                helperText={yearError ? 'Year needs to be 4-digit number.':''}
            />
            <TextField
                margin="dense"
                name="price"
                value={car.price}
                onChange={e => handleInputChange(e)}
                label="Price"
                fullWidth
                error={priceError}
                helperText={priceError ? 'Price needs to be a number.':''}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={addCar} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}