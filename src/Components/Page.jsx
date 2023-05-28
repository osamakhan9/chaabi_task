import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import './index.css';

const se = [
  'Scolding is something common in student life.',
  'But one day I was severely scolded by my English teacher.',
  'Days are not of equal value in one’s life.',
  'When she saw that I had realized my mistake.',
  'Find joy in the little things every day.',
  'Studying is the main source of knowledge.',
  'They also inspire us to face the hardships of life courageously.',
  'The quick brown fox jumps over the lazy dog.',
  'Sphinx of black quartz, judge my vow.',
  'A teacher is called builder of the nation.',
  'How vexingly quick daft zebras jump!',
];

const Page = () => {


  const [currentSentence, setCurrentSentence] = useState('');

  const [typedText, setTypedText] = useState('');


  const [nextCharacters, setNextCharacters] = useState('');


  //  time start state 
  const [startTime, setStartTime] = useState(300);

  // const [endTime, setEndTime] = useState(0);

  //  wpm state set
  // const [wpm, setWPM] = useState(0);

  const [accuracy, setAccuracy] = useState(100);

  const [keyPresses, setKeyPresses] = useState(0);

  const handleText = (e) => {
    const { value } = e.target.value;
    setTypedText(value);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleSentenceChange = () => {
    const randomIndex = Math.floor(Math.random() * se.length);
    const sentence = se[randomIndex];
    setCurrentSentence(sentence);
    setTypedText('');
    setNextCharacters(sentence);
    setStartTime(300);
    // setEndTime(0);
    // setWPM(0);
    setAccuracy(0);
    setKeyPresses(0);
  };

  const handleKeyPress = () => {
    setKeyPresses((prevKeyPresses) => prevKeyPresses + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setEndTime(Date.now());

    const wordsCount = currentSentence.trim().split(' ').length;
    const typedWordsCount = typedText.trim().split(' ').length;

    // const minutes = (endTime - startTime) / 60000;
    // const grossWPM = typedWordsCount / minutes;
    // const netWPM = grossWPM - typedWordsCount / 10;
    // const calculatedWPM = netWPM > 0 ? Math.floor(netWPM) : 0;

    const calculatedAccuracy = (typedWordsCount / wordsCount) * 100 || 0;

    // setWPM(calculatedWPM);
    setAccuracy(calculatedAccuracy.toFixed(2));
  };

  useEffect(() => {
    handleSentenceChange();
  }, []);

  useEffect(() => {
    const charactersToType = currentSentence.slice(
      typedText.length,
      typedText.length + 10
    );
    setNextCharacters(charactersToType);
  }, [currentSentence, typedText]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTime((prevTimer)=> prevTimer-1)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (

    //  div

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="tcontainer"
  
    >
        <motion.p
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          className='time'
          // transition={{ delay: 0.2, duration: 0.5 }}
        >
         Time:- {startTime}
        </motion.p>

    <div className='content'>
      <h1 className='heading'>Touch Typing Game</h1>
      <div className='displayshow'>

        {/*  */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {currentSentence}
        </motion.p>
      </div>
      <p className='nextdisplay'>{nextCharacters}</p>

      <form onInput={handleSubmit}>


        {/* text area i means display typing  */}
        <motion.textarea
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          value={typedText}
          onChange={handleText}
          onKeyPress={handleKeyPress}
          placeholder="Start typing here"
          rows={5}
          cols={60}
          className='typing_canava'
        />
        
        {/* <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Submit
        </motion.button> */}
      </form>
    
        <div className='features'>
          {/* <div className='ind'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              >
                WPM: {wpm}
              </motion.p>
          </div> */}
          <div className='ind'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Accuracy: {accuracy}%
            </motion.p>
          </div>
          <div className='ind'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Key Presses: {keyPresses}
            </motion.p>
          </div>
        </div>
      
      <motion.button
        onClick={handleSentenceChange}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Change Sentence
      </motion.button>
      </div>
    </motion.div>
  );
};

export default Page;
