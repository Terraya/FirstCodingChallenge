import React, {FC, useState} from 'react';
import {axios} from "../../globalSettings/Axios";
import {ICategoryName} from "../../responses/Categorie";
import {ListGroup} from "react-bootstrap";

declare interface ICategoryList {
    readonly categories: ICategoryName[]
}

export const CategoryList: FC<ICategoryList> = ({categories}) => {

    const [randomFact, setRandomFact] = useState<string>("");

    const handleApiError = (data: any) => {
        setRandomFact("We encounter an Api Error")
    }

    const getRandomCategorieFact = async (categorie: ICategoryName) => {
        const response = await axios.get("https://api.chucknorris.io/jokes/random?category=" + categorie).catch(err => handleApiError(err.response.data));

        if (response && response.data) {
            setRandomFact(response.data.value)
        }
    }

    return (
        <div>
            <ListGroup>
                {categories?.map((item, index) => (
                    <ListGroup.Item key={index}> {item}
                        <button onClick={() => getRandomCategorieFact(item)}>
                            Random Fact
                        </button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {randomFact}
        </div>
    );
}
