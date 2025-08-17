import parse from "html-react-parser";

export const nonBreakingSpaces=(str: string|null)=>{
  return str&& parse(str.replaceAll("^", "&nbsp;"))
}