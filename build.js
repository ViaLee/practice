const inquirer = require('inquirer');
const { exec } = require('child_process');
const { version } = require('./package.json');

const versionArr = version.split('.');
const newVersion = {
  patch: [versionArr[0], versionArr[1], Number(versionArr[2]) + 1].join('.'),
  minor: [versionArr[0], Number(versionArr[1]) + 1, 0].join('.'),
  major: [Number(versionArr[0]) + 1, 0, 0].join('.'),
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: '选择更新版本：',
      default: 0,
      choices: [
        {
          value: 'npm version patch', // 可用 --no-git-tag-version 阻止修改后提交commit
          name: `${version} -> ${newVersion['patch']}`,
        },
        {
          value: 'npm version minor',
          name: `${version} -> ${newVersion['minor']}`,
        },
        {
          value: 'npm version major',
          name: `${version} -> ${newVersion['major']}`,
        },
      ],
    },
  ])
  .then((answers) => {
    const selectedText = answers.choice.split(' ')[2];
    console.log('🚚 running ...');
    exec(answers.choice, (err) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        console.log(`✅ 已更新为${newVersion[selectedText]}`);
        console.log('正在打包 📦 ...');
        exec('yarn father-build', (error) => {
          if (error) {
            console.log(error);
            process.exit();
          } else {
            console.log('打包完成 🎉');
          }
        });
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error.isTtyError);
    } else {
      // Something else went wrong
      console.log('something wrong~');
    }
  });
