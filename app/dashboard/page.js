"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import moment from 'moment'
import GlobalApi from '../_services/GlobalApi'
import StatusList from './_components/StatusList'

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();

  useEffect(() => {
    getStudentAttendance();
    //GetTotalPresentCountByDay();
  }, [selectedMonth])

  useEffect(()=> {
    getStudentAttendance();
    //GetTotalPresentCountByDay();
  }, [selectedGrade])


  /**
   * used to get student attendance for give month and date
   */

  const getStudentAttendance = () => {
    GlobalApi.getAttendanceList(selectedGrade, moment(selectedMonth).format('MM/yyyy'))
      .then(resp => {
        console.log("Attendance Data:", resp.data);
        setAttendanceList(resp.data)
      })
  }

  /*const GetTotalPresentCountByDay = () => {
    GlobalApi.GetTotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'))
      .then(resp => {
        setTotalPresentData(resp.data)
        console.log("Attendance Data111:", resp.data);
      })
  }*/

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />
      </div>
  )
}


export default Dashboard 