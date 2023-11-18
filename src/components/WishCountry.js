import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import axios from "axios";
import Country from './Country'

const host = 'api.frankfurter.app';

function WishCountry({ data, options, onChange, homeCountry }) {
  const [params, setParams] = useState({});

  const retrieveExchange = async () => {
    const response = await axios.get(
      `https://${host}/latest`, { params }
    );
    return response.data;
  };

  const {
    data: exchangeData,
    error: errorData,
  } = useQuery(
    ["postsData", params],
    retrieveExchange,
    { refetchOnWindowFocus: false, retry: false }
  );

  function getCurrency(currency) {
    return currency.split(',')[0]
  }

  useEffect(() => {
    setParams({ from: getCurrency(homeCountry.currency), to: params.to })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeCountry]);

  return (
    <Country
      data={data}
      options={options}
      onChange={(event) => {
        event && setParams({ from: getCurrency(homeCountry.currency), to: event.currency })
        onChange(event)
      }}
      exchange={exchangeData}
      exchangeError={errorData}
    />
  )
}

export default WishCountry;