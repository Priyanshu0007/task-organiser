import Configuration from "openai";
import OpenAIApi from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai=null //= new OpenAIApi(configuration);
export default openai;