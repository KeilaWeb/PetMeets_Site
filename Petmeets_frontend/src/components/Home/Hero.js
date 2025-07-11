import React from 'react';
import '../../styles/components/_home.sass';
import heroImage from '../../img/petmeets-img.png'

export function Hero() {
  return (
    <div className="st-container">
      <div className="content-wrapper-hero padding-bt-20">
        <div className="title-container">
          <h5 className="color-blue">A solução completa para seu negócio</h5>
          <h1 className="color-dark-blue padding-bottom-20">A Solução da sua Clínica Veterinária</h1>
          <h3 className="color-text text-container padding-bottom-40">Otimize o agendamento de consultas veterinárias em sua clínica ou hospital com o PetMeets</h3>
          <button className="button">Automatize seu Negócio</button>
        </div>
        <div className="image-hero">
          <img src={heroImage}  alt='Hero PetMeets'/>
        </div>
      </div>
    </div>
  );
}

export default Hero;
