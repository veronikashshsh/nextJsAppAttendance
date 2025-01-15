const { default: axios } = require("axios");

const GetAllGrades = ()=>axios.get('/api/grade');

const CreateNewStudent=(data)=>axios.post('/api/student', data)

const GetAllStudents=()=>axios.get('/api/student');

const DeleteStudentRecord=(id)=>axios.delete('/api/student?id=' + id)

const getAttendanceList=(grade,month)=>axios.get('/api/attendance?grade='+grade+"&month="+month)

const MarkAttendance=(data)=>axios.post('/api/attendance', data);

const MarkAbsent=(studentId,day,date)=>axios.delete('/api/attendance?studentId='+studentId+"&day="+day+"&date="+date);

// adding objects

const AddObject=(data)=>axios.post('/api/object', data);

const GetObjects=()=>axios.get('/api/object');

const DeleteObjectRecord=(id)=>axios.delete('/api/object?id=' + id);



//const GetTotalPresentCountByDay=(date,grade)=>axios.get('/api/attendance?date='+date+"&grade="+grade);

export default{
    GetAllGrades,
    CreateNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    getAttendanceList,
    MarkAttendance,
    MarkAbsent,
    GetObjects,
    DeleteObjectRecord,
    AddObject
}
