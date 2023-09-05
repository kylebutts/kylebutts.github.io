declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"All-About-Influence-Functions.mdx": {
	id: "All-About-Influence-Functions.mdx";
  slug: "all-about-influence-functions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Factor-Model.mdx": {
	id: "Factor-Model.mdx";
  slug: "factor-model";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Group-Vs-Unit-FEs.mdx": {
	id: "Group-Vs-Unit-FEs.mdx";
  slug: "group-vs-unit-fes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Non-traditional-Diff-in-Diff.mdx": {
	id: "Non-traditional-Diff-in-Diff.mdx";
  slug: "non-traditional-diff-in-diff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"papers": {
"DID-Rings.mdx": {
	id: "DID-Rings.mdx";
  slug: "did-rings";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"DID-via-CCE.mdx": {
	id: "DID-via-CCE.mdx";
  slug: "did-via-cce";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"Diff-in-Disc.mdx": {
	id: "Diff-in-Disc.mdx";
  slug: "diff-in-disc";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"Fiscal-Consolidation.mdx": {
	id: "Fiscal-Consolidation.mdx";
  slug: "fiscal-consolidation";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"Generalized-Imputation-Estimators.mdx": {
	id: "Generalized-Imputation-Estimators.mdx";
  slug: "generalized-imputation-estimators";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"Spatial-Spillovers.mdx": {
	id: "Spatial-Spillovers.mdx";
  slug: "spatial-spillovers";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"Urban-Wage-Premium.mdx": {
	id: "Urban-Wage-Premium.mdx";
  slug: "urban-wage-premium";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
"did2s.mdx": {
	id: "did2s.mdx";
  slug: "did2s";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		"courses": {
"3070": {
	id: "3070";
  collection: "courses";
  data: InferEntrySchema<"courses">
};
"3535": {
	id: "3535";
  collection: "courses";
  data: InferEntrySchema<"courses">
};
"3818": {
	id: "3818";
  collection: "courses";
  data: InferEntrySchema<"courses">
};
};
"open-source": {
"ContinuousRD": {
	id: "ContinuousRD";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"did2s-R": {
	id: "did2s-R";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"did2s-stata": {
	id: "did2s-stata";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"didimputation": {
	id: "didimputation";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"jive": {
	id: "jive";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"rademacher": {
	id: "rademacher";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"ssaggregate": {
	id: "ssaggregate";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"templates": {
	id: "templates";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
"vcovSUR": {
	id: "vcovSUR";
  collection: "open-source";
  data: InferEntrySchema<"open-source">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
