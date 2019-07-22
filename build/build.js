'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道, get }) => {
	
	const zhs = 'API 验证相关共享实用程序。从属于“简计划”。';
	const en = 'API validating util. Belong to "Plan J".';
	
	await build({
		name: 'j-validator',
		user: 'LongTengDao@ltd',
		Desc: [ zhs, en ],
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver: await get('src/version'),
		ES: 3,
		ESM: true,
		NPM: { description: `${en}／${zhs}` },
		UMD: { main_global: 'Validator' },
		LICENSE_: true,
	});
	
});
