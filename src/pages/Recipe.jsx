import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  }
  useEffect(() => {
    fetchDetails();
  }, [params.name])

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>       
        <p><GiHotMeal size={18} /> Dish Types : {details.dishTypes}</p>
       <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")} >Instructions</Button>
        <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")} >Ingredients</Button>
        {activeTab==="instructions" && (
          <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        )}
        {activeTab==="ingredients" && (
          <ul>
          {details.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        )}
          
      </Info>
    </DetailWrapper>
  ); 
}

//Styled-components
const DetailWrapper = styled.div`
  margin-top: 6rem;
  margin-bottom: 5rem;
  display: flex;
    .active{
      background: linear-gradient(35deg, #4b4848, #4b4848);
      color: white;
    }
    h2{
      margin-bottom: 1rem;
    }
    p{
      margin-bottom: 0.5rem;
      text-align: left;
      color: #4b4848;
      font-size: 13px;
      font-weight: 500;
      background: whitesmoke;
      width: fit-content;
      padding: 6px 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-transform: capitalize;
    }
    li{
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
    ul{
      margin-top: 2rem;
    }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  border-radius: 6px;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 400ms ease;
  &:hover{
    transform: scale(1.04);
  }
`

const Info = styled.div`
  margin-left: 4rem;
  h3{
    font-size: 1rem;
    text-align: justify;
    color: #000000be;
  }
  b{
    color: #000000e4;
  }
  a{
    color: #130949;
  }
`

export default Recipe