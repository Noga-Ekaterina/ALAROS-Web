import parse from "html-react-parser";

export const nonBreakingSpaces=(str: string)=>{
  return parse(str.replaceAll("^", "&nbsp;"))
}