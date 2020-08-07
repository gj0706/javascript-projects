import axios from 'axios';
export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(query){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes; // get the data and stores it in this.result
            // console.log(this.result);
        } catch(error){
            alert(error);
        }
    }
}





