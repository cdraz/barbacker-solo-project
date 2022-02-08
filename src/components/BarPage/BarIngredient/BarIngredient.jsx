import { useDispatch } from 'react-redux';

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
        <li key={ingredient.ingredient.id}>
            {ingredient.ingredient.apiString}
            <button onClick={handleDelete}>
                ✕
            </button>
        </li>
    )
}

export default BarIngredient;