import type { CallbackResponse, HLJSApi } from 'highlight.js';
export default function (hljs: HLJSApi): {
    case_insensitive: boolean;
    aliases: string[];
    contains: ({
        scope: string;
        match: RegExp;
    } | {
        scope: string;
        begin: RegExp;
        end: RegExp;
        contains: {
            scope: string;
            begin: RegExp;
            end: RegExp;
        }[];
    } | {
        scope: string;
        begin: RegExp;
        end: RegExp;
        'on:begin': (match: string[], response: CallbackResponse) => void;
        'on:end': (match: string[], response: CallbackResponse) => void;
    } | import("highlight.js").Mode)[];
};
