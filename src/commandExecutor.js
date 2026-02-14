const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class CommandExecutor {
  constructor() {
    this.workingDir = process.cwd();
  }

  parseCommand(input) {
    const cmd = input.toLowerCase().trim();
    const patterns = {
      'run test': 'npm test',
      'run tests': 'npm test',
      'test': 'npm test',
      'run build': 'npm run build',
      'build': 'npm run build',
      'run dev': 'npm run dev',
      'dev': 'npm run dev',
      'start': 'npm start',
      'install': 'npm install',
      'commit': 'git add . && git commit -m "Voice commit"',
      'push': 'git push',
      'pull': 'git pull',
      'status': 'git status',
      'branch': 'git branch',
      'log': 'git log --oneline -10',
    };
    
    for (const [key, value] of Object.entries(patterns)) {
      if (cmd.includes(key)) return value;
    }
    return input;
  }

  async execute(command) {
    const finalCmd = this.parseCommand(command);
    
    return new Promise((resolve) => {
      const isNpm = finalCmd.startsWith('npm ') || finalCmd.startsWith('yarn ');
      
      if (isNpm) {
        const pkgJson = path.join(this.workingDir, 'package.json');
        if (!fs.existsSync(pkgJson)) {
          resolve({ success: false, output: '', error: 'No package.json found', exitCode: 1 });
          return;
        }
      }

      const shell = process.platform === 'win32' ? 'powershell.exe' : '/bin/sh';
      const child = spawn(shell, ['-c', finalCmd], {
        cwd: this.workingDir,
        env: { ...process.env },
        shell: false
      });

      let stdout = '', stderr = '';
      
      child.stdout?.on('data', d => stdout += d.toString());
      child.stderr?.on('data', d => stderr += d.toString());
      
      child.on('close', code => {
        resolve({
          success: code === 0,
          output: stdout,
          error: stderr || undefined,
          exitCode: code || 0
        });
      });
      
      child.on('error', err => {
        resolve({ success: false, output: '', error: err.message, exitCode: 1 });
      });
    });
  }
}

module.exports = { CommandExecutor };
