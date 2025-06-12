export interface Team {
    id: string;
    name: string;
    description?: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface TeamInput {
    name: string;
    description?: string;
    members?: string[];
  }
  
  class LocalStorageService {
    private readonly TEAMS_KEY = 'teams';
  
    /**
     * Get all teams from local storage
     */
    getTeams(): Team[] {
      try {
        const teamsJson = localStorage.getItem(this.TEAMS_KEY);
        if (!teamsJson) {
          return [];
        }
        
        const teams = JSON.parse(teamsJson);
        // Convert date strings back to Date objects
        return teams.map((team: any) => ({
          ...team,
          createdAt: new Date(team.createdAt),
          updatedAt: new Date(team.updatedAt),
        }));
      } catch (error) {
        console.error('Error getting teams from localStorage:', error);
        return [];
      }
    }
  
    /**
     * Get a specific team by ID
     */
    getTeamById(id: string): Team | null {
      const teams = this.getTeams();
      return teams.find(team => team.id === id) || null;
    }
  
    /**
     * Add a new team to local storage
     */
    addTeam(teamInput: TeamInput): Team {
      try {
        const teams = this.getTeams();
        
        const newTeam: Team = {
          id: this.generateId(),
          name: teamInput.name,
          description: teamInput.description || '',
          members: teamInput.members || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        teams.push(newTeam);
        this.saveTeams(teams);
        
        return newTeam;
      } catch (error) {
        console.error('Error adding team to localStorage:', error);
        throw new Error('Failed to add team');
      }
    }
  
    /**
     * Update an existing team
     */
    updateTeam(id: string, updates: Partial<TeamInput> | any): Team | null {
      try {
        const teams = this.getTeams();
        const teamIndex = teams.findIndex(team => team.id === id);
        
        if (teamIndex === -1) {
          return null;
        }
  
        teams[teamIndex] = {
          ...teams[teamIndex],
          ...updates,
          updatedAt: new Date(),
        };
  
        this.saveTeams(teams);
        return teams[teamIndex];
      } catch (error) {
        console.error('Error updating team in localStorage:', error);
        throw new Error('Failed to update team');
      }
    }
  
    /**
     * Delete a team by ID
     */
    deleteTeam(id: string): boolean {
      try {
        const teams = this.getTeams();
        const filteredTeams = teams.filter(team => team.id !== id);
        
        if (filteredTeams.length === teams.length) {
          return false; // Team not found
        }
  
        this.saveTeams(filteredTeams);
        return true;
      } catch (error) {
        console.error('Error deleting team from localStorage:', error);
        throw new Error('Failed to delete team');
      }
    }
  
    /**
     * Search teams by name
     */
    searchTeams(query: string): Team[] {
      const teams = this.getTeams();
      const lowercaseQuery = query.toLowerCase();
      
      return teams.filter(team => 
        team.name.toLowerCase().includes(lowercaseQuery) ||
        team.description?.toLowerCase().includes(lowercaseQuery) ||
        team.members.some(member => member.toLowerCase().includes(lowercaseQuery))
      );
    }
  
    /**
     * Remove a member from a team
     */
    removeMemberFromTeam(teamId: string, memberName: string): Team | null {
      try {
        const teams = this.getTeams();
        const teamIndex = teams.findIndex(team => team.id === teamId);
        
        if (teamIndex === -1) {
          return null;
        }

  
        teams[teamIndex].members = teams[teamIndex].members.filter(
          (member: any) => member.name !== memberName
        );
        teams[teamIndex].updatedAt = new Date();
        this.saveTeams(teams);
  
        return teams[teamIndex];
      } catch (error) {
        console.error('Error removing member from team:', error);
        throw new Error('Failed to remove member from team');
      }
    }
  
    /**
     * Clear all teams from local storage
     */
    clearAllTeams(): void {
      try {
        localStorage.removeItem(this.TEAMS_KEY);
      } catch (error) {
        console.error('Error clearing teams from localStorage:', error);
        throw new Error('Failed to clear teams');
      }
    }
  
    /**
     * Private method to save teams to localStorage
     */
    private saveTeams(teams: Team[]): void {
        console.log('Saving teams to localStorage:', teams);
      localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
    }

    /**
     * Get team score by a team by ID
     */

    getScoreByStat(stat: {name: string, base_stat: number}): number {
        switch (stat.name) {
            case 'hp':  
                return stat.base_stat * 2; // Example: HP contributes double
            case 'attack':
                return stat.base_stat * 1.5; // Example: Attack contributes 1.5x
            case 'defense':
                return stat.base_stat * 1.2; // Example: Defense contributes 1.2x
            case 'special-attack':
                return stat.base_stat * 1.3; // Example: Special Attack contributes 1.3x
            case 'special-defense':
                return stat.base_stat * 1.1; // Example: Special Defense contributes 1.1x
            case 'speed':
                return stat.base_stat * 1.4; // Example: Speed contributes 1.4x
            default:
                return 0; // Default case, no multiplier
        }
    }

    getTeamScore(teamId: string): number {
        const team = this.getTeamById(teamId);
        if (!team) {
            return 0;
        }
        // Assuming score is the number of members in the team
        let totalScore = 0;
        team.members.forEach((member: any) => {
            member.stats.forEach((stat: {name: string, base_stat: number}) => {
                totalScore += this.getScoreByStat(stat);
            });
        })
        return Math.round(totalScore);
    }
    /**
     * Private method to generate a unique ID
     */
    private generateId(): string {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
  }
  
  // Export a singleton instance
  export const localStorageService = new LocalStorageService();
  export default localStorageService;
  