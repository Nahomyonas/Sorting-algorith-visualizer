import React from 'react'; 
import "./Visualizer.css"

const ARRAY_SIZE = 50;


export default class Visualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            array : [],
            arraySize: ARRAY_SIZE,
        }

        this.bubble = this.bubble.bind(this)
        this.bubbleSortState = undefined;
        this.moves = []
    }

    componentDidMount(){
        this.generateSet(this.state.arraySize);
    }
 

    ///
    generateSet = (size) => {
        const array = []

        for(let i = 0; i < size; i++){
            array.push(randomNumber(5,500));
        }

        this.setState({array: array, arraySize:size});
    } 

    *bubble(){
        let size= this.state.array.length;
        let array = this.state.array
    
        for(let i = 0; i < size -1; i++){
    
            for(let j = 0; j < size - 1 - i; j ++){
                if(array[j] < array[j+1]){
                    [array[j], array[j+1]] = [array[j+1], array[j]]
                    yield [j,j+1,true]
                }else{
                    yield [j, j+1, false]
                }
            }
        }
        this.bubbleSortState = undefined
    }

    bubbleSort = async() => {
        let state
        let done = false 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        if(this.bubbleSortState === undefined){
            this.bubbleSortState = this.bubble()
        }
        
        while(done === false){
            state = this.bubbleSortState.next()

            if(state === undefined){
                done = false
            }else{
                done = state.done    
            }

            let arrayBars= document.getElementsByClassName('Bar')
            arrayBars[state.value[0]].style.backgroundColor = 'red'
            await wait(1);
            
            arrayBars[state.value[0]].style.backgroundColor = 'aqua'

            this.setState({array:this.state.array})
        }
        
    }
    
    

    handleSlideChange = (e) => {
        this.setState({arraySize : e.target.value});
        console.log(this.state.arraySize)
        this.generateSet(this.state.arraySize);
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
            <button onClick= {()=>this.generateSet(this.state.arraySize)}>Generate Set</button>
            <input id ="slider" 
            type={"range"} 
            min = {0} max = {120} 
            onChange={this.handleSlideChange}
            value = {this.state.arraySize}/>
            <button onClick= {this.bubbleSort}>Sort Set</button>
            <div className ="value">{this.state.arraySize}</div>
            </div>

        );
    };
}

// generates random number between min and max
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 