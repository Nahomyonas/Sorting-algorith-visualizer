export const binarySort = array =>{
    let size = array.length(); // get length of array for sort 
    let done = false; // flag to detect swap in loop 
    let temp = 0;

    while(done === false){
        // starts as if no swaps have been made 
        done = true;

        for(let i = 0; i < size-1; i++){
            //swap
            if(array[i] > array[i+1]){
                temp = array[i]
                array[i] = array[i+1]
                array[i+1] = temp
                done = false
            }
            
        }
    }


}