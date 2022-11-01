function Merge(array, begin, mid, end){
    let array1 = [];
    let array2 = []; 
    
    let arrSize1 = mid - begin + 1; 
    let arrSize2 = end - mid; 

    for(let i = 0; i < arrSize1; i++){
        array1.push(array[begin+i]) 
    }
    for(let i = 0; i < arrSize2; i++){
        array2.push(array[mid+1+i]) 
    }
    
    let idx1 = 0 
    let idx2 = 0 
    let idxMerged = begin 

    while(idx1 < arrSize1 && idx2 < arrSize2){
        if(array1[idx1] <= array2[idx2]){
            array[idxMerged] = array1[idx1];  
            idx1+=1; 
        }else{
            array[idxMerged] = array2[idx2]; 
            idx2+=1; 
        }
        idxMerged+=1; 
    }

    while(idx1 < arrSize1){
        array[idxMerged] = array1[idx1];  
        idx1+=1; 
        idxMerged+=1; 
    }
    while(idx1 < arrSize1){
        array[idxMerged] = array2[idx2];  
        idx2+=1; 
        idxMerged+=1; 
    }
}


export default function MergeSort(array, begin, end){
    if(begin >= end){
        return; 
    }

    let middle = parseInt(begin+(end-begin)/2); 
    MergeSort(array, begin, middle) 
    MergeSort(array, middle+1, end) 
    Merge(array, begin, middle, end) 
}

