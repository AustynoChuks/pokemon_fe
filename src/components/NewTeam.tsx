import React, { useState, type MouseEventHandler } from 'react';
import '../App.css'
import PokemonClient from '../service/pokemon';
import localStorageService from '../service/storage';
import { useNavigate } from 'react-router-dom';

const NewTeam: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonName, setPokemonName] = useState<string>('');
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const [stage, setStage] = useState<number>(1);
    const navigate = useNavigate();
    const pokeMoneService = new PokemonClient();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit: any = (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setStage(2);
  };

  const handleAddPokemon: MouseEventHandler<HTMLButtonElement> = async (event: any) => {
    if(selectedMembers.length >= 6) {
        alert('You can only add up to 6 pokemon to a team');
        return;
    }
    try{
        event.preventDefault();
        const pokemon = await pokeMoneService.getPokemonByIdentifier(pokemonName);
        setSelectedMembers([...selectedMembers.filter(member=>member.id !== pokemon.id), pokemon]);
        setPokemonName('');
    }catch (error) {
        console.error('Error adding pokemon:', error);
    }
  }

  const removePokemon = (pokemonId: number) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== pokemonId));  
}

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        New Team
      </h2>
      
        <form onSubmit={handleSearchSubmit} className="space-y-4">
        {stage === 1 &&
            <div>
                <div className="relative flex items-center py-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Team name"
                        className="block w-full pl-10 pr-3 py-2 border"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!searchQuery}
                    className={`w-full flex justify-center py-2 px-4 btn ${!!searchQuery ? 'btn-primary' : 'btn-outline-secondary'} rounded-md transition duration-150 ease-in-out`}
                    >
                    Next
                </button>
            </div>
            }

            {stage === 2 &&
            <div className='relative'>
                <p>Add pokemon to <b>{searchQuery}</b></p>
                <div className="relative flex items-center py-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value)}
                        placeholder="Add pokemon by id or name"
                        className="block w-full pl-10 pr-3 py-3 border"
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={() => setStage(1)}
                        className={`justify-center px-4 bg-red-200 btn transition duration-150 ease-in-out`}
                        >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={!searchQuery}
                        onClick={handleAddPokemon}
                        className={`justify-center px-4 btn ${!!searchQuery ? 'btn-primary' : 'btn-secondary'} transition duration-150 ease-in-out`}
                        >
                        Add
                    </button>
                </div>
                {!!selectedMembers.length &&
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Selected Members:</h3>
                        {selectedMembers.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-2 border-b">
                                <div className="flex">
                                    <img src={member.sprites.front_default} alt={member.name} className="w-8 h-8 mr-2" />
                                    <span className="text-gray-800">{member.name}</span>
                                </div>
                                <button className="text-gray-500" onClick={()=>removePokemon(member.id)}>remove</button>
                            </div>

                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                const newTeam = localStorageService.addTeam({
                                    name: searchQuery,
                                    members: selectedMembers
                                });
                                alert(`Team ${searchQuery} created with ${selectedMembers.length} members`);
                                setStage(1);
                                setSearchQuery('');
                                setPokemonName('');
                                setSelectedMembers([]);
                                navigate(`/team/${newTeam.id}`);
                            }}
                            className={`mt-4 w-full flex justify-center py-2 px-4 btn btn-primary rounded-md transition duration-150 ease-in-out`}
                        >
                            Create Team
                        </button>
                    </div>
                }

            </div>
            }
        </form>
    </div>
  );
};

export default NewTeam;
