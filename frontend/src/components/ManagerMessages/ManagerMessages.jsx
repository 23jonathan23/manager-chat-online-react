import React, { useState, useEffect } from 'react';

import './styles.css'
import api from '../../services/api'

export default function Consultant() {

  const [filterUser, setFilterUser] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filter, setFilter] = useState(true)
  const [messageslist, setMessagesList] = useState([])
  const [showButton, setshowButton] = useState(true)

  let loading = false

  useEffect(() => {
    if (loading === false) {
      api.get('/messages').then(async res => {
        let msgs = res.data.messages
        setMessagesList([...msgs])
      })
      loading = true
    }
  }, [loading])

  //Usado para filtrar os mais recentes/mais antigas
  function filterInverseMessages() {
    let messageReverse = [...messageslist]
    messageReverse = messageReverse.reverse()
    setMessagesList([...messageReverse])
    setshowButton(showButton ? false : true)
  }

  return (
    <div className="conatiner-manager">
      <div className="filter-messages">

        <div className="buttonFilter">
          {showButton && <button onClick={filterInverseMessages}>Mais recentes primeiro</button>}
          {!showButton && <button onClick={filterInverseMessages}>Mais antigas primeiro</button>}

          {filter && <button onClick={() => setFilter(false)}>Ativar filtro por data</button>}
          {!filter && <button onClick={() => setFilter(true)}>Ativar filtro por usuario</button>}
        </div>

        <div className="inputFilter">
          {filter && <label htmlFor="filterUser">Filtro por nome do usuario: </label>}
          {filter && <input id="filterUser" value={filterUser} onChange={(e) => setFilterUser(e.target.value)} placeholder="Digite o nome do usuario..." />}

          {!filter && <label htmlFor="filterDate">Filtro por data da mensagem: </label>}
          {!filter && <input id="filterDate" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} placeholder="Digite a data EX: 29/4/2020..." />}
        </div>

      </div>

      <div className="messages-manager">
        <ul className="list-messages">
          {filter && messageslist.map((message, index) => {
            if (filterUser.length !== 0) {
              if (message.author.startsWith(filterUser)) {
                return (
                  <div className="message" key={index}>
                    <strong>{message.date} - {message.author} - {message.hours} => </strong><span>{message.message}</span>
                  </div>
                )
              } else {
                return null
              }
            }
            return (
              <div className="message" key={index}>
                <strong>{message.date} - {message.author} - {message.hours} => </strong><span>{message.message}</span>
              </div>
            )
          })}

          {!filter && messageslist.map((message, index) => {
            if (filterDate.length !== 0) {
              if (message.date.startsWith(filterDate)) {
                return (
                  <div className="message" key={index}>
                    <strong>{message.date} - {message.author} - {message.hours} => </strong><span>{message.message}</span>
                  </div>
                )
              } else {
                return null
              }
            }
            return (
              <div className="message" key={index}>
                <strong>{message.date} - {message.author} - {message.hours} => </strong><span>{message.message}</span>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
