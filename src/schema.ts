export type SchemaNode = SchemaNodeBoolean | SchemaNodeChoice | SchemaNodeCollection | SchemaNodeComplex | SchemaNodeDateTime | SchemaNodeLookupBelongs | SchemaNodeLookupContains | SchemaNodeIntegerNumber | SchemaNodeDecimal | SchemaNodeCurrency | SchemaNodeText;
export enum SchemaNodeKind {
	text,
	choice,
	boolean,
	dateTime,
	integer,
	decimal,
	currency,
	complex,
    collection,
    lookupBelongs,
    lookupContains,
}

export interface SchemaNodeBoolean {
    kind: SchemaNodeKind.boolean;
    format?: SchemaNodeBooleanFormat;
}
export enum SchemaNodeBooleanFormat {
	checkbox,
	yesNo
}

export interface SchemaNodeChoice {
    kind: SchemaNodeKind.choice;
    choices: string[];
    multi?: boolean;
}

export interface SchemaNodeCollection {
    kind: SchemaNodeKind.collection;
    elementSchema: SchemaNode;
}

export interface SchemaNodeComplex {
    kind: SchemaNodeKind.complex;
    fields: SchemaNodeComplexField[];
    key: string[];
}
export interface SchemaNodeComplexField {
    schema: SchemaNode;
    name: string;
    title: string;
    description?: string;
    isNullable: boolean;
}

export interface SchemaNodeDateTime {
    kind: SchemaNodeKind.dateTime;
    format?: SchemaNodeDateTimeFormat;
    maxValue?: Date;
    minValue?: Date;
}
export enum SchemaNodeDateTimeFormat {
	dateTime,
	date,
	time
}

export interface SchemaNodeLookup {
    lookupSchema: SchemaNodeComplex;
}
export interface SchemaNodeLookupBelongs extends SchemaNodeLookup {
    kind: SchemaNodeKind.lookupBelongs;
    foreignFieldNames: string[];
}
export interface SchemaNodeLookupContains extends SchemaNodeLookup {
    kind: SchemaNodeKind.lookupContains;
    lookupForeignFieldNames: string[];
}

export interface SchemaNodeNumber {
    maxValue?: number;
    minValue?: number;
    lcid?: number;
}
export interface SchemaNodeIntegerNumber extends SchemaNodeNumber{
    kind: SchemaNodeKind.integer;
}
export interface SchemaNodeDecimalBase extends SchemaNodeNumber {
}
export interface SchemaNodeDecimal extends SchemaNodeDecimalBase {
    kind: SchemaNodeKind.decimal;
    showAsPercent?: boolean;
}
export interface SchemaNodeCurrency extends SchemaNodeDecimalBase {
    kind: SchemaNodeKind.currency;
    lcid: number;
}

export interface SchemaNodeText {
    kind: SchemaNodeKind.text;
    maxLength?: number;
}

export function nodesEqual(n1: SchemaNode, n2: SchemaNode) {
    //TODO: improve this please.
    return n1.kind == n2.kind;
}