import { randomElements, randomizeSort, randomNumber, randomSimilarNumbers } from '../../../utilities/random';

/**
 * Existing keywords in the game so far.
 *
 * @type {*[]}
 */
const KEYWORDS = [
    'Bodyguard',
    'Challenger',
    'Evasive',
    'Reckless',
    'Resist',
    'Rush',
    'Shift',
    'Singer',
    'Support',
    'Ward'
];

/**
 * Existing classifications in the game so far.
 *
 * @type {*[]}
 */
const CLASSIFICATIONS = [
    'Action',
    'Alien',
    'Ally',
    'Broom',
    'Captain',
    'Deity',
    'Detective',
    'Dragon',
    'Dreamborn',
    'Fairy',
    'Floodborn',
    'Hero',
    'Inventor',
    'Item',
    'King',
    'Knight',
    'Location',
    'Mentor',
    'Musketeer',
    'Pirate',
    'Prince',
    'Princess',
    'Queen',
    'Seven Dwarfs',
    'Song',
    'Sorcerer',
    'Storyborn',
    'Tigger',
    'Villain',
];


/**
 * Generate a set of questions for the Lorcana game.
 *
 * @TODO: Improve code to make sure to include all type of fields.
 *
 * @param numberOfQuestions
 * @param cards
 * @param fields
 * @return {*[]}
 */
export const generate = (numberOfQuestions, cards, fields) => {
    const questions = [];
    const usedCards = new Set();
    const totalCards = cards.length;
    while (questions.length < numberOfQuestions && usedCards.size < totalCards) {
        const cardIndex = randomNumber(0, totalCards - 1);
        if (!usedCards.has(cardIndex)) {
            usedCards.add(cardIndex);
            const card = cards[cardIndex];
            const compatibleFields = fields.filter(field => field.types.filter(type => card.types.includes(type)).length > 0);
            const field = compatibleFields[randomNumber(0, compatibleFields.length - 1)];

            let text = '', answer = '', options = [];
            let values = [];
            switch (field.key) {
                case 'ink':
                    values = fields.find(field => field.key === 'ink').values.filter(value => value !== card.ink);
                    text = `What is the ink of the card?`;
                    answer = card.ink;
                    options = randomElements(values, 2)
                        .concat([answer])
                        .sort(randomizeSort);
                    break;
                case 'lore':
                    values = randomSimilarNumbers(card.lore);
                    text = `How much lore does a character gain when questing?`;
                    answer = card.lore;
                    options = values
                        .concat([answer])
                        .sort(randomizeSort);
                    break;
                case 'cost':
                    values = randomSimilarNumbers(card.ink_cost);
                    text = `How much ink does the card cost?`;
                    answer = card.ink_cost;
                    options = values
                        .concat([answer])
                        .sort(randomizeSort);
                    break;
                case 'inkable':
                    text = `Is the card inkable?`;
                    answer = card.inkable ? 'Yes' : 'No';
                    options = ['Yes', 'No'];
                    break;
                case 'willpower':
                    values = randomSimilarNumbers(card.willpower);
                    text = `How much willpower does the card have?`;
                    answer = card.willpower;
                    options = values
                        .concat([answer])
                        .sort(randomizeSort);
                    break;
                case 'strength':
                    values = randomSimilarNumbers(card.strength);
                    text = `How much strength does the card have?`;
                    answer = card.strength;
                    options = values
                        .concat([answer])
                        .sort(randomizeSort);
                    break;

                case 'rarity':
                    values = fields.find(field => field.key === 'rarity').values.filter(value => value !== card.rarity);
                    text = `What is the rarity of the card?`;
                    answer = card.rarity;
                    options = randomElements(values, 2)
                        .concat([answer])
                        .sort(randomizeSort);
                    break;

                case 'text':
                    text = `What keywords does the text of the card include?`;
                    answer = card.keywords.length ? card.keywords.join(', ') : 'None of those'
                    options = new Set();
                    options.add(answer);
                    while (options.size < 3) {
                        let randomOption = randomElements(KEYWORDS, randomNumber(1, 2)).join(', ');
                        if (randomNumber(10, 25) === 13) {
                            randomOption = 'None of those';
                        }
                        options.add(randomOption);
                    }
                    options = Array.from(options).sort(randomizeSort);
                    break;
                case 'classifications':
                    text = `What classifications does the text of the card include?`;
                    answer = card.classifications.join(', ');
                    options = new Set();
                    options.add(answer);
                    while (options.size < 3) {
                        options.add(randomElements(CLASSIFICATIONS, 2).join(', '));
                    }
                    options = Array.from(options).sort(randomizeSort);
                    break;
            }

            questions.push({
                field,
                card,
                text,
                answer,
                options,
            });
        }
    }

    return questions;
}
