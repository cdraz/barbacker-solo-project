import { useState } from 'react';

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

    const onAddRecipe = event => {
        event.preventDefault();
        console.log('in onAddRecipe');
    }


    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
            >
                Add a Recipe
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <form onSubmit={onAddRecipe}>
                        <TextField
                            required
                            label="Drink Name"
                            variant="standard"
                        />
                        <TextField
                            required
                            label="Instructions"
                            variant="standard"
                            multiline
                            rows={3}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                        >
                            Upload Image
                            <input
                                type="file"
                                accept=".jpg"
                                hidden
                            />
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Add Recipe
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddRecipeButton;