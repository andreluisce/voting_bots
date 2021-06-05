var cp = require('child_process');

cp.exec('bash cmd.sh', function(err, stdout, stderr) {
  console.log(stdout, err, stderr)
});

