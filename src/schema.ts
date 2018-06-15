

export interface SchemaType {
    
    kind: SchemaTypeKind;
}


export enum SchemaTypeKind {
	
	text,
	choice,
	boolean,
	dateTime,
	integer,
	decimal,
	currency,
	complex,
	collection
}
export interface SchemaTypeBoolean extends SchemaType {
    
    kind: SchemaTypeKind;
    format: SchemaTypeBooleanFormat;
}


export enum SchemaTypeBooleanFormat {
	
	checkbox,
	yesNo
}
export interface SchemaTypeChoice extends SchemaType {
    
    kind: SchemaTypeKind;
    choices: string[];
    multi: boolean;
}

export interface SchemaTypeCollection extends SchemaType {
    
    kind: SchemaTypeKind;
    elementType: SchemaType;
}

export interface SchemaTypeComplex extends SchemaType {
    
    kind: SchemaTypeKind;
    fields: SchemaTypeComplexField[];
}

export interface SchemaTypeComplexField {
    
    type: SchemaType;
    name: string;
    title: string;
    description: string;
    isNullable: boolean;
}

export interface SchemaTypeCurrency extends SchemaTypeDecimalBase {
    
    kind: SchemaTypeKind;
    lcid: number;
}

export interface SchemaTypeDateTime extends SchemaType {
    
    kind: SchemaTypeKind;
    format: SchemaTypeDateTimeFormat;
    maxValue: Date;
    minValue: Date;
}


export enum SchemaTypeDateTimeFormat {
	
	dateTime,
	date,
	time
}
export interface SchemaTypeDecimal extends SchemaTypeDecimalBase {
    
    kind: SchemaTypeKind;
    showAsPercent: boolean;
}

export interface SchemaTypeDecimalBase extends SchemaTypeNumber<number> {
    
}

export interface SchemaTypeInteger extends SchemaTypeNumber<number> {
    
    kind: SchemaTypeKind;
}

export interface SchemaTypeNumber<T> extends SchemaType {
    
    maxValue: T;
    minValue: T;
}

export interface SchemaTypeText extends SchemaType {
    
    maxLength: number;
    isUnicode: boolean;
    kind: SchemaTypeKind;
}