import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorageService from '../service/storage';

const Teams: React.FC = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        setTeams(localStorageService.getTeams())
    }, []);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Teams
        </h2>
        
        <div className="space-y-4">
            {
                teams.map((team) => (
                    <button className='block w-full clear-both' onClick={() => navigate(`/team/${team.id}`)} key={team.id}>
                        <div key={team.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {team?.name?.toUpperCase?.()}
                                </h3>
                                <span className="text-sm text-gray-400">
                                    {team.members.length} Members
                                </span>
                            </div>
                            <div>
                                <p>
                                    {team.createdAt.toLocaleDateString()}
                                </p>
                                <span className="text-sm">
                                    {team.createdAt.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </button>
                ))
            }
        </div>

        {
            teams.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    <p>No teams found. Please create a new team.</p>
                    <button 
                        className="mt-5 px-4 py-2  rounded btn-primary transition duration-150"
                        onClick={() => navigate('/add-team')}
                    >
                        Create Team 
                    </button>
                </div>
            )
        }
        
        </div>
    );
};

export default Teams;
