import axios from "axios";

export default axios.create({
    baseURL: 'https://pronunciation-assessment1.p.rapidapi.com/pronunciation',
    headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': '76d01e8ba4msh87914598891c62ep1509adjsnf7658fa86d5f',
        'X-RapidAPI-Host': 'pronunciation-assessment1.p.rapidapi.com'
    }

})
