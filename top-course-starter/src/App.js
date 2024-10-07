import './App.css';
import { apiUrl, filterData } from "./data.js";
import Navbar from './components/Navbar'
import Filter  from './components/Filter.jsx';
import Cards from './components/Cards.jsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from './components/Spinner.jsx'

function App() {
  const [courses, setCourses] = useState(null);
  const [loading , setLoading] = useState(true);
  const [category , setCategory] = useState(filterData[0].title);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json();

      // Save data
      setCourses(output.data);
      // setCourses(output);                      
    } catch (err) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  };

useEffect(() => {
  fetchData();
},[])


  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
    <div>    
    <Navbar/>
    </div>
    <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category = {category}
            setCategory = {setCategory}
          />
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            loading ? (
              <Spinner />
            ) : (
              <Cards courses={courses} category = {category}/>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;