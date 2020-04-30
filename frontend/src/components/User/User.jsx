import React from 'react'

import './styles.css'

export default props =>
  <div className="container-user">
    <h3>Olá consultor: {props.username}</h3>
  </div>