import { Button } from 'bootstrap'
import React from 'react'

function Products({productItem}) {
  return (
    <div>
        {productItem.map((productItem)=>(
            <div>
                <h3>{productItem.name}</h3>
                <div><Button>Apply job</Button>
                </div> 
                </div>
        ))}
    </div>
  )
}

export default Products