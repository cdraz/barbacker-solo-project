import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserRecipeCard({ recipe }) {

    // Dispatch hook and store access
    const dispatch = useDispatch();

    //  MUI modal setup for detail view
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

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

    // Declare onSave
    // const onSave = () => {
    //     console.log('in onSave', details.fullDetails.strDrink, details.fullDetails.idDrink);
    //     dispatch({
    //         type: 'SAVE_RECIPE',
    //         payload: details.fullDetails.idDrink
    //     });
    // };

    // Declare onRemove
    const onRemove = () => {
        // console.log('in onRemove', details.fullDetails.strDrink, details.fullDetails.idDrink);
        // dispatch({
        //     type: 'REMOVE_RECIPE',
        //     payload: details.fullDetails.idDrink
        // });
    };

    return (
        <>
            <Card key={recipe.id} sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => {
                    setOpen(true);
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
                open={open}
                onClose={handleClose}
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
                                        <Typography component="p">
                                            <ul>
                                                {recipe.ingredients.map(ingredient => (
                                                        <li key={ingredient}>
                                                            {ingredient}
                                                        </li>
                                                ))}
                                            </ul>
                                        </Typography>
                                        <Typography component="p">
                                            {recipe.instructions}
                                        </Typography>
                                        <Button
                                            onClick={onRemove}
                                            variant="contained"
                                        >
                                            Remove
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                            : <Typography component="p">Loading recipe...</Typography>
                    }
                </Box>
            </Modal>
        </>
    )
};

export default UserRecipeCard;