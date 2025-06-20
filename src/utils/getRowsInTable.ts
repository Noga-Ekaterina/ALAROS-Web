
export const getRowsInTable=(table: string)=>{
  const [rows]= Array.from(table.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
  const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

  return rowsArr
}