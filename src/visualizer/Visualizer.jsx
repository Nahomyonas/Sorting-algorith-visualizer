import React from 'react'; 
import "./Visualizer.css";
import MergeSort from "./algorithms/MergeSort.js"

const ARRAY_SIZE = 50;


export default class Visualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            array : [],
            arraySize: ARRAY_SIZE,
            arraySorted: false, 
            speed: 30,
            currComp: []
        }

        this.selection = this.selection.bind(this) // binding selection sort algorithm
        this.bubbleSortState = undefined; 
        this.selectionState = undefined;
    }

    // generates an array of random numbers on mount 
    componentDidMount(){
        this.generateSet(this.state.arraySize);
    }

    // resets all sort states 
    // precondition to start any sort algorithm 
    resetSorts = () => {
        this.bubbleSortState = undefined 
        this.selectionState = undefined 
    }

    // checks if array is currently getting sorted 
    // avoids running of multiple sorts at a time 
    isSorting = ()=>{
        if(this.bubbleSortState !== undefined || this.selectionState !== undefined){
            return true; 
        }
        return false;
    }

    // creates an array of random number of size and sets state
    generateSet = (size) => {
        const array = []

        for(let i = 0; i < size; i++){
            array.push(randomNumber(5,500));
        }

        this.setState({array: array, arraySize:size, arraySorted: false});
        this.resetSorts()
    } 


    ///////////////////////////////////////////////////////////////////////////////////
    //Sorting
    *bubble(){
        let size= this.state.array.length;
        let array = this.state.array
    
        for(let i = 0; i < size -1; i++){
    
            for(let j = 0; j < size - 1 - i; j ++){
                if(array[j] > array[j+1]){
                    yield [j,j+1,true];
                    [array[j], array[j+1]] = [array[j+1], array[j]];
                }else{
                    yield [j, j+1, false];
                }
                this.setState({array:array})
                //to make this function to a separate file try yeilding the array 
                //after swapping values and set the state in bubbleSort function 
                //then setstate of array in that function
            }
        }
    }

    *selection(){
        let size = this.state.arraySize
        let array = this.state.array
        let minIndex = 0 

        for(let i = 0; i <size-1; i++){
            minIndex = i
            for(let j = i; j < size; j++){
                if(array[j] < array[minIndex]){
                    minIndex = j
                    yield[i, j, minIndex , true]
                }
                yield[i, j, minIndex, false]
            }
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; 
            this.setState({array: array})
        }
    }

    mergeSort = () => {
        let array = this.state.array
        MergeSort(array, 0, this.state.arraySize-1) 
        this.setState({array: this.state.array})
    }
    
    bubbleSort = async() => {
        let state
        let done = false 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
        
        if(this.isSorting() === false && this.state.arraySorted === false){
            this.bubbleSortState = this.bubble()
            //this.bubbleSortState = bubble1()
            let arrayBars= document.getElementsByClassName('Bar')
            while(done === false){
                state = this.bubbleSortState.next()
                //this.setState({array:state[3]})
                
                //Color Animation 
                if(state.done === true){
                    done = true
                }else{
                    this.setState({currComp:[state.value[0], state.value[1]]})
                    arrayBars[state.value[0]].style.backgroundColor = 'red';
                    if(state.value[2] === true){
                        arrayBars[state.value[1]].style.backgroundColor = 'green';
                    }else{ 
                        arrayBars[state.value[1]].style.backgroundColor = 'red';
                    }
                    await wait(this.state.speed); 
                    arrayBars[state.value[0]].style.backgroundColor = 'aqua';
                    arrayBars[state.value[1]].style.backgroundColor = 'aqua';
                }
            }

        } 
        this.resetSorts()
        this.setState({ arraySorted: true})
    }

    selectionSort = async() =>{
        let state
        let done = false 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
        let arrayBars= document.getElementsByClassName('Bar')

        if(!this.isSorting() && this.state.arraySorted === false){
            this.selectionState = this.selection()

            while(done === false){

                state = this.selectionState.next()
                arrayBars[state.value[2]].style.backgroundColor = 'green';
                arrayBars[state.value[0]].style.backgroundColor = 'red';
                if(state.value[3]){
                    arrayBars[state.value[1]].style.backgroundColor = 'green';
                }else{
                    arrayBars[state.value[1]].style.backgroundColor = 'red';
                }
                await wait(this.state.speed); 
                arrayBars[state.value[2]].style.backgroundColor = 'aqua';
                arrayBars[state.value[0]].style.backgroundColor = 'aqua';
                arrayBars[state.value[1]].style.backgroundColor = 'aqua';

                this.setState({array:this.state.array})
                done = state.done
                
            }

        }
        this.resetSorts()
        this.setState({ arraySorted: true})
    }
    
    handleSlideChange = (e) => {
        let size = parseInt(e.target.value)
        this.setState({arraySize : size});
        this.generateSet(size)
    }

    handleSlideChange2 = (e) => {
        let speed = parseInt(e.target.value)
        this.setState({speed : speed});
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

                    <button className = "btn1" onClick= {this.bubbleSort}>Bubble Sort</button>

                    <button className = "btn1" onClick= {this.selectionSort}>Selection Sort</button>

                    <button className = "btn1" onClick= {this.mergeSort}>Merge Sort</button>

                    <div className ="value">{this.state.arraySize}</div>

                    <span className = "slider-spn">size: </span>
                    <input id ="slider" 
                    type={"range"} 
                    min = {0} max = {100} 
                    onChange={this.handleSlideChange}
                    value = {this.state.arraySize}/>

                    <span className = "slider-spn">Speed:</span>
                    <input id ="slider" 
                    type={"range"} 
                    min = {0} max = {1000} 
                    onChange={this.handleSlideChange2}
                    value = {this.state.speed}/>

                </div>
                <div>
                    <h6>{this.state.currComp[0]}, {this.state.currCompif}</h6>
                </div>
            </div>
            
        );
    };
}

// generates random number between min and max
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 