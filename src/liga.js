import React from 'react'

function formataNumero(num){
    return new Intl.NumberFormat('en-GB',{maximumFractionDigits:2}).format(num);
 }

function Liga({liga, selecionaTime}) {

    const item = (time) => (
      <tr key={time.time_id}>
        <td><button onClick={()=>selecionaTime(time.time_id)}>{time.nome}</button></td>
        <td>{formataNumero(time.pontos["rodada"])}</td>
        <td>{formataNumero(time.pontos["campeonato"])}</td>
      </tr>
    )

    const items = liga.map(i=>(
        item(i)
    ))

    return (
        <div>
            <table>
              <thead>
                  <tr><th>Nome</th><th>Total</th><th>Mês</th></tr>
              </thead>
                <tbody>
                {items}
                </tbody>
              
            </table>
        </div>
    )
}

export default Liga;