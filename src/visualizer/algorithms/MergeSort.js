let animArray = []; 
async function Merge(array, begin, mid, end){
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
            animArray.push([...array]) 
        }else{
            array[idxMerged] = array2[idx2]; 
            idx2+=1; 
            animArray.push([...array]) 
        }
        idxMerged+=1;
    }

    while(idx1 < arrSize1){
        array[idxMerged] = array1[idx1];  
        idx1+=1; 
        idxMerged+=1; 
        animArray.push([...array]) 
    }
    while(idx1 < arrSize1){
        array[idxMerged] = array2[idx2];  
        idx2+=1; 
        idxMerged+=1;
        animArray.push([...array]) 
    }
}

export default function MergeSort(array, begin, end){
    
    if(begin === 0 && end === array.length-1){
        animArray = []
    }
    if(begin >= end){
        return; 
    }
    
    let middle = parseInt(begin+(end-begin)/2); 
    MergeSort(array, begin, middle, animArray); 
    MergeSort(array, middle+1, end, animArray);
    Merge(array, begin, middle, end);

    if(begin === 0 && end === array.length-1){
        return [...animArray]
    }

}

