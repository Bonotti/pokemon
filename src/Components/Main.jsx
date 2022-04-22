import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";



const Main=() =>{


    // set pokemon data function to useState
    // useState allows us to use those state variables in function component
    const[pokeData,setPokeData]=useState([]);

    // initialize loading function
    const[loading,setLoading]=useState(true);

    // initialize API Link
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/");

    // create next url for next pokemons page
    const[nextUrl,setNextUrl]=useState();

    // create previous url
    const[prevUrl,setPrevUrl]=useState();

    const [pokeDex,setPokeDex]=useState();


    // create pokeFun function
    const pokeFun=async()=>{
        setLoading(true)
        // making API request
        const res=await axios.get(url);
        //console.log(res.data);
        // set next page url
        setNextUrl(res.data.next);
        // set previous page url
        setPrevUrl(res.data.previous);
        // call get pokemon function
        getPokemon(res.data.results);
        setPokeData([]);
        // disable loading function
        setLoading(false);
    }

    // create getPokemon method
    const getPokemon=async(res)=>{
        res.map(async(item)=>{
            // make api request
            const result = await axios.get(item.url)
            //store all objects in one array by calling setPokeData function
            //console.log(result.data)
            setPokeData(state=>{
                state=[...state,result.data]
                // Sort pokemons
                state.sort((a,b)=>a.id>b.id ? 1 : -1)
                return state;
            })
            
        })
    }
    

    //useEffect updates each time the url updates
    useEffect(()=>{
        
        pokeFun();
    },[url])
    return(
        <>
        <div className="container">
            <div className="left-content">
                
                <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)} />
                
                <div className="btn-group">

                    {prevUrl && <button onClick={()=>{
                        // show only current pokemons
                        setPokeData([]);
                        // update url when click
                        setUrl(prevUrl);
                    }}>Previous</button>}

                    
                    {nextUrl && <button onClick={()=>{
                        setPokeData([])
                        setUrl(nextUrl);
                    }}>Next</button>}
                </div>
            </div>
            <div className="right-content">
                <Pokeinfo data={pokeDex} />
            </div>
        </div>
        </>
    )
}

export default Main;