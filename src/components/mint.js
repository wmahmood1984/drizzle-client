import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toggle} from '../store/adoptSlice'
import Web3 from 'web3'


const Mint = () => {


    const dispatch = useDispatch()
    const [uri,setUri] = useState()
    const [price,setPrice] = useState()
    const [breed,setBreed] = useState()
    const [age,setAge] = useState()
    const [loc,setLoc] = useState()

    const contract = useSelector((state)=>{
        return state.adoptReducer.contract;
      })
    
      const address = useSelector((state)=>{
        return state.adoptReducer.address;
      })

      const contractOwner = useSelector((state)=>{
        return state.adoptReducer.contractOwner;
      })

      

      var value = Web3.utils.toWei("1","ether");

      console.log('result ', value)
    
    return (

      <div>
        {contractOwner == address?

          <div>
          <label> Enter Pic URI <input value={uri} type="text" placeholder="Your URI here "
          onChange={({ target }) => setUri(target.value)}/></label>

          <br/>

          <label> Enter price here <input value={price} type="value"            
          onChange={({ target }) => setPrice(target.value)}/></label>

          <br/>

          <label> Breed <input value={breed} type="text"            
          onChange={({ target }) => setBreed(target.value)}/></label>

          <br/>

          <label> Age <input value={age} type="value"            
          onChange={({ target }) => setAge(target.value)}/></label>

          <br/>

          <label> Location <input value={loc} type="text"            
          onChange={({ target }) => setLoc(target.value)}/></label>


          <button
                onClick={async()=>{
                  const result = await contract.methods._mint(uri,price,breed,loc,age).send({from: address})
                  
                  dispatch(toggle())
                  setAge()
                  setPrice()
                  setBreed()
                  setLoc()
                  setUri()
                  }}>Mint</button>
          </div> : <h2>You can mint pets by switching to owner account : {contractOwner}</h2>}

      </div>
      
        
    )
}

export default Mint;
