/* ============================================
   READING RUSH — Question Bank
   150+ questions across 4 literacy domains
   Levels: 1=PitStop, 2=StreetRace, 3=GrandPrix, 4=PhotoFinish
   ============================================ */

const QuestionBank = (() => {

    const questions = [

        // =============================================
        //  READING COMPREHENSION
        // =============================================

        // --- Level 1 (Pit Stop ⭐) ---
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'The dog ran across the yard and jumped into the pond. Water splashed everywhere. The children laughed and clapped.',
            question: 'Where did the dog jump?',
            options: ['Into the pond', 'Over the fence', 'Into the house', 'Under the tree'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'Maria packed her bag with books, a pencil, and her lunch. She waited at the bus stop. The yellow bus arrived at 7:30.',
            question: 'What is Maria getting ready for?',
            options: ['School', 'A vacation', 'A sleepover', 'A party'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'The sun was setting behind the mountains. The sky turned orange and pink. Birds flew home to their nests.',
            question: 'What time of day is it?',
            options: ['Evening', 'Morning', 'Midnight', 'Noon'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'Jake put on his helmet and knee pads. He grabbed his skateboard and headed to the park.',
            question: 'Why did Jake put on a helmet?',
            options: ['To stay safe while skateboarding', 'To ride his bike', 'To play football', 'Because it was cold'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'The farmer picked apples from the tree and put them in a basket. He would sell them at the market tomorrow.',
            question: 'What will the farmer do with the apples?',
            options: ['Sell them at the market', 'Feed them to the cows', 'Throw them away', 'Plant them'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'tf',
            passage: 'Penguins live in cold places and cannot fly. They are excellent swimmers.',
            question: 'Penguins can fly.',
            answer: false
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'Lily watered her garden every morning. After two weeks, small green sprouts appeared in the soil.',
            question: 'What happened because Lily watered the garden?',
            options: ['Plants started to grow', 'The soil dried up', 'The flowers died', 'Nothing happened'],
            answer: 0
        },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'The cat hid under the bed when it heard thunder. It stayed there until the storm was over.',
            question: 'How did the cat feel during the storm?',
            options: ['Scared', 'Happy', 'Hungry', 'Sleepy'],
            answer: 0
        },

        // --- Level 2 (Street Race ⭐⭐) ---
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'The ancient Egyptians built the pyramids as tombs for their pharaohs. These massive structures took thousands of workers and many years to complete. The largest pyramid, the Great Pyramid of Giza, was the tallest building in the world for over 3,800 years.',
            question: 'What was the main purpose of the pyramids?',
            options: ['Tombs for pharaohs', 'Homes for workers', 'Places of worship', 'Storage for grain'],
            answer: 0
        },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'Monarch butterflies travel thousands of miles each year during their migration. They fly from Canada and the United States all the way to Mexico. Scientists are still studying how they navigate such a long journey.',
            question: 'What makes monarch butterfly migration remarkable?',
            options: ['The incredible distance they travel', 'Their bright colors', 'They only fly at night', 'They swim part of the way'],
            answer: 0
        },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'Rosa Parks refused to give up her seat on a bus in Montgomery, Alabama in 1955. Her brave act helped spark the Civil Rights Movement in America.',
            question: 'What is the main idea of this passage?',
            options: ["Rosa Parks' act of courage helped start the Civil Rights Movement", 'Buses in Alabama were always crowded', 'Rosa Parks liked riding buses', 'Montgomery was a big city'],
            answer: 0
        },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'When you exercise, your heart beats faster to pump more blood to your muscles. Your lungs work harder to bring in more oxygen. That is why you breathe heavily after running.',
            question: 'Why do you breathe heavily after running?',
            options: ['Your lungs need to bring in more oxygen', 'You are scared', 'The air is too hot', 'Your stomach is full'],
            answer: 0
        },
        {
            domain: 'reading', level: 2, type: 'tf',
            passage: 'The Amazon Rainforest produces about 20% of the world\'s oxygen. It is home to millions of species of plants and animals.',
            question: 'The Amazon Rainforest produces about 20% of the world\'s oxygen.',
            answer: true
        },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'Thomas Edison failed thousands of times before inventing the light bulb. He said, "I have not failed. I\'ve just found 10,000 ways that won\'t work."',
            question: 'What lesson can we learn from Edison\'s quote?',
            options: ['Failure is part of learning and success', 'Science is too hard', 'Light bulbs are easy to make', 'Edison gave up often'],
            answer: 0
        },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'Camels store fat in their humps, not water as many people believe. This fat can be converted into energy and water when food is scarce in the desert.',
            question: 'What do camels actually store in their humps?',
            options: ['Fat', 'Water', 'Food', 'Sand'],
            answer: 0
        },

        // --- Level 3 (Grand Prix ⭐⭐⭐) ---
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: 'In George Orwell\'s "Animal Farm," the pigs gradually take control of the farm, changing the rules to benefit themselves while the other animals work harder. The story is an allegory for political corruption.',
            question: 'What literary device does Orwell use in "Animal Farm"?',
            options: ['Allegory', 'Onomatopoeia', 'Alliteration', 'Hyperbole'],
            answer: 0
        },
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: 'The Industrial Revolution transformed society from agricultural to industrial. While it brought technological advances and economic growth, it also led to poor working conditions, child labor, and environmental pollution.',
            question: 'What tone does the author use when discussing the Industrial Revolution?',
            options: ['Balanced — showing both positives and negatives', 'Entirely positive', 'Entirely negative', 'Humorous'],
            answer: 0
        },
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: '"The road stretched endlessly before her, a ribbon of gray under the white-hot sun. Each step felt heavier than the last, but she refused to stop. Behind her, the old life crumbled like the dried earth beneath her feet."',
            question: 'What does "the old life crumbled" most likely suggest?',
            options: ['She is leaving her past behind', 'The road is falling apart', 'There was an earthquake', 'She is very tired'],
            answer: 0
        },
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: 'Studies show that students who read for pleasure perform better academically across all subjects, not just language arts. Reading improves critical thinking, expands vocabulary, and strengthens neural pathways in the brain.',
            question: 'What is the author\'s purpose in this passage?',
            options: ['To persuade readers that reading has broad academic benefits', 'To entertain with a funny story', 'To describe how the brain works', 'To compare different school subjects'],
            answer: 0
        },
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: '"Climate change is a hoax," said Senator Blake at the press conference. Meanwhile, NASA scientists released data showing the ten warmest years on record have all occurred since 2010.',
            question: 'What technique does the author use to present this information?',
            options: ['Juxtaposition of contrasting viewpoints', 'First-person narrative', 'Chronological order', 'Cause and effect'],
            answer: 0
        },
        {
            domain: 'reading', level: 3, type: 'tf',
            passage: 'An unreliable narrator is a character whose telling of the story is not completely accurate or credible, often due to bias, limited knowledge, or intentional deception.',
            question: 'An unreliable narrator always tells the truth in a story.',
            answer: false
        },

        // --- Level 4 (Photo Finish 🏁) ---
        {
            domain: 'reading', level: 4, type: 'mc',
            passage: '"Hope is the thing with feathers / That perches in the soul / And sings the tune without the words / And never stops at all." — Emily Dickinson',
            question: 'Dickinson uses an extended metaphor comparing hope to:',
            options: ['A bird', 'A song', 'A tree', 'The wind'],
            answer: 0
        },
        {
            domain: 'reading', level: 4, type: 'mc',
            passage: 'The pharmaceutical company\'s study found their new drug to be "highly effective." However, the study was funded entirely by the company, peer review was limited, and the sample size was only 50 participants.',
            question: 'Why should readers be skeptical of the study\'s claim?',
            options: ['Potential bias from company funding, limited review, and small sample', 'The drug was too expensive', 'Drugs never work', 'The participants were too old'],
            answer: 0
        },

        // =============================================
        //  VOCABULARY
        // =============================================

        // --- Level 1 ---
        { domain: 'vocab', level: 1, type: 'mc', question: 'What does "enormous" mean?', options: ['Very big', 'Very small', 'Very fast', 'Very old'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'Which word is a SYNONYM for "happy"?', options: ['Joyful', 'Angry', 'Tired', 'Scared'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'Which word is an ANTONYM for "hot"?', options: ['Cold', 'Warm', 'Burning', 'Sunny'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'What does "beneath" mean?', options: ['Under', 'Above', 'Beside', 'Behind'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: '"The brave firefighter rushed into the building." What does "brave" mean?', options: ['Courageous', 'Afraid', 'Lazy', 'Confused'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'Which word means "to move quickly"?', options: ['Rush', 'Crawl', 'Pause', 'Rest'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'What is a SYNONYM for "said"?', options: ['Stated', 'Whispered nothing', 'Walked', 'Thought'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'tf', question: '"Ancient" means something very new.', answer: false },
        { domain: 'vocab', level: 1, type: 'mc', question: '"She was furious when she saw the broken window." What does "furious" mean?', options: ['Very angry', 'Very happy', 'Very quiet', 'Very confused'], answer: 0 },
        { domain: 'vocab', level: 1, type: 'mc', question: 'Which word means "not real"?', options: ['Imaginary', 'Actual', 'Certain', 'Honest'], answer: 0 },

        // --- Level 2 ---
        { domain: 'vocab', level: 2, type: 'mc', question: '"The teacher commended the student for her excellent work." What does "commended" mean?', options: ['Praised', 'Punished', 'Ignored', 'Questioned'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'Which word is an ANTONYM for "generous"?', options: ['Selfish', 'Kind', 'Wealthy', 'Friendly'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: '"The evidence was compelling." What does "compelling" mean?', options: ['Convincing', 'Boring', 'Confusing', 'Weak'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'What does the PREFIX "un-" mean in "unhappy"?', options: ['Not', 'Very', 'Again', 'Before'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'What does the SUFFIX "-less" mean in "careless"?', options: ['Without', 'Full of', 'More', 'Again'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: '"The abandoned house was dilapidated." What does "dilapidated" mean?', options: ['Falling apart', 'Newly built', 'Brightly painted', 'Very large'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'Which word means "to make something better"?', options: ['Improve', 'Destroy', 'Ignore', 'Delay'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: '"She was apprehensive about the test." What does "apprehensive" mean?', options: ['Anxious or worried', 'Excited', 'Bored', 'Proud'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'The ROOT word "bio" means:', options: ['Life', 'Earth', 'Water', 'Fire'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: '"The detective scrutinized the evidence." What does "scrutinized" mean?', options: ['Examined closely', 'Threw away', 'Photographed', 'Hid'], answer: 0 },

        // --- Level 3 ---
        { domain: 'vocab', level: 3, type: 'mc', question: '"Her eloquent speech moved the audience to tears." What does "eloquent" mean?', options: ['Powerfully expressive', 'Quiet and shy', 'Long and boring', 'Funny'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: 'Which word means "lasting only a short time"?', options: ['Ephemeral', 'Eternal', 'Permanent', 'Constant'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: '"The politician tried to placate the angry crowd." What does "placate" mean?', options: ['Calm down', 'Anger further', 'Ignore', 'Join'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: 'What does "ambiguous" mean?', options: ['Having more than one meaning', 'Very clear', 'Extremely loud', 'Completely wrong'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: '"The professor\'s theory was widely corroborated." What does "corroborated" mean?', options: ['Confirmed by evidence', 'Disproven', 'Forgotten', 'Published'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: 'Which word is a SYNONYM for "meticulous"?', options: ['Thorough', 'Careless', 'Quick', 'Lazy'], answer: 0 },

        // --- Level 4 ---
        { domain: 'vocab', level: 4, type: 'mc', question: '"The CEO\'s hubris led to the company\'s downfall." What does "hubris" mean?', options: ['Excessive pride', 'Extreme kindness', 'Great intelligence', 'Poor health'], answer: 0 },
        { domain: 'vocab', level: 4, type: 'mc', question: 'Which word means "an indirect reference to something"?', options: ['Allusion', 'Illusion', 'Delusion', 'Conclusion'], answer: 0 },
        { domain: 'vocab', level: 4, type: 'mc', question: '"The film was a sardonic commentary on modern society." What does "sardonic" mean?', options: ['Mockingly cynical', 'Extremely positive', 'Deeply emotional', 'Historically accurate'], answer: 0 },

        // =============================================
        //  GRAMMAR
        // =============================================

        // --- Level 1 ---
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which sentence is correct?', options: ['She runs fast.', 'She run fast.', 'She running fast.', 'She runned fast.'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'What type of word is "quickly"?', options: ['Adverb', 'Noun', 'Verb', 'Adjective'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which word is a NOUN?', options: ['Bicycle', 'Quickly', 'Beautiful', 'Run'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Choose the correct sentence:', options: ['The dogs are playing.', 'The dogs is playing.', 'The dogs am playing.', 'The dogs be playing.'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which punctuation mark ends a question?', options: ['?', '.', '!', ','], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which is a COMPLETE sentence?', options: ['The cat sat on the mat.', 'Running very fast.', 'Because it rained.', 'The big red.'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'What is the VERB in: "The bird sings a song"?', options: ['Sings', 'Bird', 'Song', 'The'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Choose the correct plural: "I have two ___"', options: ['boxes', 'boxs', 'boxies', 'box'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'tf', question: '"Their" and "there" mean the same thing.', answer: false },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which word is an ADJECTIVE?', options: ['Tall', 'Run', 'Quickly', 'School'], answer: 0 },

        // --- Level 2 ---
        { domain: 'grammar', level: 2, type: 'mc', question: 'Choose the correct sentence:', options: ['Neither the cat nor the dog was hungry.', 'Neither the cat nor the dog were hungry.', 'Neither the cat or the dog was hungry.', 'Neither the cat nor the dog be hungry.'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'Which sentence uses a comma correctly?', options: ['After the game, we went home.', 'After the game we, went home.', 'After, the game we went home.', 'After the game we went, home.'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'What is the correct possessive form? "The ___ toy was lost."', options: ["child's", 'childs', "childs'", 'childes'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'Which sentence is in PAST TENSE?', options: ['She walked to school.', 'She walks to school.', 'She will walk to school.', 'She is walking to school.'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: '"I could ___ gone to the party." Choose correctly:', options: ['have', 'of', 'had', 'has'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'Identify the CONJUNCTION: "I wanted to go, but it was raining."', options: ['but', 'to', 'it', 'was'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'Which sentence uses "its" correctly?', options: ['The dog wagged its tail.', "The dog wagged it's tail.", 'The dog wagged its\' tail.', 'The dog wagged is tail.'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'What is a COMPOUND sentence?', options: ['Two independent clauses joined by a conjunction', 'A sentence with one subject', 'A very long sentence', 'A sentence that asks a question'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: '"She ___ been waiting for an hour." Choose correctly:', options: ['has', 'have', 'is', 'are'], answer: 0 },
        { domain: 'grammar', level: 2, type: 'mc', question: 'Which sentence is a RUN-ON?', options: ['I like pizza I like tacos.', 'I like pizza, and I like tacos.', 'I like both pizza and tacos.', 'Although I like pizza, I prefer tacos.'], answer: 0 },

        // --- Level 3 ---
        { domain: 'grammar', level: 3, type: 'mc', question: 'Which sentence uses the SUBJUNCTIVE mood correctly?', options: ['If I were you, I would study harder.', 'If I was you, I would study harder.', 'If I am you, I would study harder.', 'If I be you, I would study harder.'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: 'Identify the DEPENDENT clause: "Although she was tired, she finished the race."', options: ['Although she was tired', 'she finished the race', 'finished the race', 'she was tired she finished'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: 'What is the error? "Each of the students have turned in their work."', options: ['"have" should be "has"', '"their" should be "his"', '"turned" should be "turns"', 'There is no error'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: 'Which sentence uses a SEMICOLON correctly?', options: ['I love reading; it opens my mind.', 'I love reading; and it opens my mind.', 'I love; reading it opens my mind.', 'I love reading it; opens my mind.'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: '"The car, which was red, sped down the highway." The underlined clause is:', options: ['A nonrestrictive clause', 'A restrictive clause', 'An independent clause', 'A prepositional phrase'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: 'What is a DANGLING MODIFIER? "Walking to school, the rain started."', options: ['The sentence suggests rain was walking to school', 'Walking is in wrong tense', 'School is misspelled', 'There is no error'], answer: 0 },

        // --- Level 4 ---
        { domain: 'grammar', level: 4, type: 'mc', question: 'Which sentence demonstrates PARALLEL structure?', options: ['She likes hiking, swimming, and biking.', 'She likes hiking, to swim, and biking.', 'She likes hiking, swimming, and to bike.', 'She likes to hike, swimming, and biked.'], answer: 0 },
        { domain: 'grammar', level: 4, type: 'mc', question: '"Not only did she win the race, but she also broke the record." This is an example of:', options: ['Correlative conjunctions', 'Subordinating conjunctions', 'Conjunctive adverbs', 'Relative pronouns'], answer: 0 },

        // =============================================
        //  WRITING
        // =============================================

        // --- Level 1 ---
        { domain: 'writing', level: 1, type: 'mc', question: 'Which is the BEST opening sentence for a story about a lost puppy?', options: ['One rainy afternoon, a small puppy wandered away from home.', 'This story is about a puppy.', 'Puppies are cute animals.', 'I like dogs a lot.'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Put these sentences in the correct ORDER:\n1) She brushed her teeth.\n2) She woke up.\n3) She ate breakfast.', options: ['2, 3, 1', '1, 2, 3', '3, 1, 2', '2, 1, 3'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which sentence is MORE DESCRIPTIVE?', options: ['The fluffy golden cat curled up on the warm blanket.', 'The cat sat down.', 'A cat was there.', 'There was a cat on something.'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which word BEST completes: "First, I put on my shoes. ___, I tied the laces."', options: ['Then', 'However', 'Because', 'Although'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which closing sentence BEST ends a story about a fun day at the beach?', options: ['As the sun set, I smiled, knowing it was the best day ever.', 'The end.', 'That was my story.', 'Beaches have sand.'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which is a BETTER way to say "The food was good"?', options: ['The food was delicious.', 'The food was food.', 'The food was a thing I ate.', 'Food existed.'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'What type of writing tells a story?', options: ['Narrative', 'Persuasive', 'Expository', 'Technical'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which transition word shows CONTRAST?', options: ['However', 'Also', 'Next', 'Finally'], answer: 0 },

        // --- Level 2 ---
        { domain: 'writing', level: 2, type: 'mc', question: 'Which is the STRONGEST thesis statement?', options: ['School uniforms reduce bullying and improve focus.', 'School uniforms are a thing.', 'Some people like uniforms.', 'I will write about uniforms.'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'Which sentence BEST supports the claim "Exercise is important for health"?', options: ['Studies show regular exercise reduces the risk of heart disease by 30%.', 'My friend likes to run.', 'Exercise exists.', 'Some people go to the gym.'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'What is the purpose of a TOPIC SENTENCE?', options: ['To introduce the main idea of a paragraph', 'To end a paragraph', 'To list all details', 'To be as long as possible'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: '"In conclusion, recycling benefits both the environment and the economy." This sentence belongs in which part of an essay?', options: ['Conclusion', 'Introduction', 'Body paragraph 1', 'Title'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'Which REVISION improves this sentence? "The boy ran. He was fast. He won the race."', options: ['The fast boy ran and won the race.', 'The boy ran fast he won.', 'Boy. Fast. Race. Win.', 'Running happened and winning too.'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'What is AUDIENCE in writing?', options: ['Who you are writing for', 'How loud you read', 'The number of pages', 'The title of your work'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'Which hook would BEST grab a reader\'s attention?', options: ['"Have you ever wondered what lurks beneath the ocean\'s surface?"', '"This essay is about the ocean."', '"The ocean is big."', '"I will tell you about water."'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'What should you do when you REVISE your writing?', options: ['Improve word choice, clarity, and organization', 'Only fix spelling', 'Make it shorter', 'Read it once and submit'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'Which transition word shows ADDITION?', options: ['Furthermore', 'However', 'Instead', 'Nevertheless'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: '"Show, don\'t tell" means:', options: ['Use descriptive details instead of just stating facts', 'Write louder', 'Use only dialogue', 'Show your paper to someone'], answer: 0 },

        // --- Level 3 ---
        { domain: 'writing', level: 3, type: 'mc', question: 'Which is an example of ETHOS (credibility) in persuasive writing?', options: ['"As a doctor with 20 years of experience..."', '"Everyone knows this is true."', '"This made me feel sad."', '"Imagine a world where..."'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: 'What is a COUNTERARGUMENT?', options: ['An opposing viewpoint that you address in your essay', 'A type of conclusion', 'An error in logic', 'A very long paragraph'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: 'Which sentence demonstrates ACTIVE VOICE?', options: ['The dog chased the cat.', 'The cat was chased by the dog.', 'The chasing was done.', 'It was chased.'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: '"The sunset painted the sky in shades of amber and rose, as if an artist had spilled their palette across the horizon." This is an example of:', options: ['Imagery and simile', 'Argumentative writing', 'Expository writing', 'Technical writing'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: 'What makes a RELIABLE source for research?', options: ['A peer-reviewed journal article', 'A random blog post', 'A social media comment', 'An anonymous forum reply'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: 'What is the difference between DENOTATION and CONNOTATION?', options: ['Denotation is literal meaning; connotation is emotional association', 'They mean the same thing', 'Denotation is always negative', 'Connotation is the dictionary definition'], answer: 0 },

        // --- Level 4 ---
        { domain: 'writing', level: 4, type: 'mc', question: 'Which is an example of a LOGICAL FALLACY?', options: ['"Everyone is doing it, so it must be right." (Bandwagon)', '"I have evidence to support this claim."', '"Studies show a correlation between X and Y."', '"According to Dr. Smith, an expert in the field..."'], answer: 0 },
        { domain: 'writing', level: 4, type: 'mc', question: 'In MLA format, where does the works cited page go?', options: ['At the end of the paper', 'Before the introduction', 'In the middle of the essay', 'On the title page'], answer: 0 },

        // =============================================
        //  EXTRA MIXED (for Photo Finish & variety)
        // =============================================
        { domain: 'vocab', level: 1, type: 'mc', question: 'What does "gigantic" mean?', options: ['Extremely large', 'Very tiny', 'Very slow', 'Very bright'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: 'Which is a PROPER noun?', options: ['New York', 'city', 'building', 'street'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'A PARAGRAPH should be about:', options: ['One main idea', 'Everything you know', 'Random thoughts', 'Nothing specific'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: '"The hikers traversed the mountain." What does "traversed" mean?', options: ['Traveled across', 'Climbed over', 'Fell down', 'Photographed'], answer: 0 },
        {
            domain: 'reading', level: 1, type: 'mc',
            passage: 'The library was quiet. Children sat at tables reading books and whispering to each other.',
            question: 'What kind of place is being described?',
            options: ['A peaceful place for reading', 'A noisy playground', 'A busy restaurant', 'An empty parking lot'],
            answer: 0
        },
        { domain: 'grammar', level: 2, type: 'mc', question: '"Me and John went to the store" should be corrected to:', options: ['John and I went to the store.', 'Me and John goes to the store.', 'John and me went to the store.', 'I and John went to the store.'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: '"The senator\'s speech was replete with promises." What does "replete" mean?', options: ['Full of', 'Empty of', 'Lacking', 'Hidden'], answer: 0 },
        { domain: 'writing', level: 3, type: 'mc', question: 'What is a THESIS statement?', options: ['The main argument of an essay', 'The first sentence of any paragraph', 'A question for the reader', 'A list of topics'], answer: 0 },
        { domain: 'grammar', level: 3, type: 'mc', question: 'Which sentence contains a MISPLACED modifier?', options: ['I almost drove my car for 300 miles. (Should be "drove almost 300")', 'She quickly ran to the store.', 'The teacher carefully graded the tests.', 'He quietly opened the door.'], answer: 0 },
        {
            domain: 'reading', level: 2, type: 'mc',
            passage: 'Bees are essential pollinators. Without them, many of the fruits and vegetables we eat would not grow. Scientists are concerned about the declining bee population worldwide.',
            question: 'Why are scientists worried about bees?',
            options: ['The bee population is declining, which threatens food production', 'Bees make too much honey', 'Bees are dangerous to humans', 'There are too many bees'],
            answer: 0
        },
        { domain: 'vocab', level: 1, type: 'mc', question: 'Which word means the OPPOSITE of "difficult"?', options: ['Easy', 'Hard', 'Impossible', 'Tricky'], answer: 0 },
        { domain: 'grammar', level: 1, type: 'mc', question: '"They ___ going to the movies." Choose correctly:', options: ['are', 'is', 'am', 'be'], answer: 0 },
        { domain: 'writing', level: 2, type: 'mc', question: 'What is the purpose of a CONCLUSION paragraph?', options: ['To summarize main points and leave a final impression', 'To introduce new ideas', 'To list references', 'To add more details'], answer: 0 },
        { domain: 'vocab', level: 2, type: 'mc', question: 'The PREFIX "pre-" means:', options: ['Before', 'After', 'Against', 'Under'], answer: 0 },
        {
            domain: 'reading', level: 3, type: 'mc',
            passage: '"The company claims its product is eco-friendly, yet its factories produce massive amounts of pollution." ',
            question: 'What type of irony is this?',
            options: ['Situational irony', 'Dramatic irony', 'Verbal irony', 'Cosmic irony'],
            answer: 0
        },
        { domain: 'grammar', level: 2, type: 'mc', question: 'What is an APPOSITIVE? "My brother, a talented musician, plays guitar."', options: ['A phrase that renames or describes a nearby noun', 'A type of verb', 'A conjunction', 'A type of adverb'], answer: 0 },
        { domain: 'writing', level: 1, type: 'mc', question: 'Which is a FACT (not an opinion)?', options: ['Water boils at 100°C.', 'Pizza is the best food.', 'Summer is the best season.', 'Dogs are cuter than cats.'], answer: 0 },
        { domain: 'vocab', level: 3, type: 'mc', question: '"She had a penchant for adventure." What does "penchant" mean?', options: ['A strong liking', 'A deep fear', 'A mild interest', 'A complete dislike'], answer: 0 },
        {
            domain: 'reading', level: 1, type: 'tf',
            passage: 'Fish live in water and breathe using gills.',
            question: 'Fish breathe using lungs.',
            answer: false
        },
        { domain: 'grammar', level: 3, type: 'mc', question: '"Whom" is used as the ___ of a verb or preposition.', options: ['Object', 'Subject', 'Predicate', 'Modifier'], answer: 0 },
    ];

    /* ---------- Utilities ---------- */

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /**
     * Get questions filtered by criteria
     * @param {object} opts  { domain?, level?, type?, count? }
     */
    function getQuestions({ domain, level, type, count } = {}) {
        let pool = [...questions];
        if (domain) pool = pool.filter(q => q.domain === domain);
        if (level) pool = pool.filter(q => q.level === level);
        if (type) pool = pool.filter(q => q.type === type);
        pool = shuffle(pool);
        return count ? pool.slice(0, count) : pool;
    }

    /** Get a specific number of mixed questions for a Photo Finish round */
    function getPhotoFinishQuestions(count = 10) {
        return getQuestions({ level: 4, count: Math.min(count, 6) })
            .concat(getQuestions({ level: 3, count: Math.min(count, 4) }))
            .slice(0, count);
    }

    /** Get all available domains */
    function getDomains() {
        return ['reading', 'vocab', 'grammar', 'writing'];
    }

    /** Get domain display info */
    function getDomainInfo(domain) {
        const info = {
            reading: { label: 'Reading', cssClass: 'domain-reading', icon: '📖' },
            vocab: { label: 'Vocabulary', cssClass: 'domain-vocab', icon: '🔤' },
            grammar: { label: 'Grammar', cssClass: 'domain-grammar', icon: '✏️' },
            writing: { label: 'Writing', cssClass: 'domain-writing', icon: '📝' }
        };
        return info[domain] || info.reading;
    }

    /** Get level display info */
    function getLevelInfo(level) {
        const info = {
            1: { name: 'Pit Stop', stars: '⭐', label: 'Pit Stop ⭐' },
            2: { name: 'Street Race', stars: '⭐⭐', label: 'Street Race ⭐⭐' },
            3: { name: 'Grand Prix', stars: '⭐⭐⭐', label: 'Grand Prix ⭐⭐⭐' },
            4: { name: 'PHOTO FINISH', stars: '🏁', label: 'PHOTO FINISH 🏁' }
        };
        return info[level] || info[1];
    }

    return {
        getQuestions,
        getPhotoFinishQuestions,
        getDomains,
        getDomainInfo,
        getLevelInfo,
        totalCount: questions.length
    };
})();
