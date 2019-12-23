Based upon the `Robin Wieruch` article `https://www.robinwieruch.de/react-hooks-fetch-data`




1) ### Set up React app `yarn create react-app app`

2) ### Add app Dependencies  (several added for future styling)
    `yarn add moment react-dom react-loader-spinner react-rainbow-components react-router-dom react-scripts react-spinners-kit reactn reactn-devtools semantic-ui-react styled-components redux reinspect redux-devtools-extension react-select axios`  

    - For `react-loaded-spinner`, you must also add `styled-components`
    - For `semantic-ui-react`, you must also 
        add to `index.html`  
        ~~~ html 
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm semantic-ui@2.4.2/dist/semantic.min.css" />
        ~~~
3) ### React DevTools extension `hooks` configuration        
    - To utilize the `redux devtools extension` with 'hooks, add the following to `src/index.js`
        import `StateInspector`
        ~~~ js
        import { StateInspector } from 'reinspect';
        ~~~
        Define a `Wrapper` component and wrap the `App` component 
        ~~~ js
        const AppWrapper = () => {
            return (
                <StateInspector>
                    <App/>
                </StateInspector>
            )
        }

        ReactDOM.render(<AppWrapper />, document.getElementById('root'));
        ~~~     