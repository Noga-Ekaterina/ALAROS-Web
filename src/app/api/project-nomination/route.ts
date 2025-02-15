import {NextResponse} from "next/server";
import {IProject, IProjectsPage} from "@/types/data";
import {fetchData} from "@/utils/fetchData";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";

interface IDataRequest extends IProject{
  id: string
}
interface RevalidateRequest{
  data: IDataRequest
}

interface RevalidateResponse {
  error?: unknown;
  message?: string
}

interface IDataNominations{
  projectsPages: IProjectsPage[]
}

async function fetchNominations(){
  const data: IDataNominations|null= await fetchData(`
    query MyQuery {
      projectsPages {
        nominations {
          html
        }
      }
    }
  `)

  if (!data)
    return null
  console.log(data.projectsPages[0].nominations.html)

  return nominationsSProcessing(data.projectsPages[0].nominations.html).map(nomination=> ({id: nomination.number, title: nomination.title}))
}

export async function PUT(request: Request): Promise<NextResponse<RevalidateResponse>> {
  try {
    const body = (await request.json()) as RevalidateRequest;
    if (!body.data.nomination){
      return NextResponse.json(
          { message: "номинация не указана" },
          { status: 200}
      );
    }

    const nominations= await fetchNominations()

    if (!nominations)
      throw new Error("ошибка получения номинаций")

    let nominationId: string|null= null

    for (let nomination of nominations) {
      console.log({nt: nomination.title, nn:body.data.nomination.replaceAll("\n", "")})
      if (nomination.title==body.data.nomination.replaceAll("\n", "")){
        nominationId= nomination.id
        break
      }
    }

    if (!nominationId)
      throw new Error("в списке номинаций нет такой номинации")

    const result= await fetchData(`
      mutation {
        updateProject(where: {id: "${body.data.id}"}, data: {nominationId: "${nominationId}"}){
          nominationId
        }
      }
    `)

    if (!result)
      throw new Error("ошибка записи id номинации")

    return NextResponse.json(
        { message: `id номинации установлен: ${nominationId}` },
        { status: 200}
    );
  }  catch (error) {
    console.error('Error in revalidate route:', error);
    // Обрабатываем ошибки
    return NextResponse.json(
        { error: "ошибка сервера" },
        { status: 500 }
    );
  }
}