import { useDispatch } from 'react-redux';

// MUI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function BarIngredient(ingredient) {

    // Dispatch hook
    const dispatch = useDispatch();

    // Declare handleDelete
    const handleDelete = () => {
        console.log('in handleDelete');
        // Dispatch id to saga to delete from Postgres
        dispatch({
            type: 'DELETE_BAR_INGREDIENT',
            payload: ingredient.ingredient.id
        });
    }

    return (
        <TableRow key={ingredient.ingredient.id}>
            <TableCell align="left" sx={{ width: '90%' }}>
                {ingredient.ingredient.apiString}
            </TableCell>
            <TableCell align="right" sx={{ width: '10%' }}>
                <Button
                    variant="text"
                    onClick={handleDelete}
                >
                    ✕
                </Button>

            </TableCell>
        </TableRow>
    )
}

export default BarIngredient;