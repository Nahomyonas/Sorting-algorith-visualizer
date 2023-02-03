export default function* insertion(array){
    const n = array.length
    let i, key, j; 

    for(i = 1; i < n; i++){
        key = array[i]
        j = i-1

        while(j >= 0 && array[j] > key){
            array[j + 1] = array[j];
            j = j - 1;
            yield[i,j, false, array]
        }
        array[j + 1] = key;
        yield[i, j, true, array]
    }

}