import React from 'react';
import { useState, useEffect } from 'react';
import MealItem from './MealItem';


const Meals = () => {

  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
        const response = await fetch("http://localhost:8000/meals", {method: 'GET'});
        if(!response.ok) {
          //
        }    
        const meals = await response.json();
        setLoadedMeals(meals);  
    }
    fetchMeals();
  }, []);
  

  return (
    <>
    <div>
        <ul id='meals' >
          {loadedMeals.map(meal => 
          <MealItem key={meal.id} meal={meal} />
          )}
        </ul>
    </div>
    </>
  )
}

export default Meals;


//Using Custom Hook and setting Validation with State
// import React from 'react';
// import { useState, useEffect } from 'react';
// import MealItem from './MealItem';
// import useHttp from '../hooks/useHttp';
// import Error from './Error';

// const configuration = {};

// const Meals = () => {
// const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:8000/meals', configuration, []);

// if(isLoading) {
//   return <p className='center'>Loading...</p>
// };

// if(error) {
//   return <Error title={'Error fetching data...'} message={error.message} />
// }
//   return (
//     <>
//     {!error && <div>
//         <ul id='meals' >
//           {loadedMeals.map(meal => 
//           <MealItem key={meal.id} meal={meal} />
//           )}
//         </ul>
//     </div>
//     }
//     </>
//   )
// }

// export default Meals;