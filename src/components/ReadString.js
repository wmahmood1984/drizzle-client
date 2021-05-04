import React, { useEffect, useState,useContext } from 'react'
import { DrizzleContext } from "@drizzle/react-plugin"

const ReadString = () => {

    const [dataKey, setDataKey] = useState(null)
    const drizzleData = useContext(DrizzleContext.Context)

    useEffect(()=>{
        const {drizzle} = drizzleData;
        const contract = drizzle.contracts.ERC721;
        
        const datakey = contract.methods["getData"].cacheCall();
        setDataKey(datakey)
        // eslint-disable-next-line
    },[])


   const { ERC721 } = drizzleData.drizzleState.contracts;

   

    // using the saved `dataKey`, get the variable we're interested in
    const adopter = ERC721.getData[dataKey];

    const [stackId,setStackId] = useState(null)
  
  
    const setValue = (id,i) => {
        const { drizzle, drizzleState } = drizzleData;
        const contract = drizzle.contracts.ERC721;
    
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods["Buy"].cacheSend(id, {
          from: drizzleState.accounts[0], value: adopter.value[i].price_in_wei,
        });
    
        // save the `stackId` for later reference
        setStackId(  stackId );
        
      };

// eslint-disable-next-line
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

    

    return (
        <div> 
          {adopter && adopter.value.map((entry,i)=>{
          

          return <div  style={{  margin: "auto", width: "50%", border: "solid", padding: "10px", marginBottom:"10px"}} key={i}> 
            <img style={{width : "300px", height: "300px"}} alt="140x140" data-src="holder.js/140x140" src={`https://gateway.pinata.cloud/ipfs/${entry.uri}`} data-holder-rendered="true"></img>
              <br/><br/>
              <strong>Breed</strong>: <span>{entry.breed}</span><br/>
              <strong>Age</strong>: <span>{entry.age}</span><br/>
              <strong>Price</strong>: <span>{Number(entry.price_in_wei/1000000000000000000)} ETH</span><br/>
              <strong>Location</strong>: <span>{entry.location}</span><br/><br/>
              <strong>Owner</strong>: <span>{entry.owner}</span><br/>
    
              <button
                      onClick={async()=>{setValue(entry.id,i)}}>Buy</button>
          </div>
    
          
          
          
          
          })} 
        </div>
    )
}

export default ReadString
