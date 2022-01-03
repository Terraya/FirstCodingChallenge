import React, {FC, useEffect, useState} from 'react';
import {axios} from "../globalSettings/Axios";
import {Form} from "react-bootstrap";

export const Categories: FC = () => {

    const [availableCategories, setAvailableCategories] = useState<string[]>();
    const [randomFact, setRandomFact] = useState<string>("");
    const [randomCategoryFact, setRandomCategoryFact] = useState<string>("");


    const [inputString, setInputString] = useState<string>("");
    const [freeTextResult, setFreeTextResult] = useState();

    const [apiError, setApiError] = useState("");


    const handleApiError = (data: any) => {
        // Do something depending on the error
    }

    const getCategories = async () => {
        const response = await axios.get("https://api.chucknorris.io/jokes/categories").catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setAvailableCategories(response.data)
        }
    }

    const getRandomCategorieFact = async (categorie: string) => {
        const response = await axios.get("https://api.chucknorris.io/jokes/random?category=" + categorie).catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setRandomFact(response.data.value)
        }
    }

    const getFacts = async(freeText: string) => {
        let query = "https://api.chucknorris.io/jokes/search?query=" + freeText;
        const response = await axios.get(query).catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setFreeTextResult(response.data.result[0].value);
        }
    }

    const getRandomCategoryFact = async() => {
        let randomCategory = Math.floor(Math.random() * availableCategories?.length!);
        const response = await axios.get("https://api.chucknorris.io/jokes/random?category=" + availableCategories![randomCategory]).catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setRandomCategoryFact(response.data.value)
        }
    }

    const handleChange = async(e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInputString(newValue);
    }

    const displayCategories = () => {
        return (
            <ul>
                {availableCategories?.map(item => (
                    <li key={item}> {item}
                        <button onClick={() => getRandomCategorieFact(item)}>
                            Random Fact
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    useEffect(() => {
        getCategories();
    }, [inputString])

    return <div>
        {displayCategories()}
        {randomFact}
        <hr />
        <button onClick={() => getRandomCategoryFact()}>Random Fact by Random Categorie</button>
        <p>{randomCategoryFact}</p>
        <hr />
        <p>Search facts by written text</p>
        <input onChange={handleChange} />
        <button onClick={() => getFacts(inputString)}>search</button>
        <p>Query: {inputString} </p>
        <p>Free Text Result: </p>
        <br />
        {freeTextResult}
    </div>
}
