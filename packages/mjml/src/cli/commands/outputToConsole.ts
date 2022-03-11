export default ({
  compiled: { html },
  file,
}: any, addFileHeaderComment: any) =>
  new Promise((resolve) => {
    let output = ''
    if(addFileHeaderComment) {
      output = `<!-- FILE: ${file} -->\n`
    }
    output += `${html}\n`

    process.stdout.write(output, resolve)
  })
