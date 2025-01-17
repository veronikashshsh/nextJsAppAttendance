'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function ObjectSelect({selectedObject}) {

    const [object, setObject] = useState([]);
    useEffect(() => {
        GetAllObjectsList();
    }, []);

    const GetAllObjectsList = () => {
        GlobalApi.GetObjects().then(resp => {
            setObject(resp.data);
        })
    };

    return (
        <div>
            <select className='p-2 border rounded-lg'
            onChange={(e)=>selectedObject(e.target.value)}
            >
                <option value="">Select a grade</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
            </select>
        </div>
    )
}

export default ObjectSelect