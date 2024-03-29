import React from 'react'
import style from '../landing_page/landing.module.css';
import vote from '../landing_page/logo.png'

export default function LandingPage() {
  return (
    <div className={style.container}>
    <div className={style.header}>
        <img src = {vote}/>
        <button>Create new poll</button>
    </div>
    <div className={style.content}>
        <p>Simplifying Secure and Transparent <br></br>Voting with Decentralised System</p>
        <button>Create New Poll</button>
        <button>Register as new Voter</button>


    </div>
        
    </div>
  )
}
