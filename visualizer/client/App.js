import React, {useState} from 'react';
import '../src/App.css';

function App(props) {
    let objects = props.objects;
    let title = props.title;
    let [color, setMainColor] = useState("red");
    let [interval, setInterval] = useState(0);
    if(!objects){
        objects = [];
    }
    let squares = objects.map((obj, i) => {
        let blue = 100;
        let green = 100;
        let red = 100;
        let INVERSE_MAX = 200;
        switch (color) {
            case "red":
                red = parseFloat(obj.value);
                green = INVERSE_MAX - parseFloat(obj.value);
                blue = INVERSE_MAX - parseFloat(obj.value);
                break;
            case "green":
                green = parseFloat(obj.value);
                red = INVERSE_MAX - parseFloat(obj.value);
                blue = INVERSE_MAX - parseFloat(obj.value);
                break;
            case "blue":
                blue = parseFloat(obj.value);
                red = INVERSE_MAX - parseFloat(obj.value);
                green = INVERSE_MAX - parseFloat(obj.value);
                break;
        }
        let condition = interval >= parseFloat(obj.interval_start) && interval <= obj.interval_end;
        return <div key={i} style={{
            "float": "left",
            "width": 50,
            "height": 50,
            "backgroundColor": condition ? "black" : `rgb(${red}, ${green}, ${blue})`
        }}></div>
    });
    let o = objects.filter((obj) => interval >= parseFloat(obj.interval_start) && interval <= obj.interval_end)[0];

    if(!o){
        o = {};
    }

    const ButtonFlipper = (props) => {
        return <button style={props.style} onClick={(e) => {
            setMainColor(props.color)
        }}> {props.color} </button>
    };
    setTimeout(() => {
        setInterval(interval + .6);
    }, 200);

    return (
        <div className="App">
            <header className="App-header">
                <h1>{title}</h1>

                <h3>Point in song: {interval.toFixed(2)} seconds</h3>
                <div style={{float: 'left'}}>
                    <h5>{o.value_type}: {o.value}</h5>
                </div>
                <div style={{float: 'left'}}>
                    <ButtonFlipper style={{"backgroundColor": "green"}} color="green"
                                   setColor={(e) => setMainColor("green")}/>
                    <ButtonFlipper style={{"backgroundColor": "red"}} color="red"
                                   setColor={(e) => setMainColor("red")}/>
                    <ButtonFlipper style={{"backgroundColor": "blue"}} color="blue"
                                   setColor={(e) => setMainColor("blue")}/>
                </div>
                <div>
                    {squares}
                </div>
            </header>
        </div>
    );
}

export default App;
