class PokemonClient {
    /**
     * Pokemon API Client
     * @param {string} baseURL - Base URL for the API
     */
    baseURL;
    defaultHeaders;
    constructor(baseURL = 'http://localhost:8090/api') {
      this.baseURL = baseURL;
      this.defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    }
  
    /**
     * Make HTTP request with error handling
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async makeRequest(url: string, options:any = {}) {
      try {
        const response = await fetch(url, {
          headers: { ...this.defaultHeaders, ...options.headers },
          ...options
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
  
        return data;
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new Error('Network error: Unable to connect to the server');
        }
        throw error;
      }
    }
  
    /**
     * Get pokemon by name or ID
     * @param {string|number} identifier - Pokemon name or ID
     * @returns {Promise<Object>} Pokemon data
     */
    async getPokemonByIdentifier(identifier: string | number) {
      if (!identifier) {
        throw new Error('Pokemon identifier is required');
      }
  
      const url = `${this.baseURL}/pokemon/${encodeURIComponent(identifier)}`;
      
      try {
        const response = await this.makeRequest(url);
        return response.data;
      } catch (error: any) {
        if (error.message.includes('404') || error.message.includes('not found')) {
          throw new Error(`Pokemon '${identifier}' not found`);
        }
        throw new Error(`Failed to fetch pokemon: ${error.message}`);
      }
    }
  
    /**
     * Get list of pokemons
     * @param {Object} options - Query options
     * @param {number} options.limit - Number of pokemons to fetch
     * @param {number} options.offset - Number of pokemons to skip
     * @param {boolean} options.detailed - Whether to fetch detailed info
     * @returns {Promise<Object>} Pokemon list data
     */
    async getPokemonList(options: any = {}) {
      const { limit = 20, offset = 0, detailed = false } = options;
      
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(detailed && { detailed: 'true' })
      });
  
      const url = `${this.baseURL}/pokemon?${params.toString()}`;
      
      try {
        const response = await this.makeRequest(url);
        return response.data;
      } catch (error: any) {
        throw new Error(`Failed to fetch pokemon list: ${error.message}`);
      }
    }
  
    /**
     * Search pokemon by partial name match
     * @param {string} searchTerm - Search term
     * @param {number} limit - Maximum results to return
     * @returns {Promise<Array>} Array of matching pokemon
     */
    async searchPokemon(searchTerm: string, limit = 10) {
      if (!searchTerm || searchTerm.trim().length < 2) {
        throw new Error('Search term must be at least 2 characters long');
      }
  
      try {
        // Get a larger list to search through
        const pokemonList = await this.getPokemonList({ limit: 1000 });
        
        const searchLower = searchTerm.toLowerCase().trim();
        const matches = pokemonList.results
          .filter((pokemon: any) => pokemon.name.toLowerCase().includes(searchLower))
          .slice(0, limit);
  
        return matches;
      } catch (error: any) {
        throw new Error(`Failed to search pokemon: ${error.message}`);
      }
    }
  
    /**
     * Get multiple pokemon by identifiers
     * @param {Array<string|number>} identifiers - Array of pokemon names or IDs
     * @returns {Promise<Array>} Array of pokemon data
     */
    async getMultiplePokemon(identifiers: string[] | number[]) {
      if (!Array.isArray(identifiers) || identifiers.length === 0) {
        throw new Error('Identifiers array is required and cannot be empty');
      }
  
      const promises = identifiers.map(async (identifier) => {
        try {
          return await this.getPokemonByIdentifier(identifier);
        } catch (error: any) {
          console.warn(`Failed to fetch pokemon '${identifier}':`, error.message);
          return null;
        }
      });
  
      const results = await Promise.all(promises);
      return results.filter(pokemon => pokemon !== null);
    }
  
    /**
     * Check if pokemon exists
     * @param {string|number} identifier - Pokemon name or ID
     * @returns {Promise<boolean>} Whether pokemon exists
     */
    async pokemonExists(identifier: string | number) {
      try {
        await this.getPokemonByIdentifier(identifier);
        return true;
      } catch (error: any) {
        if (error.message.includes('not found')) {
          return false;
        }
        throw error;
      }
    }
  
    /**
     * Get pokemon with caching support
     * @param {string|number} identifier - Pokemon name or ID
     * @param {number} cacheTime - Cache time in milliseconds (default: 5 minutes)
     * @returns {Promise<Object>} Pokemon data
     */
    async getPokemonWithCache(identifier: string, cacheTime = 5 * 60 * 1000) {
      const cacheKey = `pokemon_${identifier}`;
      const cached = this.getFromCache(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        return cached.data;
      }
  
      const pokemon = await this.getPokemonByIdentifier(identifier);
      this.setCache(cacheKey, pokemon);
      
      return pokemon;
    }
  
    /**
     * Simple cache implementation
     */
    getFromCache(key: string) {
      if (typeof localStorage !== 'undefined') {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch (error) {
          console.warn('Cache read error:', error);
          return null;
        }
      }
      return null;
    }
  
    setCache(key: string, data: any) {
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.warn('Cache write error:', error);
        }
      }
    }
  
    /**
     * Clear cache
     */
    clearCache() {
      if (typeof localStorage !== 'undefined') {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('pokemon_')) {
            localStorage.removeItem(key);
          }
        });
      }
    }
  }
export default PokemonClient;