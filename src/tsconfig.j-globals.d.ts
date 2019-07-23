
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is any[] | readonly any[];
}
declare module '.Array.prototype.push' { export default Array.prototype.push; }

declare module '.Function.prototype.apply' { export default Function.prototype.apply; }

declare module '.Infinity' { export default Infinity; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create?=' { export default Object.create; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.getOwnPropertyNames?=' { export default getOwnPropertyNames;
	function getOwnPropertyNames<T extends object> (object :T) :Extract<string, keyof T>[];
}
declare module '.Object.is' { export default Object.is; }
declare module '.Object.prototype' { export default Object.prototype;
	export { default as hasOwnProperty } from '.Object.prototype.hasOwnProperty';
	export { default as isPrototypeOf } from '.Object.prototype.isPrototypeOf';
	export { default as propertyIsEnumerable } from '.Object.prototype.propertyIsEnumerable';
	export { default as toLocaleString } from '.Object.prototype.toLocaleString';
	export { default as toString } from '.Object.prototype.toString';
	export { default as valueOf } from '.Object.prototype.valueOf';
}
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.isPrototypeOf' { export default Object.prototype.isPrototypeOf; }
declare module '.Object.prototype.propertyIsEnumerable' { export default Object.prototype.propertyIsEnumerable; }
declare module '.Object.prototype.toLocaleString' { export default Object.prototype.toLocaleString; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.prototype.valueOf' { export default Object.prototype.valueOf; }
declare module '.Object.seal' { export default Object.seal; }

declare module '.Reflect.apply?=' { export default Reflect.apply; }
declare module '.Reflect.ownKeys?=' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.TypeError' { export default TypeError; }

declare module '.default?=' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> } & Main>;
	type Callable = (...args :any[]) => any;
	type Newable = { new (...args :any[]) :any };
}

declare module '.native' { export default NATIVE; const NATIVE :never; }

declare module '.undefined' { export default undefined; }
