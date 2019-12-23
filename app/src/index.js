import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {StateInspector} from 'reinspect';

const AppWrapper = () => {
    return  (
        <StateInspector>
            <App/>
        </StateInspector>
    )
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

