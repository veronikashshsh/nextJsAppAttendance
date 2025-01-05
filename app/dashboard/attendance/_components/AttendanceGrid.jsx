import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment/moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50];

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },
    ])

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
    const numberOfDays = daysInMonth(moment(selectedMonth).format('YYYY'), moment(selectedMonth).format('MM'))
    const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1)

    useEffect(() => {
        if (attendanceList) {
            const userList = getUniqueRecord();
            setRowData(userList);

            daysArrays.forEach((date) => {
                setColDefs(prevData => [...prevData, {
                    field: date.toString(), width: 50, editable: true
                }])

                userList.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date)
                })
            })
        }
    }, [attendanceList])

    /**
     * used to check if user present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */

    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
        return result ? true : false
    }

    /**
     * used to mark student attendance
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    const onMarkAttendance = (day, studentId, presentStatus) => {

        const date = moment(selectedMonth).format('MM/yyyy')
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }

            GlobalApi.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast("Student id: " + studentId + ". Marked as present")
            })
        }
        else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast("Student id: " + studentId + ". Marked as absent")
                })
        }
    }

    return (
        <div
            style={{ height: 500 }}
        >
            <AgGridReact

                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    )
}

export default AttendanceGrid