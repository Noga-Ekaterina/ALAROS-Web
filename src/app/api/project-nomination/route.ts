import {NextResponse} from "next/server";
import {IProject, IProjectsPage} from "@/types/data";
import {fetchData} from "@/utils/fetchData";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import {unstable_cache} from "next/cache";

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

const fetchNominations= unstable_cache(async ()=>{
  const data= await fetchData<IDataNominations>(`
    query MyQuery {
      projectsPages {
        nominations {
          html
        }
      }
    }
  `)

  if (!data || typeof data==="string")
    return null

  return nominationsSProcessing(data.projectsPages[0].nominations.html).map(nomination=> ({id: nomination.number, title: nomination.title}))
}, ["projects-nominations"], {tags: ["ProjectsPage"]})

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
      if (nomination.title.trim()==body.data.nomination.replaceAll("\n", " ").replaceAll("^", " ").trim()){
        nominationId= nomination.id
        break
      }
    }

    if (!nominationId)
      throw new Error("в списке номинаций нет такой номинации")

    if (body.data.nominationId==nominationId){
      return NextResponse.json(
          { message: "id номинации уже установлен" },
          { status: 200}
      );
    }

    const updateResult= await fetchData(`
      mutation {
        updateProject(where: {id: "${body.data.id}"}, data: {nominationId: "${nominationId}"}){
          nominationId
        }
      }
    `)

    if (!updateResult)
      throw new Error("ошибка записи id номинации")

    const publishResult= await fetchData(`
      mutation {
        publishProject(where: {id: "${body.data.id}"}, to: PUBLISHED) {
            stage
        }
      }
    `)

    if (!publishResult)
      throw new Error("ошибка публикации")

    return NextResponse.json(
        { message: `id номинации установлен: ${nominationId}` },
        { status: 200}
    );
  }  catch (error) {
    console.error('Error in revalidate route:', error);
    // Обрабатываем ошибки
    return NextResponse.json(
        { error: error instanceof Error? error.message :"ошибка сервера" },
        { status: 500 }
    );
  }
}