# VoCAT-Lite

A lightweight command-line interface for voice-activated terminal commands. No GUI, just pure terminal power.

## Features

- Voice-activated commands via terminal
- Git integration (commit, push, pull, status)
- NPM script execution
- Natural language command parsing
- Multiple voice themes (Jarvis, Peon)
- TTS notifications for command results

## Installation

```bash
npm install -g vocat-lite
```

## Usage

```bash
# Run a voice command
vocat-lite run tests

# Commit changes
vocat-lite commit "my changes"

# Push to remote
vocat-lite push

# Pull latest
vocat-lite pull

# Run npm scripts
vocat-lite build
vocat-lite dev
```

## Voice Themes

- `jarvis` - Professional AI assistant voice
- `peon` - Playful robot voice

## Configuration

Config file at `~/.vocat/config.json`:

```json
{
  "voice": {
    "theme": "jarvis",
    "rate": 1.0
  },
  "workingDirectory": "/path/to/project"
}
```

## License

MIT
