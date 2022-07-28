import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("searched/"+input);
    }

  return (
    <FormStyle onSubmit={submitHandler}>
       <div>
        <FaSearch />
        <input 
            type="text" 
            placeholder="Search recipe..." 
            value={input}
            onChange={(e)=> setInput(e.target.value)} 
        />
       </div>
    </FormStyle>
  )
}

//Styled-components
const FormStyle = styled.form`
    margin: 0 15rem;
    div {
        width: 100%;
        position: relative;
    }
    input{
        border: none;
        background: linear-gradient(35deg, #4b4848, #4b4848);
        font-size: 1.3rem;
        color: #fff;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        &::placeholder{
            color: #fff;
            opacity: 0.5;
        }
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`;

export default Search