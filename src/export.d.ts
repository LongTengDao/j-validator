export const version :string;

export function Validator (type :any) :Validator;

export function and (...types :any[]) :Validator;
export function or (...types :any[]) :Validator;

export function optional (type :any) :Validator;
export { VOID as void }; declare function VOID (value :any) :boolean;

export function every (type :any) :Validator;

export function bigint (value :any) :value is bigint;
export function symbol (value :any) :value is symbol;
export function string (value :any) :value is string;
export function boolean (value :any) :value is boolean;
export function number (value :any) :value is number;

export function undefined (value :any) :value is undefined;
export function NaN (value :any) :boolean;
export function Infinity (value :any) :boolean;

export function any (value :any) :boolean;
export function never (value :any) :false;

export function overload<T extends (...args :any[]) => any> (types :any[], callback :T, ...rest :( any[] | T )[]) :T;

type Validator = (value :any) => boolean;