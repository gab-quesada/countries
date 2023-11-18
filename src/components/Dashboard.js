import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Country from './Country'
import WishCountry from './WishCountry'

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      currency
    }
  }
`;

// create a component that renders a select input for coutries
function Dashboard() {
  const [homeCountry, setHomeCountry] = useState(null);
  const [wishlistCountries, setWishlistCountries] = useState([null, null, null, null, null]);
  const { data: options, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <section className='countries'>
          <div className='row'>
            <h4 className='pt-3'>Pick your home country..</h4>
            {<Country data={homeCountry} options={options} onChange={setHomeCountry} />}
          </div>
          {
            homeCountry && (
              <div className='row'>
                <h4>Now pick your top 5 countries you would like to visit..</h4>
                {wishlistCountries.map((wishCountry, index) => {
                  return (
                    <div className='col'>
                      <WishCountry
                        data={wishCountry}
                        options={options}
                        onChange={(e) => {
                          const countries = wishlistCountries.slice()
                          countries[index] = e
                          setWishlistCountries(countries)
                        }}
                        homeCountry={homeCountry} />
                    </div>
                  );
                })}
              </div>
            )
          }
        </section>
      )}
    </>
  );
}

export default Dashboard;