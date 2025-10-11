const { execSync } = require('child_process');

const packageNames = [
	'solid-panorama-runtime',
	'babel-plugin-jsx-panorama-expressions',
	'babel-preset-solid-panorama',
	'solid-panorama-all-in-jsx',
	'solid-panorama-polyfill'
];

function executeCommand(command, options = {}) {
	try {
		execSync(command, { stdio: 'inherit', ...options });
		return true;
	} catch (error) {
		console.error(`❌ Command failed: ${command}`);
		return false;
	}
}

function main() {
	console.log('🔗 Unlinking solid-panorama packages...');
	console.log('');

	let successCount = 0;

	packageNames.forEach(packageName => {
		console.log(`🔗 Unlinking ${packageName}...`);
		if (executeCommand(`npm unlink -g ${packageName}`)) {
			console.log(`✅ ${packageName} unlinked successfully`);
			successCount++;
		} else {
			console.log(`⚠️  Failed to unlink ${packageName} (may not have been linked)`);
		}
	});

	console.log('');
	console.log('📋 Summary:');
	console.log(`✅ Successfully unlinked: ${successCount}/${packageNames.length} packages`);
	console.log('');
	console.log('🧹 Cleanup completed!');
	console.log('');
	console.log('💡 Note: You may also need to run "npm unlink <package-name>" in your test projects');
	console.log('   to remove the links from the local node_modules.');
}

if (require.main === module) {
	main();
}