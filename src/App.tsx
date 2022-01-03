import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {axios} from "./globalSettings/Axios";
import { CategoryList } from './components/categoryList/CategoryList';
import {CategoryInput} from "./components/categoryInput/CategoryInput";
import {ICategoryName} from "./responses/Categorie";



const App: FC = () => {

    const [availableCategories, setAvailableCategories] = useState<ICategoryName[]>();
    const [randomCategoryFact, setRandomCategoryFact] = useState<string>();

    const handleApiError = (data: any) => {
        setRandomCategoryFact("No ")
    }

    const getCategories = async () => {
        const response = await axios
            .get("https://api.chucknorris.io/jokes/categories")
            .catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setAvailableCategories(response.data)
            console.log(availableCategories);
        }
    }

    const getRandomCategoryFact = async() => {
        let randomCategory = Math.floor(Math.random() * availableCategories?.length!);
        const response = await axios
            .get("https://api.chucknorris.io/jokes/random?category=" + availableCategories![randomCategory])
            .catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setRandomCategoryFact(response.data.value)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return <div>
        <CategoryList categories={availableCategories!}/>
        <hr />

        <button onClick={() => getRandomCategoryFact()}>Random Fact by Random Categorie</button>
        <p>{randomCategoryFact}</p>
        <hr />

        <CategoryInput />
    </div>
}

export default App;
