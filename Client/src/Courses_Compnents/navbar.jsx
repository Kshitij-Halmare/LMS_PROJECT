import React, { useState } from 'react';

function NavbarComponent() {
    const [selected, setSelected] = useState("All Courses");

    // Function to determine if the button is selected
    const isSelected = (buttonName) => selected === buttonName;

    return (
        <>
            <div className='px-3 pt-2'>
                <div className='flex w-full justify-around  border  rounded-3xl text-blue-500'>
                    <button
                        className={`w-full py-2 px-6 text-center border-r rounded-l-3xl border-gray-300 transition-colors duration-300 ease-in-out ${isSelected("All Courses") ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                        onClick={() => { setSelected("All Courses"); }}
                    >
                        All Courses
                    </button>
                    
                    <button
                        className={`w-full py-2 px-6 text-center border-r border-gray-300 transition-colors duration-300 ease-in-out ${isSelected("In Progress") ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                        onClick={() => { setSelected("In Progress"); }}
                    >
                        In Progress
                    </button>
                    
                    <button
                        className={`w-full py-2 px-6 text-center rounded-r-3xl transition-colors duration-300 ease-in-out ${isSelected("Completed") ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                        onClick={() => { setSelected("Completed"); }}
                    >
                        Completed
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavbarComponent;
