export default (content: any) => // find conditionnal comment blocks
content.replace(
  /(<!--\[if\s[^\]]+]>)([\s\S]*?)(<!\[endif]-->)/gm,
  (match: any, prefix: any, content: any, suffix: any) => {
    // find spaces between tags
    const processedContent = content
      .replace(
        /(^|>)(\s+)(<|$)/gm,
        (match: any, prefix: any, content: any, suffix: any) => `${prefix}${suffix}`,
      )
      .replace(/\s{2,}/gm, ' ')
    return `${prefix}${processedContent}${suffix}`
  },
)
