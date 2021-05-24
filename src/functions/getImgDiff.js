function rgba2hex(orig) {
    var a,
        isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || '').trim(),
        hex = rgb
            ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
              (rgb[2] | (1 << 8)).toString(16).slice(1) +
              (rgb[3] | (1 << 8)).toString(16).slice(1)
            : orig

    if (alpha !== '') {
        a = alpha
    } else {
        a = 1
    }
    // multiply before convert to HEX
    a = ((a * 255) | (1 << 8)).toString(16).slice(1)
    hex = hex + a

    return hex
}
export default async function getImgDiff(img1, img2, threshold) {
    threshold = threshold || 0.1
    let diff = 0
    // const maxDiff = 50 * threshold
    if (img1.length !== img2.length) {
        throw new Error('Pleas make sure the arrays are equal sizes')
    }
    for (let i = 0; i < img1.length; i += 4) {
        const pixel1 = rgba2hex(`rgba(${img1[i]},${img1[i + 1]},${img1[i + 2]},${img1[i + 3]})`)
        const pixel2 = rgba2hex(`rgba(${img2[i]},${img2[i + 1]},${img2[i + 2]},${img2[i + 3]})`)

        if (pixel1 !== pixel2) ++diff
    }

    return diff
}
