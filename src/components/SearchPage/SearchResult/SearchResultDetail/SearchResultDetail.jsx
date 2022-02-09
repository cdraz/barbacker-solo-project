import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// MUI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SearchResultDetail({ recipe }) {
    
    // Dispatch hook
    const dispatch = useDispatch();

    // TODO: GET to cocktaildb api to get recipe details
    useEffect( () => {

    }, [])
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
        <Box key={recipe.idDrink} sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
    )
}

export default SearchResultDetail;