import React from 'react'

const Categoryform = ({handleSubmit,value,setValue}) => {
   
  return (
    <>
   <form onSubmit={handleSubmit}>
  
    <div className="mb-3">
      <input type="text"  className="form-control" placeholder="New Category"
      value={value} onChange={(e)=>setValue(e.target.value)} />
    </div>
    <button className='btn btn-primary'>ADD</button>
</form>


    </>
  )
}

export default Categoryform
