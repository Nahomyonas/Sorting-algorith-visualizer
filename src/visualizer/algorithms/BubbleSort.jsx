// Bubble Sort Algorithm (implemented using a generator function)
export default function* bubble1(array){
    let size= array.length;
        for(let i = 0; i < size -1; i++){
            for(let j = 0; j < size - 1 - i; j ++){
                if(array[j] > array[j+1]){
                    yield [j,j+1,true];
                    [array[j], array[j+1]] = [array[j+1], array[j]];
                }else{
                    yield [j, j+1, false];
                }
            }
        }
}



