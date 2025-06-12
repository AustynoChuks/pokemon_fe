import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import localStorageService from '../service/storage';
import PokemonClient from '../service/pokemon';


interface TeamData {
    id: string;
    name: string;
    description: string;
    members: any[];
    total: number;
}

const Team: React.FC = () => {
    const params = useParams<{ teamId: string }>();
    const navigate = useNavigate();
    const [team, setTeam] = useState<any>(null);
    const [pokemonName, setPokemonName] = useState<string>('');
    const pokemonService = new PokemonClient();

    const getTeamDetals = () => {
        const teamId = params.teamId;
        setTeam(localStorageService.getTeamById(teamId || ''));
    }

    useEffect(() => {
        getTeamDetals();
    }, []);

    console.log('Team data:', team);
    if (!team) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <p className="text-center text-gray-500">Team not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {team.name}
                </h2>
                <p className="text-gray-600 mb-4">{team.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-700">
                        Total Members: {team.members?.length || 0}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                        Total Team Scores: {localStorageService.getTeamScore(team.id)}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                
                {team.members?.length < 6 && <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">AddTeam Members</h3>
                <div className="flex mb-5 pb-5">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={pokemonName}
                            onChange={(e) => setPokemonName(e.target.value)}
                            placeholder="Add pokemon by id or name"
                            className="block w-full pl-10 pr-3 py-3 border"
                        />
                    </div>
                    <button
                        onClick={async () => {
                            if (pokemonName.trim()) {
                                try {
                                    const pokemon = await pokemonService.getPokemonByIdentifier(pokemonName.trim());
                                    if (pokemon) {
                                        const members = team.members.filter((member: any) => member.id !== pokemon.id);
                                        const updatedTeam = localStorageService.updateTeam(team.id, {...team, members:[...members, pokemon]});
                                        localStorageService.updateTeam(team.id, updatedTeam);
                                        getTeamDetals();
                                        setPokemonName('');
                                    } else {
                                        alert('Pokemon not found');
                                    }
                                } catch (error) {
                                    console.error('Error adding member:', error);
                                    alert('Pokemon not found');
                                }
                            }
                        }}
                        className="ml-2 px-4 py-3 bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                        Add Member
                        </button>
                </div>
                </div>}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Members</h3>
                {!team.members || team.members.length === 0 ? (
                    <p className="text-gray-500 text-center">No members found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.members.map((member: any) => (
                            <div key={member.id} className="p-4 border relative border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <img 
                                    src={member.sprites?.front_default} 
                                    alt={member.name} 
                                    className="w-full h-32 object-cover mb-2 rounded"/>
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    {member.name}
                                </h4>
                                {member.stats.map((stat: { name: string, base_stat: number }) => (
                                    <div key={stat.name} className="text-sm text-gray-600 mb-1 flex justify-between">
                                        <span className="font-semibold">{stat.name.replace('-', ' ').toUpperCase()}: </span>
                                        {stat.base_stat}
                                    </div>
                                ))}
                                
                                <button className='absolute top-0 right-0' onClick={() => {
                                    localStorageService.removeMemberFromTeam(team.id, member.name); getTeamDetals()}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 6H5H21" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10 11V17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 11V17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button 
                onClick={() => navigate('/teams')}
                className="mt-6 px-4 py-2 bg-gray-500"
            >
                Back to Teams
            </button>
        </div>
    );
};

export default Team;
