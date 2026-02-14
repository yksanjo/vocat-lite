const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class GitManager {
  constructor() {
    this.cwd = process.cwd();
  }

  async status() {
    try {
      const { stdout } = await exec('git status --porcelain', { cwd: this.cwd });
      return stdout.trim() || 'No changes';
    } catch (e) {
      return 'Not a git repository';
    }
  }

  async commit(msg) {
    try {
      await exec('git add -A', { cwd: this.cwd });
      const { stdout } = await exec(`git commit -m "${msg}"`, { cwd: this.cwd });
      return { success: true, output: stdout };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async push() {
    try {
      const { stdout } = await exec('git push', { cwd: this.cwd });
      return { success: true, output: stdout };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async pull() {
    try {
      const { stdout } = await exec('git pull', { cwd: this.cwd });
      return { success: true, output: stdout };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async branch() {
    try {
      const { stdout } = await exec('git branch --show-current', { cwd: this.cwd });
      return stdout.trim();
    } catch (e) {
      return 'unknown';
    }
  }
}

module.exports = { GitManager };
