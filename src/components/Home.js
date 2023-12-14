import React, { useEffect, useRef, useState } from 'react';
import Table from './Table';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableInputs, setTableInputs] = useState({
    firstName: '',
    lastName: '',
    address: {
      city: '',
    },
  });
  const [searchInput, setSearchInput] = useState('');
  const tableRef = useRef(null);

  // search input handler
  const searchInputHandler = () => {
    if (searchInput.length === 0) {
      return setFilteredData(data);
    }
    const filteredEmployees = data?.filter((employee) => {
      return (
        employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.city.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredData(filteredEmployees);
  };

  // fetch users from api
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://dummyjson.com/users');
      const modifiedArray = data?.users.slice(0, 3).map((item) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          city: item.address.city,
        };
      });
      setData(modifiedArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // add employee handler
  const addEmployeeHandler = () => {
    // checking fields are not empty
    if (tableInputs.firstName && tableInputs.lastName && tableInputs.city) {
      setData((prevData) => [
        ...prevData,
        {
          firstName:
            tableInputs.firstName.charAt(0).toUpperCase() +
            tableInputs.firstName.slice(1),
          lastName:
            tableInputs.lastName.charAt(0).toUpperCase() +
            tableInputs.lastName.slice(1),
          city:
            tableInputs.city.charAt(0).toUpperCase() +
            tableInputs.city.slice(1),
        },
      ]);
      setTableInputs({
        firstName: '',
        lastName: '',
        city: '',
      });
    } else {
      alert('Please enter all the fields...');
    }
  };

  // remove employee handler
  const removeEmployeeHandler = (index) => {
    const itemToBeRemoved = data.find((item, position) => position === index);
    const userConfirmed = window.confirm(
      `Are you sure, you want to remove ${itemToBeRemoved.firstName}?`
    );

    if (userConfirmed) {
      const newData = [...data];
      newData?.splice(index, 1);
      setData(newData);
    }
  };

  // sort the table
  const sortTable = (value) => {
    const duplicateArray = [...data];
    const sortedData = duplicateArray.sort((a, b) => {
      const nameA = a[value].toLowerCase();
      const nameB = b[value].toLowerCase();

      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
    setData(sortedData);
  };

  // useEffect for search input change
  useEffect(() => {
    searchInputHandler();
  }, [searchInput, data]);

  // useEffect to fetch users from api
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <p className='table-title'>Employee Management System</p>
      <p className='horizontal-line'></p>

      <main>
        {loading ? (
          <div className='flex justify-center items-center mt-36'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-gray-500 border-solid'></div>
          </div>
        ) : (
          <>
            {/* search input */}
            <section className='search-input'>
              <input
                type='text'
                placeholder='Search...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </section>

            {/* export table data to excel sheet */}
            <DownloadTableExcel
              filename='users table'
              sheet='users'
              currentTableRef={tableRef.current}
            >
              <section className='export-btn'>
                <button>
                  <i className='fa-solid fa-download pr-1'></i> Export
                </button>
              </section>
            </DownloadTableExcel>

            {/* table */}
            <Table
              filteredData={filteredData}
              searchInput={searchInput}
              sortTable={sortTable}
              removeEmployeeHandler={removeEmployeeHandler}
              tableInputs={tableInputs}
              addEmployeeHandler={addEmployeeHandler}
              setTableInputs={setTableInputs}
              tableRef={tableRef}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
