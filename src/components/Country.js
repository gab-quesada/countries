import React from 'react';
import Select from 'react-select'
import unknownFlag from '../assets/images/unknown_flag.png'

function Country({ data, options, onChange, exchange = null, exchangeError = null }) {

  const countryOpts = options.countries.map((opt) => ({ label: opt.name, value: opt.code }))
  const { code, name, capital } = data || {};
  const imageSrc = data ? `https://flagcdn.com/w320/${code.toLowerCase()}.png` : unknownFlag

  function findSelectedOpt(pick) {
    return options.countries.find((c) => c.code === pick.value)
  }

  return (
    <div className='d-flex justify-content-center'>
      <article>
        <div className="flag">
          <img src={imageSrc} alt={name} />
        </div>
        <div className='details'>
          <Select
            options={
              countryOpts
            }
            onChange={(e) => {
              onChange(e ? findSelectedOpt(e) : null)
            }}
            isClearable={true}
            placeholder="Pick a country.."
          />
          <h4>Capital: <span>{capital}</span></h4>
          {
            exchange && (<h4>Exchange: <span>{exchange.rates[data?.currency]}</span></h4>)
          }{
            exchangeError && (<h4>Exchange: <span>Not found</span></h4>)
          }
        </div>
      </article>
    </div>

  )
}

export default Country;