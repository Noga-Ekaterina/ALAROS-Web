import {IFormData, IFormInput, INomination} from "@/types/data";
import {geNextLetter} from "@/utils/getNextLetter";

export const getInitialValues=(inputs: IFormInput[], nameKey: "bidTableColumn" |"diplomaTableColumn"| "emailType", nominations?: INomination[],):IFormData=>{
  const result: IFormData={}

  inputs.forEach((input)=>{
    const name= input[nameKey]

    if (!input.values || (input.values.length==0 && input.type!=='nominations')){
      result[name]=''
    }else if (input.type==='nominations' && nominations) {
      result[name] = nominations[0].number.replace(".", ",")
      result[geNextLetter(name)] = nominations[0].title
    }
    else
      result[name]=input.values[0]
  })

  return result
}