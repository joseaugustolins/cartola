import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Liga from './liga';



function App() {
    const [liga, setLiga] = useState([]);
    const [atletas, setAtletas] = useState([]);    
    const [dadosTime, setDadosTime] = useState([]);    


    function pontuacaoAtleta(id){
      axios.get("https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/atletas/pontuados/").then(res=>{
        const a = res.data.atletas[id].pontuacao;        
        console.log("aaaa "+a);
        return a;
      }).catch(error => {
        console.log(error)
      })
    }

    function getTime(time) {     
      var atltemp; 
      var pontoAtleta = 8;
      axios.get('https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/time/id/'+time,
      { headers: { 'X-GLB-Token': '1224107e0cf31aca0fbb6473137441744614d4674476b5467656c443964634476466852432d693849697453537358336e3559614939687230435930436e3142426e6762656d737967524a7251586e6a326c79444d63347269494576555435386a2d5135626f773d3d3a303a6a6f73652e6a6f73656175677573746f6c696e73' } }).then(response => {
        atltemp = response.data.atletas;
        atltemp.map(atleta=>{
          axios.get("https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/atletas/pontuados/").then(res=>{
            pontoAtleta = res.data.atletas[atleta.atleta_id].pontuacao;                        
          }).catch(error => {
            console.log(error)
          })
          atleta.pontos_num = pontoAtleta;
        })   
        
        setAtletas(atltemp);
        

        setDadosTime(response.data.time)
        
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
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