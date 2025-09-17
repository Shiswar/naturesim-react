
export interface ApiResponse<T>{
    success: boolean;
    data: T;
    error?: string;
}

async function getRandom(wordLength: number = 5, limit: number = 1): Promise<string | null> {
    try {
        const response = await fetch(`https://random-word-api.vercel.app/api?words=${limit}&length=${wordLength}`);
        const data = await response.json();
        return data[0];
    }
    catch (er) {
        console.log('Error fetching word');
        return null;
    }
}

async function searchDictionary(word: string): Promise<ApiResponse<string | null>> {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        if (response.status === 200){
            const apiResponse: ApiResponse<string> = {
                success: true,
                data: word
            }
            return apiResponse;
        }
        else{
            const apiResponse: ApiResponse<string> = {
                success: false,
                data: word,
                error: `${word} is not a word`
            }
            return apiResponse;
        }
    }
    catch(er){
        return {
            success: false,
            data: null,
            error: er
        } as ApiResponse<null>;
    }
}

export {
    getRandom,
    searchDictionary
};