import React, { useState, useRef } from 'react';
import FruitList from './FruitList';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [fruits, setFruits] = useState([]);
    const fruitNameRef = useRef();

    function toggleFruit(id) {
        const newFruits = [...fruits];
        const fruit = newFruits.find(fruit => fruit.id === id);
        if (fruit) {
            fruit.complete = !fruit.complete;
            setFruits(newFruits);
        }
    }

    function handleAddFruits() {
        const name = fruitNameRef.current.value;
        if (name === '') return;

        setFruits(prevFruits => [
            ...prevFruits,
            { id: uuidv4(), name, complete: false }
        ]);

        fruitNameRef.current.value = '';
    }

    function handleClearFruits() {
        const newFruits = fruits.filter(fruit => !fruit.complete);
        setFruits(newFruits);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Жимсний жагсаалт</h1>
                <FruitList fruits={fruits} toggleFruit={toggleFruit} />
                <div className="mt-4">
                    <input 
                        ref={fruitNameRef} 
                        type="text" 
                        placeholder="Enter fruit name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button 
                        onClick={handleAddFruits} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Жагсаалт нэмэх
                    </button>
                    <button 
                        onClick={handleClearFruits} 
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                        Арилгах
                    </button>
                </div>
                <div className="mt-4 text-center text-gray-700">
                    {fruits.filter(fruit => !fruit.complete).length} -ийг нэмсэн
                </div>
            </div>
        </div>
    );
}

export default App;
