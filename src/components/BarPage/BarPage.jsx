import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function BarPage() {

    // Store access, dispatch hook
    const store = useSelector(store => store);

    return (
        <div>
        <h3>Bar Page</h3>
        <button>Get ingredients</button>
        <select>
            
        </select>
        </div>
    )
}

export default BarPage;