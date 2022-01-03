import React, {FC, useState} from 'react'
import {axios} from "../../globalSettings/Axios";

declare interface ICategoryInput {
}

export const CategoryInput:FC<ICategoryInput> = () => {

    const [inputString, setInputString] = useState<string>("");
    const [freeTextResult, setFreeTextResult] = useState<string>();

    const handleApiError = (data:any) => {
        setFreeTextResult('An error occured')
    }

    const getFacts = async(freeText: string) => {
        let query = "https://api.chucknorris.io/jokes/search?query=" + freeText;
        const response = await axios.get(query).catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            if(response.data.result.length < 1)
                setFreeTextResult("No Result Found");
            else {
                setFreeTextResult(response.data.result[0].value);
            }
        }
    }

    const handleChange = async(e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInputString(newValue);
    }

    return (
        <div>
            <p>Search facts by written text</p>
            <input onChange={handleChange} />
            <button onClick={() => getFacts(inputString)}>search</button>
            <p>Free Text Result: </p>
            {freeTextResult}
        </div>
    )

}
