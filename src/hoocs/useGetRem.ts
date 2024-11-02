import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";

export const useGetRem=()=>{
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [rem, setRem] = useState(document.documentElement.clientWidth/ (mobileScreen? 390:1024))

  useEffect(() => {
    const handleResize=()=>{
      setRem(document.documentElement.clientWidth/ (mobileScreen? 390:1024))
    }

    window.addEventListener("resize", handleResize)

    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  useEffect(() => {
    setRem(document.documentElement.clientWidth/ (mobileScreen? 390:1024))
  }, [mobileScreen]);

  return rem
}