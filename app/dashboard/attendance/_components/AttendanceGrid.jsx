import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment/moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
//import { getUniqueRecord } from '@/app/_services/service';

ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50];

function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },
    ]);

     // Розрахунок кількості днів у місяці
     const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
     const numberOfDays = daysInMonth(
         moment(selectedMonth).format('YYYY'),
         moment(selectedMonth).format('MM') - 1 // month is zero-indexed
     )
         useEffect(() => {
        const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

        // Унікальні записи студентів
        const userList = getUniqueRecord();
        console.log(userList);

        // Додаємо динамічні колонки
        const newColDefs = [
            { field: 'studentId', filter: true },
            { field: 'name', filter: true },
            ...daysArrays.map((day) => ({
                field: day.toString(),
                width: 50,
                editable: true,
            })),
        ];

        // Оновлюємо дані рядків з динамічними днями
        const updatedRowData = userList.map((user) => {
            daysArrays.forEach((day) => {
                user[day] = isPresent(user.studentId, day);
            });
            return user;
        });

        // Оновлюємо стани
        setColDefs(newColDefs);
        setRowData(updatedRowData);
    }, [attendanceList]);

    const getUniqueRecord=()=>{
        const uniqueRecord=[];
        const existingUser=new Set;
    
        attendanceList?.forEach(record => {
            if(!existingUser.has(record.studentId)){
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });
    
        return uniqueRecord;
    }

    const isPresent = (studentId, day) => {
        const result = attendanceList.find(
            (item) => item.day == day && item.studentId == studentId
        );
        return result ? true : false;
    };

    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/yyyy');
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date,
            };

            GlobalApi.MarkAttendance(data).then((resp) => {
                console.log(resp);
                toast('Student id: ' + studentId + '. Marked as present');
            });
        } else {
            GlobalApi.MarkAbsent(studentId, day, date).then((resp) => {
                toast('Student id: ' + studentId + '. Marked as absent');
            });
        }
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e) =>
                    onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
                }
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
              
            />
        </div>
    );
}

export default AttendanceGrid;