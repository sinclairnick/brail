// # OPTIMIZE ME: — check if previous conditionnal is `<!--[if mso | I`]>` too
export default (content: any) => content.replace(/(<!\[endif]-->\s*?<!--\[if mso \| IE]>)/gm, '')
