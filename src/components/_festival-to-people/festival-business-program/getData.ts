export const getUsers=(rows: string)=>{
  const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

  return rowsArr.map(row=>{
    const [name, jobTitle, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {name, jobTitle, image}
  })
}

export const getSectionData=(data: string)=>{
  const [text]=Array.from(data.matchAll(/([\s\S]*?)<h4[^>]*>/ig)).map(m => m[1])
  const [moderatorRows, speakersRows]=Array.from(data.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
  const [moderatorsTitle, speakersTitle]=Array.from(data.matchAll(/<h4>(.*?)<\/h4>/gs)).map(m => m[1])

  return({
    text,
    moderatorsTitle,
    speakersTitle,
    moderators: getUsers(moderatorRows),
    speakers: getUsers(speakersRows)
  })
}
