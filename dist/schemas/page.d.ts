import { z } from "astro/zod";
export declare const pageObjectSchema: any;
/**
 * Defines a schema for a Notion page with a specific set of properties.
 * @example
 * const schema = notionPageSchema({
 *   properties: {
 *     Name: z.object({}),
 *     Hidden: transformedPropertySchema.checkbox.optional(),
 *   }
 * });
 */
export declare function notionPageSchema<Schema extends z.ZodTypeAny>({ properties, }: {
    properties: Schema;
}): any;
//# sourceMappingURL=page.d.ts.map