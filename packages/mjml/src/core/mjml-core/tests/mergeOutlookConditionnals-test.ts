// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'chai'.
const chai = require('chai')
const mergeOutlookConditionnals = require('../lib/helpers/mergeOutlookConditionnals')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'testValues... Remove this comment to see the full error message
const testValues = [
  {
    input: '<![endif]--><!--[if mso | IE]>',
    output: '',
  },
  {
    input: `
    </tr>
    <![endif]-->
    <!--[if mso | IE]>
    </td>`,
    output: `\n    </tr>\n    \n    </td>`,
  },
  {
    input: `</div>\n              <!--[if mso | IE]>\n            </td>\n          <![endif]-->\n              <!--[if mso | IE]>\n        </tr>\n      <![endif]-->\n              <!--[if mso | IE]>\n                  </table>\n                <![endif]-->\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <!--[if mso | IE]>\n          </td>`,
    output: `</div>\n              <!--[if mso | IE]>\n            </td>\n          \n        </tr>\n      \n                  </table>\n                <![endif]-->\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <!--[if mso | IE]>\n          </td>`,
  },
]

testValues.forEach(testUnit => {
  const { input, output } = testUnit

  chai.expect(mergeOutlookConditionnals(input), `mergeOutlookConditionnals test failed`)
      .to.deep.equal(output)
})
