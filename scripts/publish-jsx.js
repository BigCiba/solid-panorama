#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 包路径
const PACKAGE_PATH = 'packages/babel-plugin-jsx-panorama-expressions';
const PACKAGE_JSON_PATH = path.join(PACKAGE_PATH, 'package.json');

function runCommand(command, cwd = process.cwd()) {
	try {
		const result = execSync(command, {
			cwd,
			stdio: 'inherit',
			encoding: 'utf8'
		});
		return result;
	} catch (error) {
		console.error(`❌ 命令执行失败: ${command}`);
		console.error(error.message);
		process.exit(1);
	}
}

function getCurrentVersion() {
	const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
	return packageJson.version;
}

function updateVersion(versionType) {
	console.log(`📦 更新版本号 (${versionType})...`);
	runCommand(`npm version ${versionType}`, PACKAGE_PATH);
	return getCurrentVersion();
}

function buildPackage() {
	console.log('🔨 构建包...');
	runCommand('pnpm build:jsx');
}

function commitAndPush(newVersion) {
	console.log('📝 提交更改...');
	runCommand('git add .');
	runCommand(`git commit -m "chore: bump babel-plugin-jsx-panorama-expressions to v${newVersion}"`);
	runCommand('git push origin main');
}

function printPublishInstructions() {
	console.log('\n🎉 准备完成！');
	console.log('📋 接下来的步骤:');
	console.log('1. 前往 GitHub 仓库页面');
	console.log('2. 点击 Actions 标签');
	console.log('3. 选择 "Publish babel-plugin-jsx-panorama-expressions" 工作流');
	console.log('4. 点击 "Run workflow" 按钮');
	console.log('5. 确认运行工作流');
	console.log('\n🔗 GitHub Actions 地址:');
	console.log('https://github.com/RobinCodeX/solid-panorama/actions/workflows/publish-jsx.yml');
}

function main() {
	const args = process.argv.slice(2);
	const versionType = args[0] || 'patch';

	if (!['patch', 'minor', 'major'].includes(versionType)) {
		console.error('❌ 无效的版本类型。请使用: patch, minor, 或 major');
		process.exit(1);
	}

	console.log('🚀 开始发布 babel-plugin-jsx-panorama-expressions...');
	console.log(`📌 当前版本: ${getCurrentVersion()}`);

	try {
		// 1. 更新版本号
		const newVersion = updateVersion(versionType);
		console.log(`✅ 版本已更新到: ${newVersion}`);

		// 2. 构建包
		buildPackage();
		console.log('✅ 构建完成');

		// 3. 提交和推送
		commitAndPush(newVersion);
		console.log('✅ 代码已推送');

		// 4. 打印发布说明
		printPublishInstructions();

	} catch (error) {
		console.error('❌ 发布准备失败:', error.message);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}

module.exports = { main };