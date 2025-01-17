import Student from "@/app/dashboard/students/page";
import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

/*export const GRADES=mysqlTable('grades', {
    id:int('id').primaryKey(),
    grade:varchar('grade', {length:10}).notNull()
});*/

export const STUDENTS=mysqlTable('students', {
    id: int('id').autoincrement().primaryKey(),
    name:varchar('name', {length:20}).notNull(),
    object:varchar('object', {length:10}).notNull(),
    address:varchar('address', {length:50}),
    contact:varchar('contact', {length:20}),
})

export const ATTENDANCE=mysqlTable('attendance',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId', {length:11}).notNull(),
    present:boolean('present').default(false),
    day: int('day', {length:11}).notNull(),
    date:varchar('date', {length:20}).notNull()
})

export const OBJECTS=mysqlTable('objects',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('name', {length:20}).notNull(),
    address: varchar('address', {length:50}),
    contact:varchar('contact', {length:20}),
})