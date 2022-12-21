import React from 'react'; 
import "./Visualizer.css";
import bubble1 from './algorithms/BubbleSort';
import MergeSort from "./algorithms/MergeSort.js";
import selection from './algorithms/SelectionSort';


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

        this.MIN_SPEED = 0; 
        this.MAX_SPEED = 400;

        this.bubbleSortState = undefined; 
        this.selectionState = undefined;
        this.mergeState = undefined; 
       
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
        this.mergeState = undefined 
    }

    // checks if array is currently getting sorted 
    // avoids running of multiple sorts at a time 
    isSorting = ()=>{
        if(this.bubbleSortState !== undefined || this.selectionState !== undefined || this.mergeState !== undefined){
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

        this.resetSorts()
        this.setState({array: array, arraySize:size, arraySorted: false});

    } 


    ///////////////////////////////////////////////////////////////////////////////////
    //Sorting

    mergeSort = async() => {
        let array = this.state.array

        if(!this.state.arraySorted && !this.isSorting()){
            let animArray = MergeSort([...array], 0 , array.length-1); 
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
            for(let i = 0; i < animArray.length; i++){
                await wait(this.state.speed)
                this.setState({array:animArray[i]});
            }
            this.setState({arraySorted: true});     // setting state of array sorted to true
            
        }
    }
    
    bubbleSort = async() => {
        let state
        let done = false 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) // delay promise
        
        if(this.isSorting() === false && this.state.arraySorted === false){
            this.bubbleSortState = bubble1(this.state.array);       // initiates the generator function for bubble sort
            let arrayBars= document.getElementsByClassName('Bar');  // storing visual representation of array in variable 

            while(done === false){
                state = this.bubbleSortState.next()     // storing the yield of generator function as state
                
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
            this.selectionState = selection(this.state.array)

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

                this.setState({array:state.value[4]})
                done = state.done
                
            }

        }
        this.resetSorts()
        this.setState({ arraySorted: true})
    }
    
    // ARRAY SIZE HANDLER
    handleSlideChange = (e) => {
        let size = parseInt(e.target.value)
        this.setState({arraySize : size});
        this.generateSet(size)
    }
    
    // SORT SPEED HANDLER 
    handleSlideChange2 = (e) => {
        let speed = parseInt(e.target.value)
        this.setState({speed : speed});
    }

    render = () => {
        let bars = this.state.array.map((value,index) =>(
            <div className = "Bar" key = {index} id = {index} style= {{height: `${value}px`}}>
                
            </div>
        )) 
       
        return(
            <div className='main'>
                
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
                    min = {this.MIN_SPEED} max = {this.MAX_SPEED} 
                    onChange={this.handleSlideChange2}
                    value = {this.state.speed}/>

                </div>

                <div className = "container">
                    {bars}
                </div>
                
            </div>
            
        );
    };
}

// generates random number between min and max
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

