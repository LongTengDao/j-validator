export = exports;
declare const exports :Readonly<{
	
	version :'1.0.0',
	
	(type :any) :Validator,
	Validator (type :any) :Validator,
	
	and (...types :any[]) :Validator,
	or (...types :any[]) :Validator,
	
	optional (type :any) :Validator,
	void () :void,
	
	every (type :any) :Validator,
	
	bigint (value :any) :value is bigint,
	symbol (value :any) :value is symbol,
	string (value :any) :value is string,
	boolean (value :any) :value is boolean,
	number (value :any) :value is number,
	
	undefined (value :any) :value is undefined,
	NaN (value :any) :boolean,
	Infinity (value :any) :boolean,
	
	any (value :any) :boolean,
	never (value :any) :false,
	
	overload<T extends (...args :any[]) => any> (types :any[], callback :T, ...rest :( any[] | T )[]) :T,
	
	default :typeof exports,
	
}>;

type Validator = (value :any) => boolean;