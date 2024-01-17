import React from 'react'

export default function Button() {
  return (
    <button onClick={()=>console.log("clicked")}>
        <p>ADD TO CART</p>
    </button>
  )
}
