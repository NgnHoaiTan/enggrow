import axios from "axios";

export default axios.create({
    baseURL: 'https://mashape-community-urban-dictionary.p.rapidapi.com',
    headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': '76d01e8ba4msh87914598891c62ep1509adjsnf7658fa86d5f',
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
    }

})
