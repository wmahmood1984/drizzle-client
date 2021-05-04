import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/adoptSlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PetList = () => {



  const classes = useStyles();
  const dispatch = useDispatch()
  const adopter = useSelector((state)=>{
    return state.adoptReducer.adopters;
  })

  const contract = useSelector((state)=>{
    return state.adoptReducer.contract;
  })

  const address = useSelector((state)=>{
    return state.adoptReducer.address;
  })

  const [price,setPrice]=useState(0)

  console.log("address",adopter)
  return (
    <Grid container className={classes.root} spacing={2}>
      {adopter && adopter.map((entry,i)=>(
      
      
      <div key={i}>
        <img style={{width : "300px", height: "300px"}} alt="140x140" data-src="holder.js/140x140" src={entry.uri} data-holder-rendered="true"></img>
          <br/><br/>
          <strong>Breed</strong>: <span>{entry.breed}</span><br/>
          <strong>Age</strong>: <span>{entry.age}</span><br/>
          <strong>Price</strong>: <span>{Number(entry.price_in_wei/1000000000000000000)} ETH</span><br/>
          <strong>Location</strong>: <span>{entry.location}</span><br/><br/>
          <strong>Owner</strong>: <span>{entry.owner}</span><br/>

          <button
                  onClick={async()=>{
                    
                    const result = await contract.methods.Buy(entry.id).send({from: address, value: entry.price_in_wei})
                    console.log('result ', result)
                    dispatch(toggle())
                    }}>Buy</button>
      </div>

      
      
      
      
      ))} 
    </Grid>
  )
}

export default PetList;


