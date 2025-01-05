import { PieChart } from 'lucide-react'
import React from 'react'
import { Pie } from 'recharts'

function PieChartComponent() {
    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        }]
    return (
        <div>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value"
                 nameKey="name" cx="50%" cy="50%" 
                 outerRadius={50} fill="#8884d8" />
            </PieChart>
        </div>
    )
}

export default PieChartComponent