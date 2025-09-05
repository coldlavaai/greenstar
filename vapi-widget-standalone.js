/**
 * Standalone VAPI Chat Widget
 * Works on any website/hosting environment
 * No external dependencies except VAPI SDK
 */

(function() {
  'use strict';

  // Configuration - Update these values as needed
  const WIDGET_CONFIG = {
    // VAPI Configuration
    publicApiKey: 'b3f38fb7-8541-4e3e-8708-5d49c3f54f00', // Safe to expose - public key
    assistantId: 'cb76e1bc-dc2d-4ea8-84a1-c17499ed6387',
    
    // Proxy Settings (for secure text chat)
    proxyEndpoint: null, // Will be auto-detected or use direct API
    directApiKey: 'bb0b198b-1a8f-4675-bdf8-8a865fc5d68a', // Used when no proxy available
    
    // Widget Appearance
    position: 'bottom-right',
    primaryColor: '#007bff',
    buttonText: '💬 Chat with Sophie',
    
    // Features
    enableVoice: true,
    enableText: true,
    autoMinimize: true
  };

  // Widget state
  let widgetState = {
    isOpen: false,
    isVoiceActive: false,
    voiceInitialized: false,
    currentMode: 'text',
    previousChatId: null,
    vapiInstance: null,
    elements: {}
  };

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
  } else {
    initializeWidget();
  }

  function initializeWidget() {
    console.log('🚀 Initializing VAPI Widget...');
    
    // Load VAPI SDK if not already loaded
    loadVapiSDK().then(() => {
      createWidgetHTML();
      setupEventListeners();
      initializeVoiceFeatures();
      console.log('✅ VAPI Widget ready!');
    });
  }

  async function loadVapiSDK() {
    // Check if VAPI SDK is already loaded
    if (window.vapiSDK) {
      console.log('VAPI SDK already loaded');
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest';
      script.onload = () => {
        console.log('VAPI SDK loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load VAPI SDK');
        reject(new Error('VAPI SDK load failed'));
      };
      document.head.appendChild(script);
    });
  }

  function createWidgetHTML() {
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'vapi-widget-container';
    widgetContainer.innerHTML = `
      <style>
        #vapi-widget-container {
          position: fixed;
          ${WIDGET_CONFIG.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
          ${WIDGET_CONFIG.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
          z-index: 9999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        #vapi-chat-button {
          background: ${WIDGET_CONFIG.primaryColor};
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        #vapi-chat-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        #vapi-chat-panel {
          display: none;
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }
        
        #vapi-chat-header {
          background: ${WIDGET_CONFIG.primaryColor};
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        #vapi-mode-toggle {
          display: flex;
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          overflow: hidden;
        }
        
        .vapi-mode-btn {
          padding: 6px 12px;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }
        
        .vapi-mode-btn.active {
          background: rgba(255,255,255,0.3);
        }
        
        #vapi-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }
        
        #vapi-chat-content {
          height: calc(100% - 60px);
          display: flex;
          flex-direction: column;
        }
        
        #vapi-text-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        #vapi-voice-chat {
          display: none;
          flex: 1;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        
        #vapi-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        
        .vapi-message {
          margin-bottom: 12px;
          padding: 10px 14px;
          border-radius: 18px;
          max-width: 80%;
          word-wrap: break-word;
        }
        
        .vapi-message-user {
          background: ${WIDGET_CONFIG.primaryColor};
          color: white;
          align-self: flex-end;
          margin-left: auto;
        }
        
        .vapi-message-assistant {
          background: #f0f0f0;
          color: #333;
        }
        
        #vapi-input-area {
          padding: 16px 20px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          gap: 10px;
        }
        
        #vapi-message-input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 10px 16px;
          outline: none;
          font-size: 14px;
        }
        
        #vapi-send-btn {
          background: ${WIDGET_CONFIG.primaryColor};
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        #vapi-voice-button {
          background: #28a745;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 16px 32px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        #vapi-voice-button.connecting { background: #ffc107; }
        #vapi-voice-button.active { background: #dc3545; }
        
        @media (max-width: 480px) {
          #vapi-chat-panel {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
            right: 20px;
          }
        }
      </style>
      
      <button id="vapi-chat-button">${WIDGET_CONFIG.buttonText}</button>
      
      <div id="vapi-chat-panel">
        <div id="vapi-chat-header">
          <div id="vapi-mode-toggle">
            <button class="vapi-mode-btn ${widgetState.currentMode === 'text' ? 'active' : ''}" data-mode="text">💬 Text</button>
            <button class="vapi-mode-btn ${widgetState.currentMode === 'voice' ? 'active' : ''}" data-mode="voice">🎤 Voice</button>
          </div>
          <button id="vapi-close-btn">×</button>
        </div>
        
        <div id="vapi-chat-content">
          <div id="vapi-text-chat">
            <div id="vapi-messages"></div>
            <div id="vapi-input-area">
              <input type="text" id="vapi-message-input" placeholder="Type your message..." />
              <button id="vapi-send-btn">→</button>
            </div>
          </div>
          
          <div id="vapi-voice-chat">
            <button id="vapi-voice-button">🎤 Start Call</button>
            <p style="text-align: center; margin-top: 16px; color: #666; font-size: 14px;">
              Click to start voice conversation
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widgetContainer);

    // Store element references
    widgetState.elements = {
      button: document.getElementById('vapi-chat-button'),
      panel: document.getElementById('vapi-chat-panel'),
      closeBtn: document.getElementById('vapi-close-btn'),
      textChat: document.getElementById('vapi-text-chat'),
      voiceChat: document.getElementById('vapi-voice-chat'),
      messages: document.getElementById('vapi-messages'),
      input: document.getElementById('vapi-message-input'),
      sendBtn: document.getElementById('vapi-send-btn'),
      voiceBtn: document.getElementById('vapi-voice-button'),
      modeToggle: document.getElementById('vapi-mode-toggle')
    };
  }

  function setupEventListeners() {
    // Main button click
    widgetState.elements.button.addEventListener('click', toggleWidget);
    
    // Close button
    widgetState.elements.closeBtn.addEventListener('click', closeWidget);
    
    // Mode toggle
    widgetState.elements.modeToggle.addEventListener('click', handleModeToggle);
    
    // Text chat
    widgetState.elements.sendBtn.addEventListener('click', sendTextMessage);
    widgetState.elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendTextMessage();
    });
    
    // Voice chat
    widgetState.elements.voiceBtn.addEventListener('click', toggleVoiceCall);
    
    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!document.getElementById('vapi-widget-container').contains(e.target)) {
        closeWidget();
      }
    });
  }

  async function initializeVoiceFeatures() {
    if (!WIDGET_CONFIG.enableVoice || !window.vapiSDK) return;
    
    try {
      console.log('🎤 Initializing voice features...');
      
      widgetState.vapiInstance = window.vapiSDK.run({
        apiKey: WIDGET_CONFIG.publicApiKey,
        assistant: WIDGET_CONFIG.assistantId
      });

      // Voice event listeners
      widgetState.vapiInstance.on('call-start', () => {
        widgetState.isVoiceActive = true;
        widgetState.elements.voiceBtn.textContent = '🔴 End Call';
        widgetState.elements.voiceBtn.className = 'active';
      });

      widgetState.vapiInstance.on('call-end', () => {
        widgetState.isVoiceActive = false;
        widgetState.elements.voiceBtn.textContent = '🎤 Start Call';
        widgetState.elements.voiceBtn.className = '';
      });

      widgetState.vapiInstance.on('error', (error) => {
        console.error('VAPI Error:', error);
        widgetState.elements.voiceBtn.textContent = '❌ Error';
        widgetState.elements.voiceBtn.className = '';
      });

      widgetState.voiceInitialized = true;
      console.log('✅ Voice features ready');
      
    } catch (error) {
      console.error('❌ Voice initialization failed:', error);
    }
  }

  function toggleWidget() {
    if (widgetState.isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  function openWidget() {
    widgetState.isOpen = true;
    widgetState.elements.panel.style.display = 'block';
    widgetState.elements.button.style.display = 'none';
    
    // Focus input if in text mode
    if (widgetState.currentMode === 'text') {
      setTimeout(() => widgetState.elements.input.focus(), 100);
    }
  }

  function closeWidget() {
    widgetState.isOpen = false;
    widgetState.elements.panel.style.display = 'none';
    widgetState.elements.button.style.display = 'block';
    
    // End voice call if active
    if (widgetState.isVoiceActive) {
      endVoiceCall();
    }
  }

  function handleModeToggle(e) {
    if (!e.target.classList.contains('vapi-mode-btn')) return;
    
    const mode = e.target.dataset.mode;
    if (mode === widgetState.currentMode) return;
    
    // Update active button
    document.querySelectorAll('.vapi-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Switch mode
    widgetState.currentMode = mode;
    
    if (mode === 'text') {
      widgetState.elements.textChat.style.display = 'flex';
      widgetState.elements.voiceChat.style.display = 'none';
      widgetState.elements.input.focus();
    } else {
      widgetState.elements.textChat.style.display = 'none';
      widgetState.elements.voiceChat.style.display = 'flex';
    }
  }

  async function sendTextMessage() {
    const message = widgetState.elements.input.value.trim();
    if (!message) return;

    // Disable input
    widgetState.elements.sendBtn.disabled = true;
    widgetState.elements.sendBtn.textContent = '⏳';

    // Add user message
    addMessage('user', message);
    widgetState.elements.input.value = '';

    // Add typing indicator
    const typingIndicator = addTypingIndicator();

    try {
      // Try different API approaches
      let response = await attemptTextChat(message);
      
      if (response && response.ok) {
        const data = await response.json();
        const assistantMessage = extractAssistantMessage(data);
        addMessage('assistant', assistantMessage);
        
        // Update chat ID for context
        if (data.id) {
          widgetState.previousChatId = data.id;
        }
      } else {
        addMessage('system', 'Sorry, I encountered an error. Please try again.');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('system', 'Connection error. Please try again.');
    } finally {
      // Re-enable input
      typingIndicator.remove();
      widgetState.elements.sendBtn.disabled = false;
      widgetState.elements.sendBtn.textContent = '→';
      widgetState.elements.input.focus();
    }
  }

  async function attemptTextChat(message) {
    // Strategy 1: Try proxy endpoint (if configured)
    if (WIDGET_CONFIG.proxyEndpoint) {
      try {
        return await fetch(`${WIDGET_CONFIG.proxyEndpoint}/api/vapi/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: message,
            previousChatId: widgetState.previousChatId
          })
        });
      } catch (error) {
        console.log('Proxy failed, trying direct API');
      }
    }

    // Strategy 2: Direct VAPI API (fallback)
    return await fetch('https://api.vapi.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WIDGET_CONFIG.directApiKey}`
      },
      body: JSON.stringify({
        assistantId: WIDGET_CONFIG.assistantId,
        input: message,
        previousChatId: widgetState.previousChatId
      })
    });
  }

  function toggleVoiceCall() {
    if (!widgetState.voiceInitialized || !widgetState.vapiInstance) {
      console.error('Voice not initialized');
      return;
    }

    if (widgetState.isVoiceActive) {
      endVoiceCall();
    } else {
      startVoiceCall();
    }
  }

  function startVoiceCall() {
    try {
      widgetState.elements.voiceBtn.textContent = '⏳ Connecting...';
      widgetState.elements.voiceBtn.className = 'connecting';
      widgetState.vapiInstance.start(WIDGET_CONFIG.assistantId);
    } catch (error) {
      console.error('Failed to start voice call:', error);
      widgetState.elements.voiceBtn.textContent = '❌ Error';
      widgetState.elements.voiceBtn.className = '';
    }
  }

  function endVoiceCall() {
    try {
      if (widgetState.vapiInstance) {
        widgetState.vapiInstance.stop();
      }
      widgetState.isVoiceActive = false;
      widgetState.elements.voiceBtn.textContent = '🎤 Start Call';
      widgetState.elements.voiceBtn.className = '';
    } catch (error) {
      console.error('Error ending voice call:', error);
    }
  }

  function addMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `vapi-message vapi-message-${role}`;
    messageDiv.textContent = text;
    widgetState.elements.messages.appendChild(messageDiv);
    
    // Scroll to bottom
    widgetState.elements.messages.scrollTop = widgetState.elements.messages.scrollHeight;
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'vapi-message vapi-message-assistant';
    typingDiv.innerHTML = `
      <div style="display: flex; gap: 4px; align-items: center;">
        <span style="animation: pulse 1.4s infinite;">●</span>
        <span style="animation: pulse 1.4s infinite 0.2s;">●</span>
        <span style="animation: pulse 1.4s infinite 0.4s;">●</span>
        <style>
          @keyframes pulse {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
          }
        </style>
      </div>
    `;
    widgetState.elements.messages.appendChild(typingDiv);
    widgetState.elements.messages.scrollTop = widgetState.elements.messages.scrollHeight;
    return typingDiv;
  }

  function extractAssistantMessage(data) {
    // Try different response formats
    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      const lastOutput = data.output[data.output.length - 1];
      if (lastOutput.content) return lastOutput.content;
      if (lastOutput.text) return lastOutput.text;
      if (lastOutput.message) return lastOutput.message;
    }

    if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
      const lastMessage = data.messages[data.messages.length - 1];
      if (lastMessage.content) return lastMessage.content;
      if (lastMessage.text) return lastMessage.text;
      if (lastMessage.message) return lastMessage.message;
    }

    return data.response || data.reply || data.text || data.content || 
           'I received your message but had trouble with the response format. Please try again.';
  }

  // Auto-minimize after inactivity (optional)
  if (WIDGET_CONFIG.autoMinimize) {
    let inactivityTimer;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (widgetState.isOpen && !widgetState.isVoiceActive) {
          closeWidget();
        }
      }, 300000); // 5 minutes
    };
    
    document.addEventListener('click', resetTimer);
    document.addEventListener('keypress', resetTimer);
  }

})();