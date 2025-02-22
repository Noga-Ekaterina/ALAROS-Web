import axios from "axios";

export const fetchData=async (query: string)=> {
  try{
    const resp= await axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Authorization': process.env.TOKEN
      },
      data: {
        query
      }
    })

    if (resp.data.errors) {
      // 3. Обрабатываем ошибки GraphQL
      console.error("Hygraph Errors:", resp.data.errors);
      throw new Error("GraphQL request error");
    }

    return resp.data.data
  }catch (err){
    console.log(err)
    return null
  }
}

export const getNewsQueryStr=(page: number)=>(
    `
            newsAll(orderBy: date_DESC, first: ${10 * page}, skip: ${10 * (page - 1)}) {
              date
              cover
              description
              title
              slug
              body { html}
            }
    `
)

export const getProjectsQueryStr= (year: undefined| string, nomination: undefined |string, page: number)=>{
  const nominationFilter= nomination? `nominationId: "${nomination}"`:''
  const yearFilter= year? `year: ${year}, `:""

  return (`
    projectsConnection(
      stage: PUBLISHED,
      where: {${yearFilter}${nominationFilter}},      first: ${10 * page}, skip: ${10 * (page - 1)}
    ) {
      aggregate {
        count
      }
    }
    projects(
      where: {${yearFilter}${nominationFilter}},
      first: ${10 * page}, skip: ${10 * (page - 1)}
    ){
      name
      nomination
      number
      diploma
      year
      winner
      cover
      images
    }
  `)
}
