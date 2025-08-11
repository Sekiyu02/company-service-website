const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('パスワードハッシュ生成ツール');
console.log('================================');

rl.question('パスワードを入力してください: ', async (password) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n生成されたハッシュ:');
    console.log(hash);
    console.log('\n.env.localファイルに以下の行を追加してください:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    rl.close();
  }
});