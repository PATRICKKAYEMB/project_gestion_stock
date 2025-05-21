import React from 'react'
import { FadeLoader } from "react-spinners";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
  };

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80vh]">
    <FadeLoader 
        cssOverride={override}
        size={450}
        aria-label="Loading Spinner"
        data-testid="loader"

/>

</div>
  )
}

export default Spinner