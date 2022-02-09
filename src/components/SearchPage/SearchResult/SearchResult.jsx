import './SearchResult.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchResultDetail from './SearchResultDetail/SearchResultDetail';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function SearchResult({ recipe }) { 

    // Dispatch hook
    const dispatch = useDispatch();

    //  MUI modal setup for detail view
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card key={recipe.idDrink} sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => {
                        setOpen(true);
                        dispatch({
                            type: 'GET_SELECTED_RECIPE_DETAIL',
                            payload: recipe.idDrink
                        });
                    }}>
                    <CardMedia
                        className="recipeImage"
                        component="img"
                        height="140"
                        image={recipe.strDrinkThumb}
                        alt={recipe.strDrink}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {recipe.strDrink}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SearchResultDetail recipe={recipe} />
            </Modal>
        </>
    )
}

export default SearchResult;