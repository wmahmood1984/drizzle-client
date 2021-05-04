import React, { useEffect, useState,useContext } from 'react'
import { DrizzleContext } from "@drizzle/react-plugin"
import ipfs from '../ipfs'

const SetString = () => {

    const [stackId,setStackId] = useState(null)
    const [price,setPrice] = useState()
    const [breed,setBreed] = useState()
    const [loc,setLoc] = useState()
    const [age,setAge] = useState()
    const [fileHash,setFileHash] = useState()
  
    const [dataKey, setDataKey] = useState(null)

    const drizzleData = useContext(DrizzleContext.Context)

    useEffect(()=>{
        const {drizzle} = drizzleData;
        const contract = drizzle.contracts.ERC721;
        
        const datakey = contract.methods["_contractOwner"].cacheCall();
        setDataKey(datakey)

        // eslint-disable-next-line
    },[])


   const { ERC721 } = drizzleData.drizzleState.contracts;

  const owner = ERC721._contractOwner[dataKey]

   
   const currentAccount = drizzleData.drizzleState.accounts[0];
   
  //  console.log("owner",owner)
  //  console.log("address",currentAccount)
   

    // using the saved `dataKey`, get the variable we're interested in
    
    
    
    const setValue = (uri,price, breed,loc,age) => {
        const { drizzle, drizzleState } = drizzleData;
        const contract = drizzle.contracts.ERC721;
    
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods["_mint"].cacheSend(uri,price,breed,loc,age, {
          from: drizzleState.accounts[0]
        });
    
        // save the `stackId` for later reference
        setStackId(  stackId );
        setFileHash("")
        setPrice()
        setBreed("")
        setLoc("")
        setAge()
      };


      const getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = drizzleData.drizzleState;
        
    
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[stackId];
    
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;
    
        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
      };

      var imageBugger;
      

      const captureFile = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async ()=>{
         imageBugger = Buffer(reader.result)
          console.log("buffer",imageBugger)

        
        
        }


      }
      
      const handleSubmit = async (e)=>{
        e.preventDefault()

        await ipfs.files.add(imageBugger, (error,result)=>{
          if(error){
            console.error("error",error)
            return
          }
          setFileHash(result[0].hash);
          console.log(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`);
        })

      }

   

        return (
          <div style={{ width:"800px", margin: "auto", background: "thistle"}}>
            {owner && owner.value === currentAccount? 
            <div>

            <form onSubmit={handleSubmit}> <strong>Upload your file on IPFS</strong>
              <br/>
              <input type='file' onChange={captureFile}></input>
              <input type='submit'></input>
            </form>
  
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
              onClick={()=>{setValue(fileHash,price,breed,loc,age)
                
              }}
              >Mint</button>
  
              <div>{getTxStatus()}</div> 
    
          </div>
            
            
            : <h2>you can mint your token by shifting to owners address : </h2>}  
          </div>

          
    
    )
}

export default SetString


//{uri:"abc",price:2, breed:"abc",loc:"abc",age:2}