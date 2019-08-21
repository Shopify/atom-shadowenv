'use babel';

import { execFile } from 'child_process';
import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,
  shadowenvData: '',

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-shadowenv:version': () => this.version(),
      'atom-shadowenv:load':    () => this.loadShadowenv(),
      'atom-shadowenv:trust':   () => this.trust()
    }));

    this.loadShadowenv();
  },

  loadShadowenv() {
    let cwd = atom.project.getPaths()[0];
    console.log(cwd);
    console.log(this.shadowenvData);
    execFile('shadowenv', ['hook', '--json', this.shadowenvData], { "cwd": cwd }, function(error, stdout, stderr) {
      console.log("stdout:"+stdout);
      console.log("stderr:"+stderr);
      if (error !== null) {
        console.log(stderr);
        atom.notifications.addFatalError(stderr);
      } else {
        if (stdout === "") return;
        let data = JSON.parse(stdout);
        let exported = data['exported'];
        Object.keys(exported).forEach( name => {
          process.env[name] = exported[name];
        });
        let unexported = data['unexported'];
        Object.keys(unexported).forEach( name => {
          if (name == '__shadowenv_data') {
            this.shadowenvData = unexported[name];
          } else {
            atom.notifications.addFatalError("unexpected unexported value: " + name);
          }
        });
        atom.notifications.addInfo("shadowenv loaded");
      }
    });
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  version() {
    execFile('shadowenv', ['--version'], function(error, stdout, stderr) {
      if (error !== null) {
        atom.notifications.addFatalError(stderr);
      } else {
        atom.notifications.addInfo(stdout);
      }
    });
  },

  trust() {
    let cwd = atom.project.getPaths()[0];
    execFile('shadowenv', ['trust'], { "cwd": cwd }, function(error, stdout, stderr) {
      if (error !== null) {
        atom.notifications.addFatalError(stderr);
      } else {
        this.loadShadowenv();
      }
    });
  }

};
