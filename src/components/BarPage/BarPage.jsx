import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIngredientsButton from './AddIngredientsButton/AddIngredientsButton';
import BarIngredient from './BarIngredient/BarIngredient';
import './BarPage.css';

// Material UI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function BarPage() {

    // Store access, dispatch hook
    const barIngredients = useSelector(store => store.bar.userIngredientsReducer);
    const dispatch = useDispatch();

    // Call getIngredients on component load
    useEffect(() => {
        // Get ingredients from API for add form
        dispatch({ type: 'GET_INGREDIENTS' });
        // Get ingredients from Postgres for current user bar
        dispatch({ type: 'GET_BAR_INGREDIENTS' });
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ margin: 'auto' }} aria-label="ingredients table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '10%' }}>
                                <Typography component="h2" sx={{ fontWeight: 'bold' }}>Ingredients</Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ width: '90%' }}>
                                <AddIngredientsButton />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(barIngredients) ?
                            barIngredients.map(ingredient => (
                                <BarIngredient ingredient={ingredient} key={ingredient.id} />
                            ))
                            : <li>Loading user ingredients...</li>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BarPage;