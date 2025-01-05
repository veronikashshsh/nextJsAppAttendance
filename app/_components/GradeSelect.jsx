'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function GradeSelect({selectedGrade}) {

    const [grades, setGrades] = useState([]);
    useEffect(() => {
        GetAllGradesList();
    }, []);

    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(resp => {
            setGrades(resp.data);
        })
    };

    return (
        <div>
            <select className='p-2 border rounded-lg'
            onChange={(e)=>selectedGrade(e.target.value)}
            >
                <option value="">Select a grade</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
            </select>
        </div>
    )
}

export default GradeSelect