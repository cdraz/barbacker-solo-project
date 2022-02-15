import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI imports
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserRecipeCard({ recipe, bar }) {

    // Dispatch hook and store access
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);

    //  MUI modal setup
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const handleEditClose = () => window.alert('Please save changes or click cancel');

    // Form input state variables
    const [drinkNameInput, setDrinkNameInput] = useState(recipe.name);
    const [ingredientInput, setIngredientInput] = useState(recipe.ingredients);
    const [instructionsInput, setInstructionsInput] = useState(recipe.instructions);

    // Declare onDelete
    const onDelete = () => {
        console.log('in onDelete');
        dispatch({
            type: 'DELETE_USER_RECIPE',
            payload: recipe.id
        });
        setEditOpen(false);
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
        width: 300,
        minHeight: 400,
        maxHeight: 650,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflow: 'scroll',
        p: 4,
        padding: 3
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
                        <Typography gutterBottom noWrap variant="h6" component="div">
                            {recipe.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={detailsOpen}
            >
                <Box key={recipe.id} sx={style}>
                    {recipe ?
                        <Card sx={{ padding: 0, margin: 0, border: 'none', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                height="220"
                                width="200"
                                image={recipe.image}
                                alt={recipe.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {recipe.name}
                                </Typography>
                                <Grid container spacing={1} columns={3}>
                                    <Grid item>
                                        <ul>
                                            {recipe.ingredients.map(ingredient => (
                                                <li key={ingredient} className={bar.some(barIngredient => barIngredient.apiString.toLowerCase() === ingredient.toLowerCase()) ? 'ownedIngredient' : 'unownedIngredient'}>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                </Grid>

                                <Typography component="p">
                                    {recipe.instructions}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setDetailsOpen(false);
                                        setEditOpen(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => setDetailsOpen(false)}
                                >
                                    Close
                                </Button>
                            </CardActions>
                        </Card>
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
                    <Card sx={{ padding: 0, margin: 0, border: 'none', boxShadow: 'none' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            width="200"
                            image={recipe.image}
                            alt={recipe.name}
                        />
                        <CardContent>
                            <form onSubmit={onSaveChanges}>
                                <Stack spacing={2} sx={{ marginBottom: 2 }}>
                                    <TextField
                                        required
                                        label="Drink Name"
                                        variant="outlined"
                                        defaultValue={recipe.name}
                                        onChange={event => setDrinkNameInput(event.target.value)}
                                    />
                                    <Autocomplete
                                        multiple
                                        options={ingredients}
                                        getOptionLabel={(option) => option}
                                        limitTags={2}
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
                                        variant="outlined"
                                        defaultValue={recipe.instructions}
                                        multiline
                                        rows={3}
                                        onChange={event => setInstructionsInput(event.target.value)}
                                    />
                                </Stack>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                        >
                                            Save 
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="button"
                                            variant="text"
                                            onClick={onDelete}
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="button"
                                            variant="text"
                                            onClick={() => {
                                                setEditOpen(false);
                                                setDetailsOpen(true);
                                            }}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </>
    )
};

export default UserRecipeCard;