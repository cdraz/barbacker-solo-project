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

function AddRecipeButton() {

    // Store access for api ingredients, dispatch hook
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);
    const dispatch = useDispatch();

    //  MUI modal setup for detail view
    const [open, setOpen] = useState(false);

    // Form input state variables
    const [drinkNameInput, setDrinkNameInput] = useState('');
    const [ingredientInput, setIngredientInput] = useState([]);
    const [instructionsInput, setInstructionsInput] = useState('');
    const [imageInput, setImageInput] = useState();

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

    const onAddRecipe = event => {
        event.preventDefault();
        console.log('in onAddRecipe');

        // *TODO* Create new FormData to POST to server
        const newRecipe = new FormData();
        newRecipe.append('name', drinkNameInput);
        newRecipe.append('ingredients', ingredientInput);
        newRecipe.append('instructions', instructionsInput);
        newRecipe.append('image', imageInput);

        // Send FormData to saga to post to server
        dispatch({
            type: 'POST_USER_RECIPE',
            payload: newRecipe
        });

        // Close add recipe view
        setOpen(false);

        // Clear inputs
        setDrinkNameInput();
        setIngredientInput();
        setInstructionsInput();
        setImageInput();
    }


    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                size="small"
            >
                Add a Recipe
            </Button>
            <Modal
                open={open}
                sx={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <Typography component={"h5"}> Add a Recipe</Typography>
                    <br></br>
                    <form onSubmit={onAddRecipe}>
                        <Stack spacing={2}>
                            <TextField
                                required
                                label="Drink Name"
                                variant="outlined"
                                onChange={event => setDrinkNameInput(event.target.value)}
                            />
                            <Autocomplete
                                multiple
                                options={ingredients}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                limitTags={2}
                                onChange={(event, value) => setIngredientInput(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ingredients"
                                        placeholder="Ingredients"
                                    />
                                )}
                            />
                            <TextField
                                required
                                label="Instructions"
                                variant="outlined"
                                multiline
                                rows={3}
                                onChange={event => setInstructionsInput(event.target.value)}
                            />
                            <Button
                                variant="outlined"
                                component="label"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept=".jpg"
                                    onChange={event => setImageInput(event.target.files[0])}
                                    hidden
                                />
                            </Button>
                            <Typography component="p">
                                {imageInput ? imageInput.name : ''}
                            </Typography>
                        </Stack>
                        <br></br>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Add Recipe
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="text"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddRecipeButton;