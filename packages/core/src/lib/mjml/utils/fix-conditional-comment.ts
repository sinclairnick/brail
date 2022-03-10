export function fixConditionalComment(html: any, havingContent: any, newCondition: any) {
  const comments = /<!(--([^-]|[\r\n]|-[^-])*--[ \r\n\t]*)>/g;
  const conditionals = /<!--\[if.+?\]/;
  return html.replace(comments, (match: any) => {
    if (match.includes(havingContent)) {
      return match.replace(conditionals, `<!--[${newCondition}]`);
    }
    return match;
  });
}
