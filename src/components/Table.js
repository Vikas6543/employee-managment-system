const Table = ({
  filteredData,
  removeEmployeeHandler,
  tableInputs,
  addEmployeeHandler,
  setTableInputs,
  searchInput,
  tableRef,
  sortTable,
  editEmployeeHandler,
  modal,
  setModal,
  modalInputs,
  setModalInputs,
  submitForm,
}) => {
  return (
    <>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Id</th>
            <th>
              FirstName
              <i
                className='fa-solid fa-sort pl-2'
                onClick={() => sortTable('firstName')}
              ></i>
            </th>
            <th>
              LastName
              <i
                className='fa-solid fa-sort pl-2'
                onClick={() => sortTable('lastName')}
              ></i>
            </th>
            <th>
              City
              <i
                className='fa-solid fa-sort pl-2'
                onClick={() => sortTable('city')}
              ></i>
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData?.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.city}</td>
              <td className='flex gap-2'>
                <button
                  className='edit-btn'
                  onClick={() => editEmployeeHandler(item, index)}
                >
                  Edit
                </button>
                <button
                  className='remove-btn'
                  onClick={() => removeEmployeeHandler(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td></td>
            <td>
              <input
                type='text'
                value={tableInputs.firstName}
                onChange={(e) =>
                  setTableInputs({
                    ...tableInputs,
                    firstName: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type='text'
                value={tableInputs.lastName}
                onChange={(e) =>
                  setTableInputs({
                    ...tableInputs,
                    lastName: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type='text'
                value={tableInputs.city}
                onChange={(e) =>
                  setTableInputs({
                    ...tableInputs,
                    city: e.target.value,
                  })
                }
              />
            </td>
            <td onClick={addEmployeeHandler}>
              <button className='add-btn'>
                <i className='fa-solid fa-plus pr-1'></i> Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {searchInput.length > 0 && filteredData.length < 1 && (
        <p className='errorText'>
          No Employee Exists with name <strong>{searchInput}</strong>
        </p>
      )}

      {/* modal */}
      {modal && (
        <section className='modal-wrapper'>
          <div className='modal-main'>
            <div className='modal-input relative'>
              <p className='font-bold text-center mb-5 text-lg'>
                Edit Employee
              </p>
              <button
                onClick={() => setModal(false)}
                className='bg-red-500 absolute top-2 right-4 text-white rounded w-6 h-6 flex item-center justify-center font-bold cursor-pointer'
              >
                X
              </button>
              <div>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='First Name'
                  value={modalInputs?.firstName}
                  onChange={(e) =>
                    setModalInputs({
                      ...modalInputs,
                      firstName: e.target.value,
                    })
                  }
                />

                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4'
                  placeholder='Last Name'
                  value={modalInputs?.lastName}
                  onChange={(e) =>
                    setModalInputs({
                      ...modalInputs,
                      lastName: e.target.value,
                    })
                  }
                />

                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='City'
                  value={modalInputs?.city}
                  onChange={(e) =>
                    setModalInputs({
                      ...modalInputs,
                      city: e.target.value,
                    })
                  }
                />

                <button
                  class='mt-5 w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  onClick={submitForm}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Table;
