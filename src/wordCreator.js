const createRoot = (roots, meanings) => ({ roots, meanings });
const createEnding = (endings, type, meanings) => ({ endings, type, meanings });

const wordType = Object.freeze({
  noun: 'noun',
  verb: 'verb',
  adj: 'adjective',
});

const rootTable = Object.freeze([
  createRoot(['brachi'], ['the arm']),
  createRoot(['bucc'], ['the cheek']),
  createRoot(['caud'], ['the tail']),
  createRoot(['celi', 'cel', 'lapar', 'abdomin', 'ventr'], ['the abdomen']),
  createRoot(['cephal'], ['the head']),
  createRoot(['cervic', 'trachel'], ['the neck']),
  createRoot(['cheil', 'labi'], ['the lip', 'the labium']),
  createRoot(['cheir', 'chir'], ['the hand']),
  createRoot(['crur'], ['the leg', 'a leg-like structure', 'the thigh']),
  createRoot(['dactyl'], ['the digit', 'the finger', 'the toe']),
  createRoot(['derm', 'dermat'], ['the skin']),
  createRoot(['gnath'], ['the jaw']),
  createRoot(['inguin'], ['the groin']),
  createRoot(['later'], ['the side']),
  createRoot(['lumb'], ['the loin']),
  createRoot(['ment'], ['the chin']),
  createRoot(['om'], ['the shoulder']),
  createRoot(['omphal', 'umbilic'], ['the navel', 'the umbilicus']),
  createRoot(['path'], ['disease']),
  createRoot(['pod', 'ped'], ['the foot']),
  createRoot(['sarc'], ['the flesh']),
  createRoot(['soma', 'somat'], ['the body']),
  createRoot(['thorac', 'steth', 'pector'], ['the chest', 'the thorax']),
])

const endingTable = Object.freeze([
  // Grammatical suffixes
  createEnding(['ia', 'y'], wordType.noun),
  createEnding([
    'ic',
    'tic',
    'al',
    'ical',
    'ac',
    'ar',
    'ary',
    'eal',
    'ine',
    'ile',
    'ous',
  ], wordType.adj, ['pertaining to {}']),
  createEnding(['ize'], wordType.verb),

  // Clinical suffixes
  createEnding(['ad'], wordType.noun, ['the movement in a direction from {} towards {}']),
  createEnding(['ate'], wordType.noun, ['having {}', 'having the form of {}']),
  createEnding(['ics'], wordType.noun, ['the study of {}']),
  createEnding(['ist'], wordType.noun, ['a specialist in {}']),
  createEnding(['itis'], wordType.noun, ['inflammation of {}']),
  createEnding(['oid'], wordType.adj, ['resembling {}', 'like {}']),
  createEnding(['osis', 'ism', 'iasis'], wordType.noun, ['condition of {}']),
  createEnding(['ous'], wordType.adj, ['containing {}']),

  // Terminations
  createEnding(['algia'], wordType.noun, ['pain in {}']),
  createEnding(['cele'], wordType.noun, [
    'protrusion from {}',
    'protrusion filled with {}',
  ]),
  createEnding(['ectome'], wordType.noun, ['instrument used to excise {}']),
  createEnding(['ectomize'], wordType.verb, ['excise {}']),
  createEnding(['ectomy'], wordType.noun, ['excision of {}', 'surgical removal of {}']),
  createEnding(['gram'], wordType.noun, ['a record of {}']),
  createEnding(['graph'], wordType.noun, ['an instrument used to record {}']),
  createEnding(['graphy'], wordType.noun, ['a recording of {}']),
  createEnding(['logist'], wordType.noun, ['a specialist in the study of {}']),
  createEnding(['logical'], wordType.adj, ['pertaining to the study of {}']),
  createEnding(['logy'], wordType.noun, ['study of {}']),
  createEnding(['megaly'], wordType.noun, ['enlargement of {}']),
  createEnding(['meter'], wordType.noun, ['instrument used to measure {}']),
  createEnding(['metry'], wordType.noun, ['measurement of {}']),
  createEnding(['ostomy'], wordType.noun, ['creation of a passage into {}',
                            'creation of a passage between {} and {}']),
  createEnding(['pathic'], wordType.adj, ['pertaining to a disease of {}']),
  createEnding(['pathy'], wordType.noun, ['disease of {}']),
  createEnding(['plasty'], wordType.noun, ['surgical repair of {}']),
  createEnding(['scope'], wordType.noun, ['instrument used to make a visual examination of {}']),
  createEnding(['scopy'], wordType.noun, ['visual examination of {}']),
  createEnding(['tome'], wordType.noun, ['instrument used to cut into {}']),
  createEnding(['tomy'], wordType.noun, ['incision into {}']),
]);

// Array.prototype.flat is currently a candidate only for ES
const flatten = (array) => array.reduce((acc, val) => acc.concat(val), []);

export default () => {
  const ending = endingTable[Math.floor(Math.random() * endingTable.length)];
  const endingMeanings = [];

  let numRoots = 1;
  if (ending.meanings) {
    // Some endings have differences with 1 or 2+ roots, so pick one
    const endingMeaning = ending.meanings[Math.floor(Math.random() * ending.meanings.length)];
    numRoots = (endingMeaning.match(/{}/g) || []).length;

    // We want to create all possible combinations, so pick the rest of the
    // meanings with the same number of roots
    ending.meanings.forEach((meaning) => {
      if ((meaning.match(/{}/g) || []).length === numRoots) {
        endingMeanings.push(meaning);
      }
    });
  } else {
    endingMeanings.push('{}');
  }

  const roots = [];
  for (let i = 0; i < numRoots; i++) {
    // TODO: Make this not mutually exclusive (no repeat roots)
    roots.push(rootTable[Math.floor(Math.random() * rootTable.length)]);
  }

  // Create all possible terms
  const combineRoots = (rootPart, nextRootParts) => {
    // Append all nextRootParts to rootPart
    // TODO: Replace with proper root concatenation
    return nextRootParts.map((part) => rootPart + 'o' + part);
  };

  let rootCombinations = roots[0].roots.map((rootPart) => rootPart);
  for (let i = 1; i < numRoots; i++) {
    const newCombinations = [];
    rootCombinations.forEach((combination) => {
      newCombinations.push(combineRoots(combination, roots[i].roots));
    });
    rootCombinations = newCombinations;
  }

  const terms = [];
  ending.endings.forEach((endingPart) => {
    const vowel = ['a', 'i', 'u', 'e', 'o', 'h'].reduce((acc, vowel) => {
      return acc || endingPart[0] === vowel;
    }, false);
    rootCombinations.forEach((part) => {
      let term = part;
      if (!vowel) {
        term += 'o';
      }
      term += endingPart;
      terms.push(term);
    });
  });

  // Create all possible meanings
  let meanings = endingMeanings;
  for (let i = 0; i < numRoots; i++) {
    const newCombinations = [];
    meanings.forEach((meaning) => {
      // replace
      newCombinations.push(roots[i].meanings.map((rootMeaning) => {
        return meaning.replace(/{}/, rootMeaning);
      }));
    });
    meanings = flatten(newCombinations);
  }

  // Add "to" if the word type is a verb
  if (ending.type === wordType.verb) {
    meanings = meanings.map((meaning) => {
      if (meaning.startsWith('the')) {
        return meaning.replace(/the/, 'to');
      }
      return 'to ' + meaning;
    });
  }

  return { terms, meanings, type: ending.type };
};
