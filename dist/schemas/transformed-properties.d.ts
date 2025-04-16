export declare const number: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"number">;
    id: import("astro/zod").ZodString;
} & {
    number: import("astro/zod").ZodNullable<import("astro/zod").ZodNumber>;
}, "strip", import("astro/zod").ZodTypeAny, {
    number: number | null;
    type: "number";
    id: string;
}, {
    number: number | null;
    type: "number";
    id: string;
}>, number | null, {
    number: number | null;
    type: "number";
    id: string;
}>;
export declare const url: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"url">;
    id: import("astro/zod").ZodString;
} & {
    url: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "url";
    url: string | null;
    id: string;
}, {
    type: "url";
    url: string | null;
    id: string;
}>, string | null, {
    type: "url";
    url: string | null;
    id: string;
}>;
export declare const email: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"email">;
    id: import("astro/zod").ZodString;
} & {
    email: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "email";
    id: string;
    email: string | null;
}, {
    type: "email";
    id: string;
    email: string | null;
}>, string | null, {
    type: "email";
    id: string;
    email: string | null;
}>;
export declare const phone_number: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"phone_number">;
    id: import("astro/zod").ZodString;
} & {
    phone_number: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "phone_number";
    id: string;
    phone_number: string | null;
}, {
    type: "phone_number";
    id: string;
    phone_number: string | null;
}>, string | null, {
    type: "phone_number";
    id: string;
    phone_number: string | null;
}>;
export declare const checkbox: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"checkbox">;
    id: import("astro/zod").ZodString;
} & {
    checkbox: import("astro/zod").ZodBoolean;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "checkbox";
    id: string;
    checkbox: boolean;
}, {
    type: "checkbox";
    id: string;
    checkbox: boolean;
}>, boolean, {
    type: "checkbox";
    id: string;
    checkbox: boolean;
}>;
export declare const select: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"select">;
    id: import("astro/zod").ZodString;
} & {
    select: import("astro/zod").ZodNullable<import("astro/zod").ZodObject<{
        id: import("astro/zod").ZodString;
        name: import("astro/zod").ZodString;
        color: import("astro/zod").ZodString;
    }, "strip", import("astro/zod").ZodTypeAny, {
        id: string;
        name: string;
        color: string;
    }, {
        id: string;
        name: string;
        color: string;
    }>>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "select";
    id: string;
    select: {
        id: string;
        name: string;
        color: string;
    } | null;
}, {
    type: "select";
    id: string;
    select: {
        id: string;
        name: string;
        color: string;
    } | null;
}>, string | null, {
    type: "select";
    id: string;
    select: {
        id: string;
        name: string;
        color: string;
    } | null;
}>;
export declare const multi_select: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"multi_select">;
    id: import("astro/zod").ZodString;
} & {
    multi_select: import("astro/zod").ZodArray<import("astro/zod").ZodObject<{
        id: import("astro/zod").ZodString;
        name: import("astro/zod").ZodString;
        color: import("astro/zod").ZodString;
    }, "strip", import("astro/zod").ZodTypeAny, {
        id: string;
        name: string;
        color: string;
    }, {
        id: string;
        name: string;
        color: string;
    }>, "many">;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "multi_select";
    id: string;
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
}, {
    type: "multi_select";
    id: string;
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
}>, string[], {
    type: "multi_select";
    id: string;
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
}>;
export declare const status: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"status">;
    id: import("astro/zod").ZodString;
} & {
    status: import("astro/zod").ZodNullable<import("astro/zod").ZodObject<{
        id: import("astro/zod").ZodString;
        name: import("astro/zod").ZodString;
        color: import("astro/zod").ZodString;
    }, "strip", import("astro/zod").ZodTypeAny, {
        id: string;
        name: string;
        color: string;
    }, {
        id: string;
        name: string;
        color: string;
    }>>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "status";
    status: {
        id: string;
        name: string;
        color: string;
    } | null;
    id: string;
}, {
    type: "status";
    status: {
        id: string;
        name: string;
        color: string;
    } | null;
    id: string;
}>, string | null, {
    type: "status";
    status: {
        id: string;
        name: string;
        color: string;
    } | null;
    id: string;
}>;
export declare const title: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"title">;
    id: import("astro/zod").ZodString;
} & {
    title: import("astro/zod").ZodArray<import("astro/zod").ZodDiscriminatedUnion<"type", [import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"text">;
        text: import("astro/zod").ZodObject<{
            content: import("astro/zod").ZodString;
            link: import("astro/zod").ZodNullable<import("astro/zod").ZodObject<{
                url: import("astro/zod").ZodString;
            }, "strip", import("astro/zod").ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>>;
        }, "strip", import("astro/zod").ZodTypeAny, {
            link: {
                url: string;
            } | null;
            content: string;
        }, {
            link: {
                url: string;
            } | null;
            content: string;
        }>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    }, {
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    }>, import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"mention">;
        mention: import("astro/zod").ZodObject<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    }, {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    }>, import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"equation">;
        equation: import("astro/zod").ZodObject<{
            expression: import("astro/zod").ZodString;
        }, "strip", import("astro/zod").ZodTypeAny, {
            expression: string;
        }, {
            expression: string;
        }>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    }, {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    }>]>, "many">;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "title";
    id: string;
    title: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}, {
    type: "title";
    id: string;
    title: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}>, string, {
    type: "title";
    id: string;
    title: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}>;
export declare const rich_text: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"rich_text">;
    id: import("astro/zod").ZodString;
} & {
    rich_text: import("astro/zod").ZodArray<import("astro/zod").ZodDiscriminatedUnion<"type", [import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"text">;
        text: import("astro/zod").ZodObject<{
            content: import("astro/zod").ZodString;
            link: import("astro/zod").ZodNullable<import("astro/zod").ZodObject<{
                url: import("astro/zod").ZodString;
            }, "strip", import("astro/zod").ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>>;
        }, "strip", import("astro/zod").ZodTypeAny, {
            link: {
                url: string;
            } | null;
            content: string;
        }, {
            link: {
                url: string;
            } | null;
            content: string;
        }>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    }, {
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    }>, import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"mention">;
        mention: import("astro/zod").ZodObject<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            type: import("astro/zod").ZodEnum<["user", "date", "link_preview", "template_mention", "page", "database"]>;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    }, {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    }>, import("astro/zod").ZodObject<import("astro/zod").objectUtil.extendShape<{
        annotations: import("astro/zod").ZodObject<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, "passthrough", import("astro/zod").ZodTypeAny, import("astro/zod").objectOutputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">, import("astro/zod").objectInputType<{
            bold: import("astro/zod").ZodBoolean;
            italic: import("astro/zod").ZodBoolean;
            strikethrough: import("astro/zod").ZodBoolean;
            underline: import("astro/zod").ZodBoolean;
            code: import("astro/zod").ZodBoolean;
            color: import("astro/zod").ZodString;
        }, import("astro/zod").ZodTypeAny, "passthrough">>;
        plain_text: import("astro/zod").ZodString;
        href: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, {
        type: import("astro/zod").ZodLiteral<"equation">;
        equation: import("astro/zod").ZodObject<{
            expression: import("astro/zod").ZodString;
        }, "strip", import("astro/zod").ZodTypeAny, {
            expression: string;
        }, {
            expression: string;
        }>;
    }>, "strip", import("astro/zod").ZodTypeAny, {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    }, {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    }>]>, "many">;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "rich_text";
    id: string;
    rich_text: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}, {
    type: "rich_text";
    id: string;
    rich_text: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}>, string, {
    type: "rich_text";
    id: string;
    rich_text: ({
        type: "text";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        text: {
            link: {
                url: string;
            } | null;
            content: string;
        };
    } | {
        type: "mention";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        mention: {
            type: "date" | "user" | "link_preview" | "template_mention" | "page" | "database";
        } & {
            [k: string]: unknown;
        };
    } | {
        type: "equation";
        annotations: {
            code: boolean;
            color: string;
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
        } & {
            [k: string]: unknown;
        };
        plain_text: string;
        href: string | null;
        equation: {
            expression: string;
        };
    })[];
}>;
export declare const date: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"date">;
    id: import("astro/zod").ZodString;
} & {
    date: import("astro/zod").ZodNullable<import("astro/zod").ZodObject<{
        start: import("astro/zod").ZodUnion<[import("astro/zod").ZodString, import("astro/zod").ZodString]>;
        end: import("astro/zod").ZodNullable<import("astro/zod").ZodUnion<[import("astro/zod").ZodString, import("astro/zod").ZodString]>>;
        time_zone: import("astro/zod").ZodNullable<import("astro/zod").ZodString>;
    }, "strip", import("astro/zod").ZodTypeAny, {
        start: string;
        end: string | null;
        time_zone: string | null;
    }, {
        start: string;
        end: string | null;
        time_zone: string | null;
    }>>;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "date";
    date: {
        start: string;
        end: string | null;
        time_zone: string | null;
    } | null;
    id: string;
}, {
    type: "date";
    date: {
        start: string;
        end: string | null;
        time_zone: string | null;
    } | null;
    id: string;
}>, {
    start: Date;
    end: Date | null;
    time_zone: string | null;
} | null, {
    type: "date";
    date: {
        start: string;
        end: string | null;
        time_zone: string | null;
    } | null;
    id: string;
}>;
export declare const created_time: import("astro/zod").ZodEffects<import("astro/zod").ZodObject<{
    type: import("astro/zod").ZodLiteral<"created_time">;
    id: import("astro/zod").ZodString;
} & {
    created_time: import("astro/zod").ZodString;
}, "strip", import("astro/zod").ZodTypeAny, {
    type: "created_time";
    id: string;
    created_time: string;
}, {
    type: "created_time";
    id: string;
    created_time: string;
}>, Date, {
    type: "created_time";
    id: string;
    created_time: string;
}>;
//# sourceMappingURL=transformed-properties.d.ts.map