import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Liga from './liga';



function App() {
    const [liga, setLiga] = useState([]);
    const [atletas, setAtletas] = useState([]);    
    const [dadosTime, setDadosTime] = useState([]);    


    function pontuacaoAtleta(id){
      axios.get("https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/atletas/pontuados/").then(res=>{

        atletas.map(a=>{
          if(a.atleta_id !== id) {                        
            return a;
          }else{   
            var ret = {...a, pontos_num: res.data.atletas[id].pontuacao}            
            return ret;
          }
        })        
      }).catch(error => {
        console.log("errou pontuacaoAtleta")
      })
    }

    function getTime(time) {     
      var atltemp; 
      axios.get('https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/time/id/'+time,
      { headers: { 'X-GLB-Token': '1224107e0cf31aca0fbb6473137441744614d4674476b5467656c443964634476466852432d693849697453537358336e3559614939687230435930436e3142426e6762656d737967524a7251586e6a326c79444d63347269494576555435386a2d5135626f773d3d3a303a6a6f73652e6a6f73656175677573746f6c696e73' } }).then(response => {
        atltemp = response.data.atletas;        
        var aaa = [];
        atltemp.forEach(a=>{          
          a = pontuacaoAtleta(a.atleta_id)
          console.log(a)          
        })
        console.log(aaa)        
        setAtletas(atltemp);
        setDadosTime(response.data.time)       
      })
      .catch(error => {
        console.log("errou gettime");
      });

    }

    useEffect( () => {
        
        function loadLiga(){axios.get('https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/auth/liga/soccer-and-beer',
              { headers: { 'X-GLB-Token': '1224107e0cf31aca0fbb6473137441744614d4674476b5467656c443964634476466852432d693849697453537358336e3559614939687230435930436e3142426e6762656d737967524a7251586e6a326c79444d63347269494576555435386a2d5135626f773d3d3a303a6a6f73652e6a6f73656175677573746f6c696e73' } }).then(response => {
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
        
        <Liga liga={liga} selecionaTime={getTime} atletas={atletas} dadosTime={dadosTime}  />        
        
    </div>
  );
}

export default App;