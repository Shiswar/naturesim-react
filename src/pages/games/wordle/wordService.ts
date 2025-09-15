export class WordService {
    private words:any;
    private initialized = false;
    
    constructor(){
        this.initializeData();
    }
    
    private async initializeData() {
        try {
            const wordData = await import('./5-letter-words.json');
            this.words = wordData.words;
            this.initialized = true;
            console.log('Words loaded:', this.words.length);
        } catch (error) {
            console.error('Failed to load words:', error);
        }
    }
    
    async isReal(word: string): Promise<boolean> {
        // Wait for initialization if not ready
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        return this.words.includes(word.toLowerCase());
    }
}