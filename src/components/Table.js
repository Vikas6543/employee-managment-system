const Table = ({
  filteredData,
  removeEmployeeHandler,
  tableInputs,
  addEmployeeHandler,
  setTableInputs,
  searchInput,
  tableRef,
  sortTable,
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
              <td onClick={() => removeEmployeeHandler(index)}>
                <button className='remove-btn'>
                  <i className='fa-solid fa-trash pr-1 text-sm'></i> Remove
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
    </>
  );
};

export default Table;
