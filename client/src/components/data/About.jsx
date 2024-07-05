import React, { useState, useRef, useEffect } from 'react';
import styles from './About.module.css'; // Import CSS module

const AiForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading spinner
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const response = await fetch('http://localhost:3000/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setHistory([...history, { prompt, response: data.response }]);
      setResponse(data.response);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard!');
  };

  // Function to format AI response
  const formatResponse = (response) => {
    response = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    response = response.replace(/```(.*?)```/gs, '<code>$1</code>');
    const paragraphs = response.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('<code>') && paragraph.endsWith('</code>')) {
        return (
          <pre key={index} className={styles.codeBlock}>
            {paragraph}
          </pre>
        );
      } else {
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        );
      }
    });

    return paragraphs;
  };

  const handleKeyPress = (e) => {
    // Submit on Enter key press
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow} ref={chatRef}>
        <div className={styles.chat}>
          {history.map((entry, index) => (
            <div key={index} className={styles.conversationContainer}>
              <div className={styles.userPrompt}>
                <p>{entry.prompt}</p>
              </div>
              <div className={styles.responseContainer}>
                <div className={styles.responseContent}>
                  {formatResponse(entry.response)}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className={styles.spinnerContainer}>
              <div className={styles.spinner}>
                <div className={styles.Spinner}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            required
            className={styles.inputBox}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiForm;
