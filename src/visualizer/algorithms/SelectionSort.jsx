export default function* selection(array){
    let size = array.length;
    let minIndex = 0 

    for(let i = 0; i <size-1; i++){
        minIndex = i
        for(let j = i; j < size; j++){
            if(array[j] < array[minIndex]){
                minIndex = j
                yield[i, j, minIndex , true, array]
            }
            yield[i, j, minIndex, false, array]
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]]; 
    }
}