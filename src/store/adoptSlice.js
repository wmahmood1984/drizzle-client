import Web3 from 'web3'
import Adoption from '../contracts/ERC721.json'

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


var contract;
var addresses;

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
        //console.log(" init web3 called ")
        
        try {
            if(Web3.givenProvider){
                const web3 = new Web3(Web3.givenProvider);
                await Web3.givenProvider.enable()
                const networkId = await web3.eth.net.getId()
                const network = Adoption.networks[networkId]
                contract = new web3.eth.Contract(Adoption.abi, network.address);
                const contractOwner = await contract.methods._contractOwner().call()
                addresses = await web3.eth.getAccounts()
                console.log("contract",contract)
                console.log("owner", contractOwner)

                thunkApi.dispatch(loadAdopters({
                    contract: contract,
                    addresss: addresses[0]
               }))
                
                
                return {
                    web3,
                    contract,
                    address : addresses[0],
                    contractOwner,
                                   }
            }else {console.log("error in loading web3")}    
        } catch (error) {
            console.log("Error", error)
        }
        
    }
)



export const loadAdopters = createAsyncThunk(
    "loadAdopters",
    async({contract,address})=>{
        const adopterlist = await contract.methods.getData().call()
       console.log("adopter list called",adopterlist)

        return adopterlist;}
)



const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        adopters: [],
        toggle: false,
        contractOwner : null, 
    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        }
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
            state.contractOwner =  action.payload.contractOwner;
     
        },

        [loadAdopters.fulfilled] : (state,action)=>{
            state.adopters = action.payload;
        }
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions