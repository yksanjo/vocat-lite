#!/usr/bin/env node

const { CommandExecutor } = require('./commandExecutor');
const { GitManager } = require('./gitManager');
const { VoiceNotify } = require('./voiceNotify');
const fs = require('fs');
const path = require('path');

class VoCATLite {
  constructor() {
    this.executor = new CommandExecutor();
    this.git = new GitManager();
    this.voice = new VoiceNotify();
    this.config = this.loadConfig();
  }

  loadConfig() {
    const configPath = path.join(process.env.HOME, '.vocat', 'config.json');
    try {
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      }
    } catch (e) {}
    return {
      voice: { theme: 'jarvis', rate: 1.0 },
      workingDirectory: process.cwd()
    };
  }

  async run(args) {
    const command = args.join(' ');
    
    if (!command) {
      this.showHelp();
      return;
    }

    console.log(`🎙️ VoCAT-Lite: Executing "${command}"`);
    
    // Speak the command
    await this.voice.speak(`Executing ${command}`);

    // Parse and execute
    const result = await this.executor.execute(command);
    
    if (result.success) {
      console.log('✅ Success:', result.output);
      await this.voice.speak('Command completed successfully');
    } else {
      console.error('❌ Error:', result.error);
      await this.voice.speak('Command failed');
    }
  }

  showHelp() {
    console.log(`
🎙️ VoCAT-Lite - Voice Activated Terminal (CLI)

Usage: vocat-lite <command>

Examples:
  vocat-lite run tests
  vocat-lite commit "my changes"
  vocat-lite push
  vocat-lite pull
  vocat-lite build
  vocat-lite dev

Voice Commands:
  say "hey vocat" (if using voice input)

Configuration: ~/.vocat/config.json
    `);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const vocat = new VoCATLite();
  vocat.run(args).catch(console.error);
}

module.exports = { VoCATLite };
