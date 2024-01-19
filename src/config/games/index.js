import Lorcana from './lorcana';
import Pokemon from './pokemon';
import StarWarsUnlimited from './star-wars-unlimited';

const config = {
    lorcana: Lorcana,
    pokemon: Pokemon,
    'star-wars-unlimited': StarWarsUnlimited,
};

export const availableGames = Object.keys(config).filter((game) => config[game].is_available);

export default config;
