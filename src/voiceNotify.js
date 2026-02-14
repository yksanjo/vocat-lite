const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class VoiceNotify {
  constructor() {
    this.theme = 'jarvis';
    this.rate = 1.0;
  }

  getVoice(theme) {
    const voices = {
      jarvis: 'Daniel',
      peon: 'Zarvox',
      default: 'Samantha'
    };
    return voices[theme] || voices.default;
  }

  async speak(text) {
    const voice = this.getVoice(this.theme);
    const wpm = Math.round(100 + (this.rate - 0.1) * (400 / 1.9));
    
    try {
      await execPromise(`say -v "${voice}" -r ${wpm} "${text}"`);
      return true;
    } catch (e) {
      console.error('TTS Error:', e.message);
      return false;
    }
  }

  async playSound(type) {
    const sounds = {
      success: '/System/Library/Sounds/Glass.aiff',
      error: '/System/Library/Sounds/Basso.aiff',
      notification: '/System/Library/Sounds/Pop.aiff'
    };
    
    try {
      await execPromise(`afplay "${sounds[type]}"`);
    } catch (e) {}
  }
}

module.exports = { VoiceNotify };
