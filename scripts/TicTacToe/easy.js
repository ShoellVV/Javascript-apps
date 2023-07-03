export class EasyMode {
    //metoda wykonania ruchu przez "AI"
    getMove = (fields, player) => {

        //wyciągnięcie z tablicy pustych pól
        const emptyIndexes = Object.entries(fields)
            .filter(fieldEntry => fieldEntry[1] === "")
            .map(fieldEntry => fieldEntry[0]);

        // "losowanie" indexu który jest pusty    
        const randomPositionIndex = Math.floor(Math.random() * emptyIndexes.length);
        
        //zwraca "losową" wartość z tablicy, aby "AI" wykonało ruch
        return emptyIndexes[randomPositionIndex];
    };
};