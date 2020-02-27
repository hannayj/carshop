import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';
import Snackbar from '@material-ui/core/Snackbar';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [success, setSuccess] = useState({open: false, message: ''});

    const handleClose = () => {
     setSuccess(false);
    };

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then (response => response.json())
        .then (data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(response => {
            setSuccess({open: true, message: 'Car deleted'});
            fetchData()
        })
        .catch(err => {
            setSuccess({open: true, message: 'Error in deleting car'});
            console.error(err)
        })
        }
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            setSuccess({open: true, message: 'Car added'});
            fetchData()
        })
        .catch(err => {
            setSuccess({open: true, message: 'Error in adding car'});
            console.error(err)
        })
    }

    const updateCar = (car, link) => {
        fetch(link, {            
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)   
        })
        .then(response => {
            setSuccess({open: true, message: 'Car info edited'});
            fetchData()
        })
        .catch(err => {
            setSuccess({open: true, message: 'Error in editing car info'});
            console.error(err)
        })
    }

    const columns = [
        {
            Header: 'Brand',
            accessor: 'brand'

        },
        {
            Header: 'Model',
            accessor: 'model'

        },
        {
            Header: 'Color',
            accessor: 'color'

        },
        {
            Header: 'Fuel',
            accessor: 'fuel'

        },
        {
            Header: 'Year',
            accessor: 'year'

        },
        {
            Header: 'Price',
            accessor: 'price'

        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcar car={row.original} updateCar={updateCar}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => <Button size="small" variant="outlined" color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button>
        },

    ]

    return(
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={success.open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={success.message}
            />
            <Addcar saveCar={saveCar} />
            <ReactTable sortable={true} filterable={true} data={cars} columns={columns} />
        </div>
    );
}