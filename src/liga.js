import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightBaseTheme } from 'material-ui/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'


function formataNumero(num){
    return new Intl.NumberFormat('en-GB',{maximumFractionDigits:2}).format(num);
 }
 
let exibe=1;



function premiacao(posicao){

  if(posicao>=35){
    return "PAGAR GELADA"
  }

  switch(posicao) {
    case 1:
      return " Premiação R$ 2.000";
    case 2:
      return " Premiação R$ 1.000";
    case 3:
      return " Premiação R$ 900";  
    case 4:
      return " Premiação R$ 600";  
    case 5:
      return " Premiação R$ 500";
    case 7:
      return " Premiação R$ 400";  
    case 8:
      return " Premiação R$ 300";  
    default:
      return "";
  }
}



function Liga({liga, atletas, selecionaTime, dadosTime}) {  

  const listaAtletas = atletas.map(
    atleta=>{                           
     return   <li key={atleta.atleta_id}> {atleta.apelido} - {atleta.pontos_num} </li>
    })

    return (
      
        <div>            
               {liga.map(time=>(
                  
                     <Card key={time.time_id} >
                       <CardActionArea onClick={()=>selecionaTime(time.time_id)} >
                       <CardHeader
                          avatar={
                        <Avatar aria-label="recipe">
                          {time.ranking["campeonato"]}
          </Avatar>
        }        
         
        title={time.nome +"  Campeonato: " + formataNumero(time.pontos["campeonato"]) + premiacao(time.ranking["campeonato"])}
        subheader={"Rodada "+formataNumero(time.pontos["rodada"])}>
  
        </CardHeader>
      </CardActionArea>
      {dadosTime["time_id"]===time.time_id?
                     <CardContent>
                     
                       <Typography>
                       {listaAtletas}
                       </Typography>
                       
                     </CardContent>      
                    :""}
                   </Card>
               ))}
                
             
                


        </div>
    )
}

export default Liga;