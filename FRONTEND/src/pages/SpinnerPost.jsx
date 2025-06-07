import React from 'react'
import { FadeLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
  };

const SpinnerPost = () => {
  return (
    <>
    <FadeLoader
    cssOverride={override}
    size={20}
    aria-label='Loading Spinner'
    data-testid="loader"
    
    />
    </>
  )
}

export default SpinnerPost