function* bubbleS(array){

    let size= array.length;
    
    for(let i = 0; i < size -1; i++){

        for(let j = 0; j < size - 1 - i; j ++){
            [array[j], array[j+1]] = [array[j+1], array[j]]
            yield [j,j+1]; 
        }
    }
}

