import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function AddIngredientsButton() {

    // Store access for api ingredients, dispatch hook
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);
    const dispatch = useDispatch();

    //  MUI modal setup for detail view
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    // Set state variable
    const [ingredientInput, setIngredientInput] = useState([]);

    // Declare handleSubmit
    const handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit', ingredientInput);
        // Dispatch our submitted inputs to our Saga to POST to Postgres
        dispatch({
            type: 'POST_BAR_INGREDIENTS',
            payload: ingredientInput
        });
        // Close the modal
        setOpen(false);
    }

    // Modal style setup
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
            >
                Add Ingredients
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <Typography component={"h5"}> Add Ingredients</Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Check if ingredients are pulled from api yet, if not then display loading ingredients... */}
                        {Array.isArray(ingredients) ?
                            <Autocomplete
                                multiple
                                options={ingredients}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                onChange={(event, value) => setIngredientInput(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ingredients"
                                        placeholder="Ingredients"
                                    />
                                )}
                            />
                            : <p>Loading ingredients...</p>}
                        <input type="submit" />
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddIngredientsButton;