import React, { createContext, useContext, useState } from 'react';

const CampaignContext = createContext();

const INITIAL_STATE = {
  profiling: { age: '', platform: '', duration: '' },
  preTest: { q4: null, q5: null, q6: null, q7: null, q8: null },
  postTest: { q1: null, q2: null, q3: null, q4: null, q5: null },
  sandboxInteractions: { toxicTriggerCount: 0, replyText: '', sandboxOutcome: null },
  feedback: ''
};

export function CampaignProvider({ children }) {
  const [userData, setUserData] = useState(INITIAL_STATE);


  const updateProfiling = (key, value) => {
    setUserData(prev => ({
      ...prev,
      profiling: { ...prev.profiling, [key]: value }
    }));
  };

  const updatePreTest = (key, value) => {
    setUserData(prev => ({
      ...prev,
      preTest: { ...prev.preTest, [key]: value }
    }));
  };

  const updatePostTest = (key, value) => {
    setUserData(prev => ({
      ...prev,
      postTest: { ...prev.postTest, [key]: value }
    }));
  };

  const updateSandbox = (data) => {
    setUserData(prev => ({
      ...prev,
      sandboxInteractions: { ...prev.sandboxInteractions, ...data }
    }));
  };

  const updateFeedback = (text) => {
    setUserData(prev => ({ ...prev, feedback: text }));
  };

  const resetUserData = () => setUserData(INITIAL_STATE);

  return (
    <CampaignContext.Provider value={{ userData, updateProfiling, updatePreTest, updatePostTest, updateSandbox, updateFeedback, resetUserData }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
