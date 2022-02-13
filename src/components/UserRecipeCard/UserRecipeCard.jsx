import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI imports
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserRecipeCard({ recipe }) {

    // Dispatch hook and store access
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);

    //  MUI modal setup
    const [detailsOpen, setDetailsOpen] = useState(false);
    const handleDetailsClose = () => setDetailsOpen(false);
    const [editOpen, setEditOpen] = useState(false);
    const handleEditClose = () => window.alert('Please save changes or click cancel');

    // Form input state variables
    const [drinkNameInput, setDrinkNameInput] = useState(recipe.name);
    const [ingredientInput, setIngredientInput] = useState(recipe.ingredients);
    const [instructionsInput, setInstructionsInput] = useState(recipe.instructions);

    // Declare onDelete
    const onDelete = () => {
        console.log('in onDelete');
    }

    // Decelare onSaveChanges
    const onSaveChanges = () => {
        console.log('in onSaveChanges');
        dispatch({
            type: 'UPDATE_USER_RECIPE',
            payload: {
                id: recipe.id,
                name: drinkNameInput,
                ingredients: ingredientInput,
                instructions: instructionsInput
            }
        });
        setEditOpen(false);
        setDetailsOpen(true);
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
        <>
            <Card key={recipe.id} sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => {
                    setDetailsOpen(true);
                }}>
                    <CardMedia
                        className="recipeImage"
                        component="img"
                        height="140"
                        image={recipe.image}
                        alt={recipe.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {recipe.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={detailsOpen}
                onClose={handleDetailsClose}
                sx={{ overflow: 'scroll' }}
            >
                <Box key={recipe.id} sx={style}>
                    {
                        recipe ?
                            <>
                                <img src={recipe.image}></img>
                                <Typography variant="h6" component="h2">
                                    {recipe.name}
                                </Typography>
                                <Grid container spacing={1} columns={3}>
                                    <Grid item>
                                        <ul>
                                            {recipe.ingredients.map(ingredient => (
                                                <li key={ingredient}>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                        <Typography component="p">
                                            {recipe.instructions}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setDetailsOpen(false);
                                                setEditOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                            : <Typography component="p">Loading recipe...</Typography>
                    }
                </Box>
            </Modal>
            <Modal
                open={editOpen}
                onClose={handleEditClose}
                sx={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <img src={recipe.image} />
                    <form onSubmit={onSaveChanges}>
                        <TextField
                            required
                            label="Drink Name"
                            variant="standard"
                            defaultValue={recipe.name}
                            onChange={event => setDrinkNameInput(event.target.value)}
                        />
                        <Autocomplete
                            multiple
                            options={ingredients}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            defaultValue={recipe.ingredients}
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
                            variant="standard"
                            defaultValue={recipe.instructions}
                            multiline
                            rows={3}
                            onChange={event => setInstructionsInput(event.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            onClick={() => {
                                setEditOpen(false);
                                setDetailsOpen(true);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
};

export default UserRecipeCard;