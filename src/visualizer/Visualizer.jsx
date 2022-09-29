import React from 'react'; 
import "./Visualizer.css"

const ARRAY_SIZE = 50;


export default class Visualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            array : [],
            arraySize: ARRAY_SIZE,
            arraySorted: false
        }

        this.selection = this.selection.bind(this) // binding selection sort algorithm
        this.bubbleSortState = undefined; 
        this.selectionSortState = undefined;
    }

    componentDidMount(){
        this.generateSet(this.state.arraySize);
    }

    resetSorts = () => {
        this.bubbleSortState = undefined 
    }
 
    isSorting = ()=>{
        if(this.bubbleSortState !== undefined || this.selectionSortState !== undefined){
            return false; 
        }
        return false;
    }

    generateSet = (size) => {
        const array = []

        for(let i = 0; i < size; i++){
            array.push(randomNumber(5,500));
        }

        this.setState({array: array, arraySize:size, arraySorted: false});
        this.bubbleSortState = undefined;
        this.selectionSortState = undefined;
    } 

    *bubble(){
        let size= this.state.array.length;
        let array = this.state.array
    
        for(let i = 0; i < size -1; i++){
    
            for(let j = 0; j < size - 1 - i; j ++){
                if(array[j] < array[j+1]){
                    yield [j,j+1,true];
                    [array[j], array[j+1]] = [array[j+1], array[j]];
                }else{
                    yield [j, j+1, false];
                }
            }
        }
        this.bubbleSortState = undefined
    }

    *selection(){
        let size = this.state.arraySize; 
        let array = this.state.array
        let minIndex = 0 

        for(let i = 0; i <size-1; i++){
            minIndex = i; 
            for(let j = i; j < size; j++){
                if(array[j] > array[minIndex]){
                    minIndex = j; 
                }
            }
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; 
        }

    }

    bubbleSort = async() => {

        let state
        let done = false 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
        
        if(this.bubbleSortState === undefined && this.state.arraySorted === false){
            this.bubbleSortState = this.bubble()
            let speed = Math.pow(2,(-this.state.arraySize + 1000)) + 10
            console.log(speed)
            while(done === false){
                state = this.bubbleSortState.next()

                if(state.done === true){
                    done = true
                }else{
                    let arrayBars= document.getElementsByClassName('Bar')

                    if(state.value[2] === true){
                        arrayBars[state.value[0]].style.backgroundColor = 'red';
                        arrayBars[state.value[1]].style.backgroundColor = 'green';
                        await wait(speed); 
                        arrayBars[state.value[0]].style.backgroundColor = 'aqua';
                        arrayBars[state.value[1]].style.backgroundColor = 'aqua';
    
                    }else{
                        arrayBars[state.value[0]].style.backgroundColor = 'red'; 
                        arrayBars[state.value[1]].style.backgroundColor = 'red';
                        await wait(speed); 
                        arrayBars[state.value[0]].style.backgroundColor = 'aqua';
                        arrayBars[state.value[1]].style.backgroundColor = 'aqua';
                    }

        
                    this.setState({array:this.state.array})
                    
                }
            }

        } 
        this.resetSorts()
        this.setState({ arraySorted: true})
    }

    selectionSort = async() =>{
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
    }
    

    sort = (type)=>{
        if(type === "BubbleSort"){
            this.bubbleSort();
        }else if(type === "SelectionSort"){
            
        }
    }
    
    handleSlideChange = (e) => {
        let size = parseInt(e.target.value)
        this.setState({arraySize : size});

        this.generateSet(size)
        
    }

    render = () => {
        this.bars = this.state.array.map((value,index) =>(
            <div className = "Bar" key = {index} id = {index} style= {{height: `${value}px`}}>
                
            </div>
        )) 
       
        return(
            <div className='main'>
            <div className = "container">
                {this.bars}
            </div>
            <div className = "controls">
            <button className = "btn1" onClick= {()=>this.generateSet(this.state.arraySize)}>Generate Set</button>
            <input id ="slider" 
            type={"range"} 
            min = {0} max = {100} 
            onChange={this.handleSlideChange}
            value = {this.state.arraySize}/>
            <button className = "btn1" onClick= {this.bubbleSort}>Sort Set</button>
            <div className ="value">{this.state.arraySize}</div>
            </div>
        
            </div>

        );
    };
}

// generates random number between min and max
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 