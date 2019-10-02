import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Liga from './liga';
import Time from './time';


function App() {
    const [time, setTime] = useState([]);
    const [liga, setLiga] = useState([]);
    const [atletas, setAtletas] = useState([]);    



    function getTime(time) {
      console.log("timae"+time)
      axios.get('https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/time/id/'+time+'/22',
      { headers: { 'X-GLB-Token': '' } }).then(response => {
        setAtletas(response.data.atletas);
        setTime(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    }

    useEffect( () => {
        
        function loadLiga(){axios.get('https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/auth/liga/soccer-and-beer',
              { headers: { 'X-GLB-Token': '' } }).then(response => {
                console.log(response.data)
                setLiga(response.data.times);
              })
              .catch(error => {
                console.log(error);
              });        
            }
            loadLiga();
    }, [] )

  return (
    <div className="App">

        <Liga liga={liga} selecionaTime={getTime}/>        
        <Time time={time} atletas={atletas}/>
        
    </div>
  );
}

export default App;