import React, { useState } from 'react';

function FilterBox() {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [level, setLevel] = useState([]);
    const [price, setPrice] = useState(50);
    const [area, setArea] = useState([]);

    const handleLanguageChange = (language) => {
        setSelectedLanguages((prevSelectedLanguages) =>
            prevSelectedLanguages.includes(language)
                ? prevSelectedLanguages.filter(item => item !== language)
                : [...prevSelectedLanguages, language]
        );
    };

    const handleLevelChange = (level1) => {
        setLevel((prevLevel) =>
            prevLevel.includes(level1)
                ? prevLevel.filter(item => item !== level1)
                : [...prevLevel, level1]
        );
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleAreaChange = (areaName) => {
        setArea((prevArea) =>
            prevArea.includes(areaName)
                ? prevArea.filter(item => item !== areaName)
                : [...prevArea, areaName]
        );
    };

    return (
        <div className=" bg-gray-100 p-4 sticky top-0 rounded-2xl shadow-xl shadow-black ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Filter</h1>
                <button
                    onClick={() => {
                        setSelectedLanguages([]);
                        setLevel([]);
                        setArea([]);
                        setPrice(50);
                    }}
                    className="text-sm font-light text-blue-500 hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(100vh-230px)]">
                {/* Language Filter */}
                <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Language</h2>
                    <div className="space-y-2">
                        {['English', 'French', 'German', 'Spanish'].map((language) => (
                            <label key={language} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(language)}
                                    onChange={() => handleLanguageChange(language)}
                                    className="form-checkbox text-blue-600"
                                />
                                <span>{language}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Level Filter */}
                <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Level</h2>
                    {['Beginner', 'Intermediate', 'Advanced'].map((levelOption) => (
                        <label key={levelOption} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={level.includes(levelOption)}
                                onChange={() => handleLevelChange(levelOption)}
                                className="form-checkbox text-blue-600"
                            />
                            <span>{levelOption}</span>
                        </label>
                    ))}
                </div>

                {/* Price Filter */}
                <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Price</h2>
                    <input
                        type="range"
                        value={price}
                        min={20}
                        max={100}
                        onChange={handlePriceChange}
                        className="w-full"
                    />
                    <h1>Price ${price}</h1>
                </div>

                {/* Area Filter */}
                <div className="">
                    <h2 className="text-lg font-medium mb-2">Area</h2>
                    {['Programming', 'Business', 'Design', 'Health & Fitness'].map((areaName) => (
                        <label key={areaName} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={area.includes(areaName)}
                                onChange={() => handleAreaChange(areaName)}
                                className="form-checkbox text-blue-600"
                            />
                            <span>{areaName}</span>
                        </label>
                    ))}
                </div>
                <div className='py-4 flex justify-center'>
                    <button className=' px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white'>Apply Filter</button>
                </div>
            </div>
        </div>
    );
}

export default FilterBox;
