import React , {useEffect} from 'react';
import {useState} from 'reinspect';
import axios from 'axios';
import {List, Image, Icon} from 'semantic-ui-react';
import smiley from './img/happysmiley.jpg';
import colorBurst from './img/ColourSurge1.jpg';


const App = () => {

    // the API requires data.hits

    const [data, setFetchedData] = useState({ hits: [] });
    useEffect(() => {
      const fetched = async () => {
        const fetchResult = await axios(
          'https://hn.algolia.com/api/v1/search?query=redux',
        );
        setFetchedData(fetchResult.data);
      };
      fetched();
    }, []);
    return (
        <div style = {{
            backgroundImage: `url(${colorBurst})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            }}
        >

            <List>
                
                {data.hits.map(item => (
                    <List.Item key={item.objectID}>
                        <Image src = {smiley}   size = 'mini' verticalAlign = 'middle' rounded spaced = 'left'/>
                        <a style = {{color: 'lightgrey', padding: '2px'}} href={item.uList}>{item.title}</a>
                    </List.Item>
                ))}

            </List>
        </div>
    );


}

export default App;
