export default async function getImgDiff(img1, img2, threshold) {
    threshold = threshold || 0.1
    let diff = 0
    // const maxDiff = 50 * threshold
    if (img1.length !== img2.length) {
        throw new Error('Pleas make sure the arrays are equal sizes')
    }
    for (let i = 0; i < img1.length; i++) {
        if (Math.abs(img1[i] - img2[i]) > 0) diff++
    }
    console.log(img1.length * (3 / 4))
    return diff
}
