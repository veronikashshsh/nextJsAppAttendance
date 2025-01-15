"use client";
import React, { useEffect, useState } from 'react'
import AddNewObject from './_components/AddNewObject'
import GlobalApi from '@/app/_services/GlobalApi';
import ObjectListTable from '@/components/ui/ObjectListTable';

function Object() {
  const [ObjectList, setObjectList] =useState([]);
  useEffect(()=>{
    GetAllObjects();
  },[])
  const GetAllObjects=()=>{
    GlobalApi.GetObjects().then(resp=>{
      setObjectList(resp.data);
    })
  }



  return (
    <div> <h2 className='font-bold text-2xl flex justify-between items-center'>addObject
    <AddNewObject/>
    </h2>
      <ObjectListTable objectList={ObjectList}/>
    </div>
  )
}

export default Object