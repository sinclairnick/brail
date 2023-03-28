import * as Render from "./render";
import { describe, it, expect } from "vitest";

describe("Render", () => {
  it("Places all html on a single line", () => {
    const html = `
		<div class="hi">
		</tbody>
		</table>
		</div>
		<!--[if mso]></td> </tr> </table><![endif]-->
		`.trim();
    const result = Render.singleLine(html);
    expect(result).toBe(
      `<div class="hi"></tbody></table></div><!--[if mso]></td> </tr> </table><![endif]-->`
    );
  });
});
