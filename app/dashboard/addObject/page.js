"use client";
import React, { useEffect, useState } from 'react'
import ObjectGrid from './_components/ObjectGrid'
import GlobalApi from '@/app/_services/GlobalApi';
import ObjectListTable from '@/components/ui/ObjectListTable';

function addNewObject() {
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
    <div>addObject
      <ObjectListTable objectList={ObjectList}/>
    </div>
  )
}

export default addNewObject