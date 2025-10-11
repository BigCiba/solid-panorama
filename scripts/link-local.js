const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const packages = [
	'runtime',
	'babel-plugin-jsx-panorama-expressions',
	'babel-preset-solid-panorama',
	'panorama-all-in-jsx',
	'solid-panorama-polyfill'
];

function executeCommand(command, options = {}) {
	try {
		execSync(command, { stdio: 'inherit', ...options });
		return true;
	} catch (error) {
		console.error(`❌ Command failed: ${command}`);
		console.error(error.message);
		return false;
	}
}

function main() {
	console.log('🔨 Building solid-panorama packages...');

	if (!executeCommand('npm run build')) {
		console.error('❌ Build failed! Please fix build errors first.');
		process.exit(1);
	}

	console.log('✅ Build completed successfully!');
	console.log('');
	console.log('🔗 Creating npm links for local development...');

	let successCount = 0;
	let totalCount = 0;

	packages.forEach(pkg => {
		const distPath = path.join(__dirname, '..', 'dist', pkg);
		totalCount++;

		if (!fs.existsSync(distPath)) {
			console.log(`⚠️  Package ${pkg} not found in dist directory, skipping...`);
			return;
		}

		console.log(`🔗 Linking ${pkg}...`);
		if (executeCommand('npm link', { cwd: distPath })) {
			console.log(`✅ ${pkg} linked successfully`);
			successCount++;
		} else {
			console.log(`❌ Failed to link ${pkg}`);
		}
	});

	console.log('');
	console.log('📋 Summary:');
	console.log(`✅ Successfully linked: ${successCount}/${totalCount} packages`);
	console.log('');

	if (successCount > 0) {
		console.log('🎉 Ready for local testing!');
		console.log('');
		console.log('📝 To use in your test project, run:');
		packages.forEach(pkg => {
			const packageName = getPackageName(pkg);
			if (packageName) {
				console.log(`   npm link ${packageName}`);
			}
		});
		console.log('');
		console.log('📖 For more details, see LOCAL_TESTING_GUIDE.md');
	}
}

function getPackageName(distDir) {
	const packageJsonPath = path.join(__dirname, '..', 'dist', distDir, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		try {
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
			return packageJson.name;
		} catch (error) {
			console.warn(`⚠️  Could not read package.json for ${distDir}`);
		}
	}
	return null;
}

if (require.main === module) {
	main();
}