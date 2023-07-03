import { winCond } from './winCond.js';

export class MediumMode {
    //metoda wykonania ruchu przez "AI"
    getMove = (fields, player) => {

        for(let i = 0; i <= 7; i++){
            const [posA, posB, posC] = winCond[i];
            const value1 = fields[posA];
            const value2 = fields[posB];
            const value3 = fields[posC];
            
            if (value1 === value2 && value1 !== "" && value3 === ""){
                return posC;
            };
            if (value1 === value3 && value1 !== "" && value2 === ""){
                return posB;
            }
            if (value2 === value3 && value2 !== "" && value1 === ""){
                return posA;
            }
        }






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