import React from 'react';

function Time(props){
    return(
        <div>

            {props.time.nome} - {props.time.pontos}
        <ul>
            {props.atletas.map(atleta=>(
                <li key={atleta.apelido}>  {atleta.apelido}  {atleta.pontos_num}  {atleta.atleta_id===props.time.capitao_id?'*':''} </li>
            ))}
        </ul>

        </div>
    );
}

export default Time;