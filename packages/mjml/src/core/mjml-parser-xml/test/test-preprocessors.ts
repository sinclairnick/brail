const { template } = require('lodash')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'MJMLParser... Remove this comment to see the full error message
const MJMLParser = require('../lib')
const mjml2html = require('../../mjml/lib')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'components... Remove this comment to see the full error message
const { components } = require('../../mjml-core/lib')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parse'.
const parse = (mjml: any) => MJMLParser(mjml, {
  keepComments: true,
  components,
  preprocessors: [
    (data: any) => template(data, {
      evaluate: /{{([\s\S]+?)}}/g,
      interpolate: /{{=([\s\S]+?)}}/g,
      escape: /{{-([\s\S]+?)}}/g,
    })({
      buttons: [{ title: 'Title' }, { title: 'Title2' }],
    }),
  ],
})

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'xml'.
const xml = `<mjml>
<mj-body>
  <mj-section mj-class="content">
    {{ buttons.forEach(function(button) { }}
    <mj-text>{{=button.title}}</mj-text>
    {{ }); }}
  </mj-section>
</mj-body>
</mjml>
`

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'json'.
const json = parse(xml)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'html'.
const { html } = mjml2html(json)

console.log(html) // eslint-disable-line no-console
